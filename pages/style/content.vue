<style lang="scss" scoped>
</style>

<template>
  <div>
    <header class="vc@page-header">
      <h1 class="vc@page-header__inner vc@page__container">Content</h1>
    </header>

    <main class="vc@page">
      <div class="vc@page__container">
        <p class="vc@page__introduction">Use our iOS integration to style your native iOS applications to be consistent with the <span>hogehoge</span></p>
      </div>

      <section id="blockquote" class="vc@page__section vc@page__container" data-anchor-point>
        <h2 class="vc@page__section-header">Block quote</h2>

        <blockquote>Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.</blockquote>
      </section>

      <section id="paragraphs" class="vc@page__section vc@page__container" data-anchor-point>
        <h2 class="vc@page__section-header">Paragraphs</h2>

        <p>Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.</p>

        <p>Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.</p>
      </section>

      <section id="code" class="vc@page__section vc@page__container" data-anchor-point>
        <h2 class="vc@page__section-header">Code</h2>
        Example of an inline <code>&lt;code&gt;</code> element.
      </section>

      <section id="variables" class="vc@page__section vc@page__container" data-anchor-point>
        <h2 class="vc@page__section-header">Variables</h2>
        <var>v</var> = <var>u</var> * <var>e</var>
      </section>

      <section id="user-input" class="vc@page__section vc@page__container" data-anchor-point>
        <h2 class="vc@page__section-header">User input</h2>
        To install Vuetify, type <kbd>npm install vuetify</kbd> into your console. Once complete, type <kbd>cd &lt;project name&gt;</kbd> and run <kbd>npm install</kbd>
      </section>
    </main>
  </div>
</template>

<script>

export default {
  head: {
    title() {
      return {
        inner: 'Content',
      }
    },
  },

  data() {
    return {
    }
  },
}
</script>
