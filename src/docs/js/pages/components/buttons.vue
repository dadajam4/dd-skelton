<style lang="scss" scoped>
</style>

<template>
  <div>
    <header class="vc@page-header">
      <h1 class="vc@page-header__inner vc@page__container">Buttons</h1>
    </header>

    <main class="vc@page">
      <div class="vc@page__container">
        <p class="vc@page__introduction">Use our iOS integration to style your native iOS applications to be consistent with the <span>hogehoge</span></p>
      </div>

      <section id="hoge" class="vc@page__section vc@page__container" data-anchor-point>
        <h2>Flat</h2>
        <vn@-btn
          v-for="type in CONTEXT_TYPES"
          :key="type"
          v-bind="{[type]: true}"
          flat
        >{{type}}</vn@-btn>

        <h2>Fill</h2>
        <vn@-btn
          v-for="type in CONTEXT_TYPES"
          :key="type"
          v-bind="{[type]: true}"
        >{{type}}</vn@-btn>

        <h2>Outline</h2>
        <vn@-btn
          v-for="type in CONTEXT_TYPES"
          :key="type"
          v-bind="{[type]: true}"
          outline
        >{{type}}</vn@-btn>

        <h2>Block</h2>
        <vn@-btn primary block>Block</vn@-btn>

        <h2>Size</h2>
        <vn@-btn
          v-for="size in ['sm', 'default', 'lg']"
          :key="size"
          v-bind="{[size]: true}"
          info
        >{{size}}</vn@-btn>

        <h2>Icon</h2>
        <vn@-btn
          v-for="size in ['sm', 'default', 'lg']"
          :key="size"
          v-bind="{[size]: true}"
          icon
        ><vn@-icon>bars</vn@-icon></vn@-btn>

        <vn@-btn
          v-for="size in ['sm', 'default', 'lg']"
          :key="size"
          v-bind="{[size]: true}"
          icon
          primary
        ><vn@-icon>bars</vn@-icon></vn@-btn>

        <vn@-btn
          v-for="size in ['sm', 'default', 'lg']"
          :key="size"
          v-bind="{[size]: true}"
          icon
          outline
          info
        ><vn@-icon>bars</vn@-icon></vn@-btn>

        <h2>Includes icon</h2>
        <vn@-btn
          primary
        >
          <vn@-icon left>address-book</vn@-icon>
          left
        </vn@-btn>

        <vn@-btn
          info
        >
          right
          <vn@-icon right>cloud-upload</vn@-icon>
        </vn@-btn>

        <vn@-btn
          info
        >
          <vn@-icon left>code</vn@-icon>
          both
          <vn@-icon right>comments</vn@-icon>
        </vn@-btn>

        <h2>Disabled</h2>
        <vn@-btn
          v-for="type in ['flat', 'default', 'outline']"
          :key="type"
          v-bind="{[type]: true}"
          info
          disabled
        >{{type}}</vn@-btn>
        <vn@-btn
          icon
          disabled
        ><vn@-icon>bars</vn@-icon></vn@-btn>
      </section>
    </main>
  </div>
</template>

<script>
import Contextualable from 'public/js/mixins/contextualable';



const CONTEXT_TYPES = Object.keys(Contextualable.props);



export default {
  head: {
    title() {
      return {
        inner: 'Button',
      }
    },
  },

  data() {
    return {
    }
  },

  computed: {
    CONTEXT_TYPES() { return CONTEXT_TYPES },
  },

  created() {
  },
}
</script>
