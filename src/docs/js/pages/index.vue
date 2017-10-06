<style lang="scss" scoped>
</style>

<template>
  <div>
    <main class="vc@container">
      <h1>dd-skelton</h1>
      <p class="vc@text-caption">
        Webコンテンツ制作の際の雛形です。基本的なエレメントのcssマークアップと、vueコンポーネントを実装済みです。
      </p>

      <div>
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

      </div>
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
        inner: 'index',
      }
    },
  },

  data() {
    return {
      CONTEXT_TYPES: CONTEXT_TYPES,
    }
  },

  created() {
  },
}
</script>
