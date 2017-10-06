<script>
import Contextualable from '../../mixins/contextualable';
import GenerateRouteLink from '../../mixins/route-link';



export default {
  name: 'vn@-btn',

  mixins: [
    Contextualable,
    GenerateRouteLink,
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
        [`${this.$options.name}--sm`]: this.sm,
        [`${this.$options.name}--lg`]: this.lg,

        // outline
        [`${this.$options.name}--flat`]: this.flat,
        [`${this.$options.name}--outline`]: this.outline,
        [`${this.$options.name}--block`]: this.block,
        [`${this.$options.name}--icon`]: this.icon,

        // states
        [`${this.$options.name}--loading`]: this.loading,
        [`${this.$options.name}--disabled`]: this.disabled,
      }

      for (let key in Contextualable.props) {
        classes[`${this.$options.name}--${key}`] = this[key] && !this.colorForText;
        classes[`${publicSettings.css.prefix}text--${key}`] = !this.disabled && this.colorForText && this[key];
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
        { 'class': publicSettings.css.prefix + 'btn__content' },
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