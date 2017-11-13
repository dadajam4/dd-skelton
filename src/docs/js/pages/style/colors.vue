<style lang="scss" scoped>
</style>

<template>
  <div>
    <header class="vc@page-header">
      <h1 class="vc@page-header__inner vc@page__container">Colors</h1>
    </header>

    <main class="vc@page">
      <div class="vc@page__container">
        <p class="vc@page__introduction">Use our iOS integration to style your native iOS applications to be consistent with the <span>hogehoge</span></p>
      </div>

      <section id="colors" class="vc@page__section vc@page__container" data-anchor-point>
        <h2 class="vc@page__section-header">Colors</h2>

        <div v-for="theme in THEME_TABLE" :key="theme.name" :class="`vc@theme--${theme.name}`">
          <h2>{{theme.name}}</h2>
          <p v-for="color in theme.colors" :key="color" :class="`vc@text--${color}`">{{color}}</p>
        </div>
      </section>

    </main>
  </div>
</template>

<script>

const COLORS = [
  'base',
  'muted',
  'link',
  'link-hover',
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'danger',
  'inverted',
  'secondary-inverted',
  'link-inverted',
  'link-hover-inverted',
];

const THEME_TABLE = [
  {name: 'base'    , colors: []},
  {name: 'inverted', colors: []},
];

COLORS.forEach(color => {
  const themeName = /inverted$/.test(color) ? 'inverted' : 'base';
  THEME_TABLE.find(theme => theme.name === themeName).colors.push(color);
});


export default {
  head: {
    title() {
      return {
        inner: 'Colors',
      }
    },
  },

  data() {
    return {
      THEME_TABLE,
    }
  },
}
</script>
