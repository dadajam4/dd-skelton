<style lang="scss" scoped>
</style>

<template>
  <div>
    <header class="vc@page-header">
      <h1 class="vc@page-header__inner vc@page__container">Grid</h1>
    </header>

    <main class="vc@page">
      <div class="vc@page__container">
        <p class="vc@page__introduction">Use our iOS integration to style your native iOS applications to be consistent with the <span>hogehoge</span></p>
      </div>

      <section id="grid" class="vc@page__section vc@page__container" data-anchor-point>
        <h2 class="vc@page__section-header">Grid</h2>

        <vn@-container grid-list-md text-xs-center>
          <vn@-layout row wrap>
            <vn@-flex xs12>
              <vn@-card>
                <vn@-card-text>12</vn@-card-text>
              </vn@-card>
            </vn@-flex>
            <vn@-flex xs6 v-for="i in 2" :key="i">
              <vn@-card>
                <vn@-card-text>6</vn@-card-text>
              </vn@-card>
            </vn@-flex>
            <vn@-flex xs4 v-for="i in 3" :key="i">
              <vn@-card>
                <vn@-card-text>4</vn@-card-text>
              </vn@-card>
            </vn@-flex>
            <vn@-flex xs3 v-for="i in 4" :key="i">
              <vn@-card>
                <vn@-card-text>3</vn@-card-text>
              </vn@-card>
            </vn@-flex>
            <vn@-flex xs2 v-for="i in 6" :key="i">
              <vn@-card>
                <vn@-card-text>2</vn@-card-text>
              </vn@-card>
            </vn@-flex>
            <vn@-flex xs1 v-for="i in 12" :key="i">
              <vn@-card>
                <vn@-card-text>1</vn@-card-text>
              </vn@-card>
            </vn@-flex>
          </vn@-layout>
        </vn@-container>
      </section>

      <section id="offset" class="vc@page__section vc@page__container" data-anchor-point>
        <h2 class="vc@page__section-header">Offset</h2>

        <vn@-container grid-list-xl text-xs-center>
          <vn@-layout row wrap>
            <vn@-flex xs10 offset-xs1>
              <vn@-card dark color="purple">
                <vn@-card-text>xs10 offset-xs1</vn@-card-text>
              </vn@-card>
            </vn@-flex>
            <vn@-flex xs7 offset-xs0 offset-md2 offset-lg5>
              <vn@-card dark color="secondary">
                <vn@-card-text>xs7 offset-xs5</vn@-card-text>
              </vn@-card>
            </vn@-flex>
            <vn@-flex xs12 sm5 md2>
              <vn@-card dark color="primary">
                <vn@-card-text>xs5</vn@-card-text>
              </vn@-card>
            </vn@-flex>
            <vn@-flex xs12 sm5 md3 offset-xs2 offset-lg2>
              <vn@-card dark color="green">
                <vn@-card-text>xs5 offset-xs2</vn@-card-text>
              </vn@-card>
            </vn@-flex>
          </vn@-layout>
        </vn@-container>
      </section>

    </main>
  </div>
</template>

<script>

export default {
  head: {
    title() {
      return {
        inner: 'Grid',
      }
    },
  },

  data() {
    return {
    }
  },
}
</script>
