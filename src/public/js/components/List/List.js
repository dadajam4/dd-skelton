export default {
  name: 'vn@-list',

  provide() {
    return {
      listClick: this.listClick,
      listClose: this.listClose,
    }
  },

  // mixins: [Themeable],

  data() {
    return {
      uid: null,
      groups: [],
    }
  },

  props: {
    dense: Boolean,
    subheader: Boolean,
    threeLine: Boolean,
    twoLine: Boolean,
  },

  computed: {
    classes() {
      return {
        'vc@list': true,
        'vc@list--two-line': this.twoLine,
        'vc@list--dense': this.dense,
        'vc@list--three-line': this.threeLine,
        'vc@list--subheader': this.subheader,
        // 'theme--dark dark--bg': this.dark,
        // 'theme--light light--bg': this.light
      }
    }
  },

  watch: {
    uid() {
      this.$children.filter(i => i.$options._componentTag === 'vn@-list-group').forEach(i => i.toggle(this.uid))
    }
  },

  methods: {
    listClick(uid, force) {
      if (force) {
        this.uid = uid;
      } else {
        this.uid = this.uid === uid ? null : uid;
      }
    },

    listClose(uid) {
      if (this.uid === uid) {
        this.uid = null;
      }
    }
  },

  render(h) {
    const data = {
      'class': this.classes,
      attrs: { 'data-uid': this._uid },
    }

    return h('ul', data, [this.$slots.default]);
  }
}