<style lang="scss" scoped>
</style>

<template>
  <div>
    <header class="vc@page-header">
      <h1 class="vc@page-header__inner vc@page__container">Lists</h1>
    </header>

    <main class="vc@page">
      <div class="vc@page__container">
        <p class="vc@page__introduction">Use our iOS integration to style your native iOS applications to be consistent with the <span>hogehoge</span></p>
      </div>

      <section id="basic" class="vc@page__section vc@page__container" data-anchor-point>
        <h2 class="vc@page__section-header">Basic</h2>

        <vn@-card>
          <vn@-toolbar color="cyan" dark>
            <vn@-toolbar-side-icon></vn@-toolbar-side-icon>
            <vn@-toolbar-title>これはツールバーです。これはツールバーです。これはツールバーです。</vn@-toolbar-title>
            <vn@-spacer></vn@-spacer>
            <vn@-btn lg icon>
              <vn@-icon>search</vn@-icon>
            </vn@-btn>
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
            <vn@-list-tile @click="">
              <vn@-list-tile-avatar>
                <img src="assets/img/avatar/boy_2.png" alt="">
              </vn@-list-tile-avatar>
              <vn@-list-tile-content>
                <vn@-list-tile-title>タイトル</vn@-list-tile-title>
                <vn@-list-tile-sub-title>サブタイトル</vn@-list-tile-sub-title>
                テキストが入ります。テキストが入ります。テキストが入ります。
              </vn@-list-tile-content>
            </vn@-list-tile>
            <vn@-list-tile @click="">
              <vn@-list-tile-avatar>
                <img src="assets/img/avatar/boy_3.png" alt="">
              </vn@-list-tile-avatar>
              <vn@-list-tile-content>
                <vn@-list-tile-title>長いタイトルが入ります。長いタイトルが入ります。長いタイトルが入ります。長いタイトルが入ります。長いタイトルが入ります。長いタイトルが入ります。</vn@-list-tile-title>
                <vn@-list-tile-sub-title>長いサブタイトルが入ります。長いサブタイトルが入ります。長いサブタイトルが入ります。長いサブタイトルが入ります。</vn@-list-tile-sub-title>
                テキストが入ります。テキストが入ります。テキストが入ります。
              </vn@-list-tile-content>
            </vn@-list-tile>
          </vn@-list>
        </vn@-card>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  head: {
    title() {
      return {
        inner: 'Lists',
      }
    },
  },

  data() {
    return {
    }
  },

  computed: {
  },

  created() {
  },
}
</script>
