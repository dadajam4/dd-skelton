module.exports = {
  get(req, res, next) {
    setTimeout(() => {
      res.json({hoge: 'fuga'});
    }, 2000);
  }
}