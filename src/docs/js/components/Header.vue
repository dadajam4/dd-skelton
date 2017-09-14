<style lang="scss" scoped>
</style>

<template>
  <dd-app-header fixed>
    <dd-toolbar-side-icon @click.stop="toggleDrawer" />
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
    toggleDrawer() {
      this.$store.dispatch(
        `${publicSettings.css.key}/drawer/setleft`,
        !this.$store.getters[`${publicSettings.css.key}/drawer/left`]
      );
    },
  },

  created() {
  },
}
</script>
