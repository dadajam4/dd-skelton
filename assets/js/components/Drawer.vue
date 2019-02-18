<style lang="scss" scoped>
.my-parent-name,
.my-child-name {
  &:first-letter {
    text-transform: uppercase;
  }
}
</style>

<template>
  <vn@-app-drawer left static="desktop" v-model="isActive" ref="drawer">
    <div>
      <router-link :to="{name: 'index'}">トップ</router-link>
    </div>
    <vn@-list>
      <template v-for="parent, parentIndex in links">
        <vn@-list-tile
          v-if="!parent.children"
          :key="parentIndex"
          :to="{name: parent.name}"
        >
          <vn@-list-tile-action>
            <vn@-icon>{{iconMap[parent.name]}}</vn@-icon>
          </vn@-list-tile-action>
          <vn@-list-tile-content>
            <vn@-list-tile-title class="my-parent-name">{{parent.name}}</vn@-list-tile-title>
          </vn@-list-tile-content>
        </vn@-list-tile>

        <vn@-list-group
          v-if="parent.children"
          :key="parentIndex"
          :group="parent.path"
        >
          <vn@-list-tile slot="item">
            <vn@-list-tile-action>
              <vn@-icon>{{iconMap[parent.name]}}</vn@-icon>
            </vn@-list-tile-action>
            <vn@-list-tile-content>
              <vn@-list-tile-title class="my-parent-name">{{parent.name}}</vn@-list-tile-title>
            </vn@-list-tile-content>
            <vn@-list-tile-action>
              <vn@-icon>angle-down</vn@-icon>
            </vn@-list-tile-action>
          </vn@-list-tile>

          <vn@-list-tile
            v-for="child, childIndex in parent.children"
            :key="childIndex"
            :to="{name: child.name}"
          >
            <vn@-list-tile-action>&nbsp;</vn@-list-tile-action>
            <vn@-list-tile-content>
              <vn@-list-tile-title class="my-child-name">{{child._filename}}</vn@-list-tile-title>
            </vn@-list-tile-content>
            <vn@-list-tile-action>
  <!--
              <v-icon>{{ subItem.action }}</v-icon>
  -->
            </vn@-list-tile-action>
          </vn@-list-tile>
  <!--
            <ul v-if="$route.name === child.name && child._anchors" style="padding-left:10px;">
              <li v-for="anchor in child._anchors" :key="anchor.id">
                <a
                  :href="`${child.path}/#${anchor.id}`"
                  v-scroll-to="{
                    element: `#${anchor.id}`,
                    offset: -30,
                    onDone: () => { onDoneScroll(`${child.path}/#${anchor.id}`) },
                  }"
                >{{anchor.label}}</a>
              </li>
            </ul>
  -->
        </vn@-list-group>
      </template>
    </vn@-list>
  </vn@-app-drawer>

</template>

<script>
import routings from '.tmp/public-routings';


const links = [];
const level1 = routings.routes.filter(route => route._level === 1);
level1.forEach(route => {
  links.push({
    name    : route.name,
    path    : route.path,
    children: null,
  });
});

const level2 = routings.routes.filter(route => route._level === 2);
level2.forEach(route => {
  let parent = links.find(link => link.name === route._parent);
  if (!parent) {
    parent = {
      name    : route._parent,
      path    : route.path.replace(/\/((?!\/).)*$/, ''),
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
      iconMap: {
        'getting-started': 'cube',
        components: 'th-large',
        layout    : 'th-list',
        style     : 'columns',
      },
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
