<script>
import Contextualable from '../../mixins/contextualable';
import Routable from '../../mixins/routable';



export default {
  name: 'vn@-btn',

  mixins: [
    Contextualable,
    Routable,
  ],

  props: {

    // size
    sm: Boolean,
    lg: Boolean,

    // outline
    flat: Boolean,
    outline: Boolean,
    block: Boolean,
    icon: Boolean,
    left: Boolean,
    right: Boolean,

    // states
    loading: Boolean,
    disabled: Boolean,

    // values
    tag: {
      type: String,
      default: 'button',
    },
    type: {
      type: String,
      default: 'button'
    },
  },



  computed: {
    colorForText() { return this.flat || this.outline },

    classes() {
      const classes = {
        [this.$options.name]: true,

        // size
        'vc@btn--sm': this.sm,
        'vc@btn--lg': this.lg,

        // outline
        'vc@btn--flat': this.flat,
        'vc@btn--outline': this.outline,
        'vc@btn--block': this.block,
        'vc@btn--icon': this.icon,
        'vc@btn--left': this.left,
        'vc@btn--right': this.right,

        // states
        'vc@btn--loading': this.loading,
        'vc@btn--disabled': this.disabled,
      }

      for (let key in Contextualable.props) {
        classes[`vc@btn--${key}`] = this[key] && !this.colorForText;
        classes[`vc@text--${key}`] = !this.disabled && this.colorForText && this[key];
      }

      return classes;
    },
  },



  methods: {
    // Prevent focus to match md spec
    click(e) {
      e.detail &&
        this.$el.blur();

      this.$emit('click', e);
    },

    genContent() {
      return this.$createElement(
        'div',
        { 'class': 'vc@btn__content' },
        [this.$slots.default]
      )
    },
  },

  render(h) {
    const { tag, data } = this.generateRouteLink();
    const children = [this.genContent()];
    tag === 'button' && (data.attrs.type = this.type);
    // this.loading && children.push(this.genLoader())
    return h(tag, data, children);
  },
}
</script>