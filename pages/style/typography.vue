<style lang="scss" scoped>
</style>

<template>
  <div>
    <header class="vc@page-header">
      <h1 class="vc@page-header__inner vc@page__container">Typography</h1>
    </header>

    <main class="vc@page">
      <div class="vc@page__container">
        <p class="vc@page__introduction">Use our iOS integration to style your native iOS applications to be consistent with the <span>hogehoge</span></p>
      </div>

      <section id="examples" class="vc@page__section vc@page__container" data-anchor-point>
        <h2 class="vc@page__section-header">Examples</h2>

        <dl v-for="example, index in EXAMPLES" :key="index">
          <dt>{{example.label}}</dt>
          <dd>
            <div :class="example.className">{{example.text}}</div>
          </dd>
        </dl>
      </section>

    </main>
  </div>
</template>

<script>


const EXAMPLES = [
  {
    label: 'h1',
    text: 'This is 最大',
    size: '112',
    className: 'vc@display-4',
    weight: 'regular',
  },
  {
    label: 'h2',
    text: 'Level-2 見出し',
    size: '112',
    className: 'vc@display-3',
    weight: 'regular',
  },
  {
    label: 'h3',
    text: 'Level-3 見出し',
    size: '112',
    className: 'vc@display-2',
    weight: 'regular',
  },
  {
    label: 'h4',
    text: 'Level-4 見出し',
    size: '112',
    className: 'vc@display-1',
    weight: 'regular',
  },
  {
    label: 'h5',
    text: 'Heading 見出しです',
    size: '112',
    className: 'vc@headline',
    weight: 'regular',
  },
  {
    label: 'h6',
    text: 'This is Title. タイトルです',
    size: '112',
    className: 'vc@title',
    weight: 'bold',
  },
  {
    label: 's',
    text: 'This is Sub Heading. 小見出し',
    size: '112',
    className: 'vc@subheading',
    weight: 'regular',
  },
  {
    label: 'b2',
    text: 'This is Bold Body. 太めの本文です',
    size: '112',
    className: 'vc@body-2',
    weight: 'bold',
  },
  {
    label: 'b1',
    text: 'This is Normal Body. 標準の本文です',
    size: '112',
    className: 'vc@body-1',
    weight: 'regular',
  },
  {
    label: 'c',
    text: 'This is Caption. キャプションです',
    size: '112',
    className: 'vc@caption',
    weight: 'regular',
  },
  {
    label: 'sm',
    text: 'This is Small. スモールです',
    size: '112',
    className: 'vc@small',
    weight: 'regular',
  },
];



export default {
  head: {
    title() {
      return {
        inner: 'Typography',
      }
    },
  },

  data() {
    return {
      EXAMPLES,
    }
  },
}
</script>
