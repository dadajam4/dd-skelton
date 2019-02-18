const Notifier = require('dd-notifier');
const chalk    = require('chalk');



class DDTaskFlow {



  /**
   * constructor
   */
  constructor(context, key, flows, parent) {
    this.context = context;
    this.key     = key;
    this.parent  = parent;
    this.flows   = flows;
    this.notify  = context.notify.flow === undefined ? true : context.notify.flow;
  }



  /**
   * フローを実行する
   */
  async run(opt = {}) {
    console.log(chalk.cyan(`
*************************
DDTaskFlow Starting
Target: ${this.key}
*************************
    `));

    for (let tasks of this.flows) {
      tasks = Array.isArray(tasks) ? tasks : [tasks];
      const promiseList = tasks.map(index => this.context.task(index));
      if (promiseList.length) await Promise.all(promiseList);
    }

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



module.exports = DDTaskFlow;
