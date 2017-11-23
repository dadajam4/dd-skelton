<style lang="scss" scoped>

.my-router-view {
/*
  position: absolute;
*/
  transition: all .5s cubic-bezier(.55,0,.1,1);
}

.slide {
  $my-ammount: 30px;

  &-enter {
    position: absolute;
    opacity: 0;
    transform: translate(0, -$my-ammount);
  }

  &-leave-active {
    position: absolute;
    opacity: 0;
    transform: translate(0, $my-ammount);
  }
}

.fade {
  $my-ammount: 30px;

  &-enter-active, &-leave-active {
    // transition: opacity 1s;
  }

  &-enter, &-leave-to {
    position: absolute;
    opacity: 0;
  }
}

</style>

<template>
  <vn@-app v-if="routeReady">
    <transition name="fade">
      <app-header v-if="hasNavigation" @click-toggle-drawer="requestToggleDrawer" />
    </transition>

    <transition :name="routerTransitionName">
      <router-view class="my-router-view"></router-view>
    </transition>

    <app-drawer v-if="hasNavigation" v-model="drawer.left" ref="drawerLeft" />

  </vn@-app>
</template>

<script>
import Header from './components/Header';
import Drawer from './components/Drawer';



export default {
  components: {
    'app-header': Header,
    'app-drawer': Drawer,
  },

  data() {
    return {
      routerTransitionName: 'slide',
      drawer: {
        left: false,
      },
      theme: null,
      isTop: false,
      routeReady: false,
    }
  },

  computed: {
    hasNavigation() { return this.routeReady && !this.isTop },
  },


  watch: {
    '$route'(to, from) {
      this.isTop = to.name === 'index';
      this.routerTransitionName = to.name === 'index' || from.name === 'index' ? 'fade' : 'slide';
      this.routeReady = true;
    },
  },

  methods: {
    requestToggleDrawer() {
      this.drawer.left = !this.drawer.left;
      this.$refs.drawerLeft.lastRequested = this.drawer.left;
    },
  },

  created() {
  },
}
</script>
