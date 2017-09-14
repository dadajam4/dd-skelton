<script>



export default {
  name: publicSettings.css.suffix + 'icon',

  functional: true,

  props: {
    md: Boolean,
    lg: Boolean,
    xl: Boolean,
    left: Boolean,
    right: Boolean,
  },



  computed: {
    classes() {
      return {
        [this.$options.name]: true,
      }
    },
  },



  render(h, { props, data, children = [] }) {
    let iconName = '';
    if (children.length) {
      iconName = children.pop().text;
    } else if (data.domProps && data.domProps.textContent) {
      iconName = data.domProps.textContent;
      delete data.domProps.textContent;
    } else if (data.domProps && data.domProps.innerHTML) {
      iconName = data.domProps.innerHTML;
      delete data.domProps.innerHTML;
    }

    const myClassName = `${publicSettings.css.suffix}icon`;

    const classes = {
      [myClassName]                 : true,
      [myClassName + '-' + iconName]: true,
      [myClassName + '--lg']    : props.lg,
      [myClassName + '--md']    : props.md,
      [myClassName + '--xl']    : props.xl,
      [myClassName + '--left']  : props.left,
      [myClassName + '--right'] : props.right,
    }

    data.staticClass = data.staticClass || '';
    const iconClasses = Object.keys(classes).filter(k => classes[k]).join(' ');
    iconClasses && (data.staticClass += ` ${iconClasses}`);

    return h('i', data, children);
  },
}
</script>