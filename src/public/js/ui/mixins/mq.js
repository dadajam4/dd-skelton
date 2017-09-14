import matchMedia from '../util/match-media';



export default {
  data() {
    return {
      mqKeys: this.$store.getters[`${publicSettings.css.key}/mq/keys`],
      mq: {},
    }
  },

  methods: {
    updateMediaQuery() {
      this.mqKeys.forEach(key => {
        this.$set(this.mq, key, this.$store.getters[`${publicSettings.css.key}/mq/${key}`]);
      });
    },
  },

  created() {
    matchMedia.hasAndOn(`changeKey.${this._uid}`, () => {
      this.updateMediaQuery();
    });

    matchMedia.hasAndOn(`changeGroup.${this._uid}`, () => {
      this.updateMediaQuery();
    });

    this.updateMediaQuery();
  },

  beforeDestroy() {
    matchMedia.off(`.${this._uid}`);
  },
}
