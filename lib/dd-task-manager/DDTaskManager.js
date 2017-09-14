const DDTask     = require('./DDTask');
const DDTaskFlow = require('./DDTaskFlow');



class DDTaskManager {



  /**
   * constructor
   */
  constructor(settings, opt = {}) {
    this.rootDir = opt.rootDir || '';
    this.watch   = opt.watch === undefined ? false : opt.watch;
    this.notify  = opt.notify || {};
    this.setup(settings);
  }



  /**
   * セットアップ
   */
  setup(settings) {
    this.taskRoot = new DDTask(this, settings.tasks);

    this.flows = {};
    for (const key in settings.flows) {
      this.flows[key] = new DDTaskFlow(this, key, settings.flows[key]);
    }
  }



  /**
   * ルートタスクから子タスクをインデックス検索する
   */
  findTaskByIndex(index) {
    return this.taskRoot.findTaskByIndex(index);
  }



  /**
   * 指定のインデックスのタスクを実行する
   */
  task(index) {
    const task = index ? this.findTaskByIndex(index) : this.taskRoot;
    if (!task) throw new Error(`タスク ${index} は定義されていません。`);

    return task.run();
  }



  /**
   * 指定のキーのフローを実行する
   */
  flow(key) {
    return this.flows[key].run({root: true});
  }
}



module.exports = DDTaskManager;
