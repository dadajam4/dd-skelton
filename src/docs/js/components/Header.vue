<style lang="scss" scoped>
</style>

<template>
  <vn@-app-header fixed ref="header">
    <vn@-toolbar-side-icon @click.stop="onClickToggleDrawer" />
    <vn@-toolbar-title>dd-skelton</vn@-toolbar-title>
    <vn@-spacer />
<!--
    <nav>
      <a class="vc@toolbar__trigger vc@toolbar__trigger--active" href="#">ガイド</a>
      <a class="vc@toolbar__trigger" href="#">API</a>
      <a class="vc@toolbar__trigger" href="#">例</a>
      <a class="vc@toolbar__trigger" href="#">エコシステム</a>
      <a class="vc@toolbar__trigger" href="#">言語</a>
      <a class="vc@toolbar__trigger" href="#">ショップ</a>
    </nav>
-->
  </vn@-app-header>

</template>

<script>



export default {
  props: {
  },

  data() {
    return {
    }
  },

  watch: {
  },

  methods: {
    onClickToggleDrawer(e) {
      this.$emit('click-toggle-drawer');
    },
  },

  created() {
  },
}
</script>
