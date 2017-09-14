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

</style>

<template>
  <dd-app>
    <app-header />

    <transition :name="routerTransitionName">
      <router-view class="my-router-view"></router-view>
    </transition>

    <app-drawer v-model="drawer.left" />

  </dd-app>
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
    }
  },



  created() {
  },
}
</script>
