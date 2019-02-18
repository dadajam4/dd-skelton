<style lang="scss" scoped>

.my__container {
  overflow: hidden;
}
</style>

<template>
  <div>
    <header class="vc@page-header">
      <h1 class="vc@page-header__inner vc@page__container">Spacing</h1>
    </header>

    <main class="vc@page">
      <div class="vc@page__container">
        <p class="vc@page__introduction">Use our iOS integration to style your native iOS applications to be consistent with the <span>hogehoge</span></p>
      </div>

      <section id="margin" class="vc@page__section vc@page__container" data-anchor-point>
        <h2 class="vc@page__section-header">Margin</h2>
        <div class="my__container vc@secondary">
          <template v-for="direction in DIRECTIONS">
            <div
              v-for="space in SPACES"
              :key="space.key"
              :class="`vc@primary vc@m-${direction.key}--${space.key}`"
            >{{`vc@m-${direction.key}--${space.key}`}}</div>
          </template>
        </div>
      </section>

      <section id="padding" class="vc@page__section vc@page__container" data-anchor-point>
        <h2 class="vc@page__section-header">Padding</h2>
        <div>
          <template v-for="direction in DIRECTIONS">
            <div
              v-for="space in SPACES"
              :key="space.key"
              :class="`my__container vc@p-${direction.key}--${space.key}`"
            ><div class="my__div">{{`vc@p-${direction.key}--${space.key}`}}</div></div>
          </template>
        </div>
      </section>

    </main>
  </div>
</template>

<script>
const DIRECTIONS = [
  {key: 't', props: ['top']},
  {key: 'r', props: ['right']},
  {key: 'b', props: ['bottom']},
  {key: 'l', props: ['left']},
  {key: 'v', props: ['top', 'bottom']},
  {key: 'h', props: ['left', 'right']},
  {key: 'a', props: ['top', 'bottom', 'left', 'right']},
];

const SPACES = [
  {key: 'none', rem: 0    },
  {key: 'xxxs', rem: 0.125},
  {key: 'xxs' , rem: 0.25 },
  {key: 'xs'  , rem: 0.5  },
  {key: 'sm'  , rem: 0.75 },
  {key: 'md'  , rem: 1    },
  {key: 'lg'  , rem: 1.5  },
  {key: 'xl'  , rem: 2    },
  {key: 'xxl' , rem: 3    },
];

export default {
  head: {
    title() {
      return {
        inner: 'Spacing',
      }
    },
  },

  data() {
    return {
    }
  },

  computed: {
    DIRECTIONS: () => DIRECTIONS,
    SPACES: () => SPACES,
  },
}
</script>
