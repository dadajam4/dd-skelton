const path      = require('path');
const esteWatch = require('este-watch');



const ROOT_KEYS = [
  'type',
  'name',
  'description',
  'tasks',
  'script',
];



class DDTask {

  get isRoot() { return this.parent === undefined }
  get isGroup() { return this.type === 'group' }
  get index() { return ((this.parent && this.parent.key ? this.parent.key + '.' : '') + (this.key ? this.key : '')) }
  get scriptPath() {
    if (this.script) return this.script;
    return path.join(this.context.rootDir, this.type);
  }



  /**
   * constructor
   */
  constructor(context, setting, parent, key) {
    this.context     = context;
    this.type        = setting.type        || 'group';
    this.name        = setting.name        || '';
    this.description = setting.description || '';
    this.parent      = parent;
    this.key         = key;
    this.indexed     = {};
    this.root        = parent ? parent.root : this;
    this.watch       = context.watch;
    this.notify      = context.notify.task === undefined ? true : context.notify.task;

    if (this.isGroup) {
      this.setupGroup(setting);
    } else {
      this.setupTask(setting);
    }
  }



  /**
   * 通常タスクとしてセットアップ
   */
  setupTask(setting) {
    this.params = {};
    for (let key in setting) {
      if (ROOT_KEYS.indexOf(key) !== -1) continue;
      this.params[key] = setting[key];
    }

    this.worker = require(this.scriptPath);
  }



  /**
   * グループタスクとしてセットアップ
   */
  setupGroup(setting) {
    this.tasks = {};
    const tasks = this.isRoot ? setting : setting.tasks;

    for (const key in tasks) {
      const task = new DDTask(this.context, tasks[key], this, key);
      this.addTaskForIndexed(task);

      if (this !== this.root) {
        this.root.addTaskForIndexed(task);
      }

      this.tasks[key] = task;
    }
  }



  /**
   * 自身のインスタンスに子タスクをインデックスする
   */
  addTaskForIndexed(task) {
    if (this.indexed[task.index]) throw new Error(`タスクインデックス ${task.index} は重複しています。`);
    this.indexed[task.index] = task;
  }



  /**
   * 自身のインスタンスから子タスクをインデックス検索する
   */
  findTaskByIndex(index) { return this.indexed[index] }



  /**
   * 実行する
   */
  run() {
    if (this.isGroup) {
      return this.runGroup();
    } else {
      return this.runTask();
    }
  }



  /**
   * 通常タスクとして実行する
   */
  async runTask() {
    try {
      const taskResult = await this.worker(this, this.params) || {};
      if (!taskResult.skipWatch && this.watch && this.params.watch) {
        let src = this.params.watch;
        src = typeof src === 'string' ? [src] : src;
        const watcher = esteWatch(src, () => {
          this.worker(this, this.params);
        });
        watcher.start();
      }
    } catch(e) {
      console.error(e);
      throw new Error(e);
    }
  }



  /**
   * グループタスクとして実行する
   */
  async runGroup() {
    const promiseList = [];

    for (const key in this.tasks) {
      const task = this.tasks[key];
      promiseList.push(task.run());
    }

    await Promise.all(promiseList);
  }
}



module.exports = DDTask;
