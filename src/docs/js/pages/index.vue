<style lang="scss" scoped>
</style>

<template>
  <div>
    <main class="dd-container">
      <h1>dd-skelton</h1>
      <p class="dd-text-caption">
        Webコンテンツ制作の際の雛形です。基本的なエレメントのcssマークアップと、vueコンポーネントを実装済みです。
      </p>

      <div>
        <h2>Flat</h2>
        <dd-btn
          v-for="type in CONTEXT_TYPES"
          :key="type"
          v-bind="{[type]: true}"
          flat
        >{{type}}</dd-btn>

        <h2>Fill</h2>
        <dd-btn
          v-for="type in CONTEXT_TYPES"
          :key="type"
          v-bind="{[type]: true}"
        >{{type}}</dd-btn>

        <h2>Outline</h2>
        <dd-btn
          v-for="type in CONTEXT_TYPES"
          :key="type"
          v-bind="{[type]: true}"
          outline
        >{{type}}</dd-btn>

        <h2>Block</h2>
        <dd-btn primary block>Block</dd-btn>

        <h2>Size</h2>
        <dd-btn
          v-for="size in ['sm', 'default', 'lg']"
          :key="size"
          v-bind="{[size]: true}"
          info
        >{{size}}</dd-btn>

        <h2>Icon</h2>
        <dd-btn
          v-for="size in ['sm', 'default', 'lg']"
          :key="size"
          v-bind="{[size]: true}"
          icon
        ><dd-icon>bars</dd-icon></dd-btn>

        <dd-btn
          v-for="size in ['sm', 'default', 'lg']"
          :key="size"
          v-bind="{[size]: true}"
          icon
          primary
        ><dd-icon>bars</dd-icon></dd-btn>

        <dd-btn
          v-for="size in ['sm', 'default', 'lg']"
          :key="size"
          v-bind="{[size]: true}"
          icon
          outline
          info
        ><dd-icon>bars</dd-icon></dd-btn>

        <h2>Includes icon</h2>
        <dd-btn
          primary
        >
          <dd-icon left>address-book</dd-icon>
          left
        </dd-btn>

        <dd-btn
          info
        >
          right
          <dd-icon right>cloud-upload</dd-icon>
        </dd-btn>

        <dd-btn
          info
        >
          <dd-icon left>code</dd-icon>
          both
          <dd-icon right>comments</dd-icon>
        </dd-btn>

        <h2>Disabled</h2>
        <dd-btn
          v-for="type in ['flat', 'default', 'outline']"
          :key="type"
          v-bind="{[type]: true}"
          info
          disabled
        >{{type}}</dd-btn>
        <dd-btn
          icon
          disabled
        ><dd-icon>bars</dd-icon></dd-btn>

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
