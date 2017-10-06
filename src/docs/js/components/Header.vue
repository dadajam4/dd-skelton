<style lang="scss" scoped>
</style>

<template>
  <dd-app-header fixed ref="header">
    <dd-toolbar-side-icon @click.stop="onClickToggleDrawer" />
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
