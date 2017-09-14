const Notifier = require('dd-notifier');
const chalk    = require('chalk');



class DDTaskFlow {



  /**
   * constructor
   */
  constructor(context, key, setting, parent) {
    this.context = context;
    this.key     = key;
    this.parent  = parent;
    this.tasks   = setting.tasks;
    this.notify  = context.notify.flow === undefined ? true : context.notify.flow;

    this.tasks = typeof this.tasks === 'string' ? [this.tasks] : this.tasks;

    if (setting.child) {
      this.child = new DDTaskFlow(this.context, 'child', setting.child, this);
    }
  }



  /**
   * フローを実行する
   */
  async run(opt = {}) {
    const isRoot = opt.root === undefined ? false : opt.root;
    const promiseList = [];

    if (isRoot) {
      console.log(chalk.cyan(`
*************************
DDTaskFlow Starting
Target: ${this.key}
*************************
      `));
    }

    this.tasks.forEach(index => {
      promiseList.push(this.context.task(index));
    });

    await Promise.all(promiseList);

    if (this.child) {
      await this.child.run();
    }

    if (isRoot) {
      console.log(chalk.cyan(`
DDTaskFlow Finish
Target: ${this.key}
-------------------------
      `));
      new Notifier('success', {
        subtitle: `フロー ${this.key}`,
        message : '完了しました。',
      });
    }
  }
}



module.exports = DDTaskFlow;
