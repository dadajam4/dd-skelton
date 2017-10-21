<style lang="scss" scoped>
</style>

<template>
  <vn@-app-drawer left static="desktop" v-model="isActive" ref="drawer">
    <p>
      <router-link :to="{name: 'index'}">トップ</router-link>
    </p>
    <div v-for="parent, parentIndex in links" :key="parentIndex">
      <h3>{{parent.name}}</h3>
      <ul>
        <li v-for="child, childIndex in parent.children">
          <router-link :to="{name: child.name}">{{child._filename}}</router-link>
          <ul v-if="$route.name === child.name && child._anchors" style="padding-left:10px;">
            <li v-for="anchor in child._anchors" :key="anchor">
              <a
                :href="`${child.path}/#${anchor}`"
                v-scroll-to="{
                  element: `#${anchor}`,
                  offset: -30,
                  onDone: () => { onDoneScroll(`${child.path}/#${anchor}`) },
                }"
              >{{anchor}}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </vn@-app-drawer>

</template>

<script>
import routings from '.tmp/docs-routings';



const links = [];
const level2 = routings.routes.filter(route => route._level === 2);
level2.forEach(route => {
  let parent = links.find(link => link.name === route._parent);
  if (!parent) {
    parent = {
      name    : route._parent,
      children: [],
    }
    links.push(parent);
  }
  parent.children.push(route);
});




export default {
  props: {
    value: {
      required: false,
    },
  },

  data() {
    return {
      isActive: this.value,
      links: links,
    }
  },

  computed: {
    lastRequested: {
      get() { return this.$refs.drawer.lastRequested },
      set(lastRequested) { this.$refs.drawer.lastRequested = lastRequested },
    },
  },

  watch: {
    value() {
      this.isActive = this.value;
    },

    isActive() {
      this.$emit('input', this.isActive);
    },
  },

  methods: {
    onDoneScroll(path) {
      window.history.pushState(null, null, path);
    },
  },

  // created() {
  //   setTimeout(() => {
  //   console.warn(this.$router.currentRoute);
  //   }, 1000);
  // },
}
</script>
