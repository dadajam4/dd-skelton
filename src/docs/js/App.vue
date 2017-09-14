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
    <dd-app-header fixed>
      <dd-toolbar-side-icon @click.stop="drawer.left = !drawer.left" />
      <dd-toolbar-title>dd-skelton</dd-toolbar-title>
      <dd-spacer />
      <nav>
        <a class="dd-toolbar__trigger dd-toolbar__trigger--active" href="#">ガイド</a>
        <a class="dd-toolbar__trigger" href="#">API</a>
        <a class="dd-toolbar__trigger" href="#">例</a>
        <a class="dd-toolbar__trigger" href="#">エコシステム</a>
        <a class="dd-toolbar__trigger" href="#">言語</a>
        <a class="dd-toolbar__trigger" href="#">ショップ</a>
      </nav>
    </dd-app-header>

    <transition :name="routerTransitionName">
      <router-view class="my-router-view"></router-view>
    </transition>

    <app-drawer v-model="drawer.left"></app-drawer>

  </dd-app>
</template>

<script>
import Drawer from './components/Drawer';
import Contextualable from 'public/js/ui/mixins/contextualable';



const CONTEXT_TYPES = Object.keys(Contextualable.props);



window.onpopstate = (hoge) => {
  console.log(hoge.state);
}

window.onpushstate = (hoge) => {
  console.log(hoge.state);
}

export default {
  components: {
    'app-drawer': Drawer,
  },

  data() {
    return {
      routerTransitionName: 'slide',
      drawer: {
        left: false,
      },
      CONTEXT_TYPES: CONTEXT_TYPES,
    }
  },

  watch: {
    '$route' (to, from) {
      // console.log(to);
      // const toDepth = to.path.split('/').length;
      // const fromDepth = from.path.split('/').length;
      // this.routerTransitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
  },

  created() {
  },
}
</script>
