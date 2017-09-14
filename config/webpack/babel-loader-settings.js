const babelLoaderSettings = {
  query: {
    presets: [
      'es2015',
      'stage-0',
    ]
  },
  get queryString() {
    let rows = [];
    for (const key in this.query) {
      const values = this.query[key];
      if (typeof values === 'string') {
        rows.push(`${key}=${values}`);
      } else {
        values.forEach(value => {
          rows.push(`${key}[]=${value}`);
        });
      }
    }
    return rows.join(',');
  },
};



module.exports = babelLoaderSettings;
