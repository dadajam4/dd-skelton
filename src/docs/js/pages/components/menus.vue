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
            <vn@-list-tile v-for="item in [{title: 'メニュー1'}, {title: 'メニュー2'}, {title: 'メニュー3'}, {title: 'メニュー4'}, {title: 'メニュー5'}]" :key="item.title" @click="">
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
            <vn@-list-tile v-for="item in [{title: 'メニュー1'}, {title: 'メニュー2'}, {title: 'メニュー3'}, {title: 'メニュー4'}, {title: 'メニュー5'}]" :key="item.title" @click="">
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
            <vn@-list-tile v-for="item in [{title: 'メニュー1'}, {title: 'メニュー2'}, {title: 'メニュー3'}, {title: 'メニュー4'}, {title: 'メニュー5'}]" :key="item.title" @click="">
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
            <vn@-list-tile v-for="item in [{title: 'メニュー1'}, {title: 'メニュー2'}, {title: 'メニュー3'}, {title: 'メニュー4'}, {title: 'メニュー5'}]" :key="item.title" @click="">
              <vn@-list-tile-title>{{ item.title }}</vn@-list-tile-title>
            </vn@-list-tile>
          </vn@-list>
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
