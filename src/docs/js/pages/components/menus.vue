<style lang="scss" scoped>
</style>

<template>
  <div>
    <header class="vc@page-header">
      <h1 class="vc@page-header__inner vc@container">Menus</h1>
    </header>

    <main class="vc@page">
      <div class="vc@container">
        <p class="vc@page__introduction">Use our iOS integration to style your native iOS applications to be consistent with the <span>hogehoge</span></p>
      </div>

      <section id="basic" class="vc@page__section vc@container" data-anchor-point>
        <h2 class="vc@page__section-header">Basic</h2>

        <vn@-menu offset-y>
          <vn@-btn primary dark slot="activator">Dropdown</vn@-btn>
          <vn@-list>
            <vn@-list-tile v-for="item in items" :key="item.title" @click="">
              <vn@-list-tile-title>{{ item.title }}</vn@-list-tile-title>
            </vn@-list-tile>
          </vn@-list>
        </vn@-menu>
      </section>

      <section id="absolute-position" class="vc@page__section vc@container" data-anchor-point>
        <h2 class="vc@page__section-header">Absolute position</h2>

        <vn@-menu offset-y absolute full-width>
          <vn@-card class="portrait" img="assets/img/portrait/portrait-1.jpg" height="450px" slot="activator"></vn@-card>
          <vn@-list>
            <vn@-list-tile v-for="item in items" :key="item.title" @click="">
              <vn@-list-tile-title>{{ item.title }}</vn@-list-tile-title>
            </vn@-list-tile>
          </vn@-list>
        </vn@-menu>
      </section>

      <section id="absolute-position-without-activator" class="vc@page__section vc@container" data-anchor-point>
        <h2 class="vc@page__section-header">Absolute position without activator</h2>
        <vn@-card class="portrait" img="assets/img/portrait/portrait-2.jpg" height="450px" @contextmenu="showMenu1"></vn@-card>
        <vn@-menu offset-y absolute v-model="menu1.show" :position-x="menu1.x" :position-y="menu1.y">
          <vn@-list>
            <vn@-list-tile v-for="item in items" :key="item.title" @click="">
              <vn@-list-tile-title>{{ item.title }}</vn@-list-tile-title>
            </vn@-list-tile>
          </vn@-list>
        </vn@-menu>
      </section>

      <section id="hover" class="vc@page__section vc@container" data-anchor-point>
        <h2 class="vc@page__section-header">Hover</h2>

        <vn@-menu offset-y open-on-hover>
          <vn@-btn primary dark slot="activator">Dropdown</vn@-btn>
          <vn@-list>
            <vn@-list-tile v-for="item in items" :key="item.title" @click="">
              <vn@-list-tile-title>{{ item.title }}</vn@-list-tile-title>
            </vn@-list-tile>
          </vn@-list>
        </vn@-menu>
      </section>

      <section id="menu" class="vc@page__section vc@container" data-anchor-point>
        <h2 class="vc@page__section-header">Menu</h2>

        <vn@-card>
          <vn@-toolbar color="cyan" dark>
            <vn@-toolbar-side-icon></vn@-toolbar-side-icon>
            <vn@-toolbar-title>これはツールバーです。これはツールバーです。これはツールバーです。</vn@-toolbar-title>
            <vn@-spacer></vn@-spacer>
            <vn@-menu bottom left>
              <vn@-toolbar-side-icon slot="activator"></vn@-toolbar-side-icon>
              <vn@-list>
                <vn@-list-tile v-for="item in items" :key="item.title" @click="">
                  <vn@-list-tile-title>{{ item.title }}</vn@-list-tile-title>
                </vn@-list-tile>
              </vn@-list>
            </vn@-menu>

          </vn@-toolbar>

          <vn@-list>
            <vn@-list-tile @click="">
              <vn@-list-tile-avatar>
                <img src="assets/img/avatar/boy_1.png" alt="">
              </vn@-list-tile-avatar>
              <vn@-list-tile-content>
                <vn@-list-tile-title>タイトル</vn@-list-tile-title>
                <vn@-list-tile-sub-title>サブタイトル</vn@-list-tile-sub-title>
              </vn@-list-tile-content>
            </vn@-list-tile>
          </vn@-list>
        </vn@-card>
      </section>

      <section id="custom-transitions" class="vc@page__section vc@container" data-anchor-point>
        <h2 class="vc@page__section-header">Custom transitions</h2>

        <div class="text-xs-center">
          <vn@-menu
            origin="center center"
            transition="vc@transition-scale"
            bottom
          >
            <vn@-btn primary dark slot="activator">
              Scale Transition
            </vn@-btn>
            <vn@-list>
              <vn@-list-tile v-for="item in items" :key="item.title" @click="">
                <vn@-list-tile-title>{{ item.title }}</vn@-list-tile-title>
              </vn@-list-tile>
            </vn@-list>
          </vn@-menu>

          <vn@-menu
            transition="vc@transition-slide-x"
            bottom
            right
          >
            <vn@-btn primary dark slot="activator">
              Slide X Transition
            </vn@-btn>
            <vn@-list>
              <vn@-list-tile v-for="item in items" :key="item.title" @click="">
                <vn@-list-tile-title>{{ item.title }}</vn@-list-tile-title>
              </vn@-list-tile>
            </vn@-list>
          </vn@-menu>

          <vn@-menu
            transition="vc@transition-slide-y"
            bottom
          >
            <vn@-btn primary dark slot="activator">
              Slide Y Transition
            </vn@-btn>
            <vn@-list>
              <vn@-list-tile v-for="item in items" :key="item.title" @click="">
                <vn@-list-tile-title>{{ item.title }}</vn@-list-tile-title>
              </vn@-list-tile>
            </vn@-list>
          </vn@-menu>
        </div>
      </section>

      <section id="popover-menu" class="vc@page__section vc@container" data-anchor-point>
        <h2 class="vc@page__section-header">Popover menu</h2>

        <vn@-menu offset-x :close-on-content-click="false" :nudge-width="200">
          <vn@-btn primary dark slot="activator">Dropdown</vn@-btn>
          <div>これはメニューです</div>
        </vn@-menu>
      </section>

    </main>
  </div>
</template>

<script>
export default {
  head: {
    title() {
      return {
        inner: 'Menus',
      }
    },
  },

  data() {
    return {
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      menu1: {show: false, x: 0, y: 0},
    }
  },

  computed: {
  },

  methods: {
    showMenu1(e) {
      e.preventDefault()
      this.menu1.show = false
      this.menu1.x = e.clientX
      this.menu1.y = e.clientY
      this.$nextTick(() => {
        this.menu1.show = true
      })
    },

  },

  created() {
  },
}
</script>
