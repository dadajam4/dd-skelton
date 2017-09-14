<style lang="scss" scoped>
  @import "core/index";

  .hoge {
    background: #f00;
    display: flex;

    @include mq-max(sm) {
      background: #f0f;
    }
  }
</style>
<template>
  <div class="dd-app">
    これはAPPです。
    <div class="hoge">
      hoge
      <div class="fuga">
        fuga
      </div>
    </div>

    <div v-if="isPending">
      <p>このボタンを押すとサンプルAPIサーバにajaxリクエストします</p>
      <button @click.stop="fetch">try</button>
    </div>

    <p v-if="isPending">まだ読み込まれてません</p>
    <p v-else-if="isLoading">読み込み中です</p>
    <p v-else-if="isLoaded">{{fetched}}</p>
  </div>
</template>



<script>
import axios from 'axios';

export default {
  created() {
    console.log(this);
  },



  methods: {
    fetch() {
      this.state = 'loading';

      axios.get('/api/sample')
        .then(res => {
          this.fetched = res.data;
          this.state = 'loaded';
        });
    },
  },



  computed: {
    isPending() { return this.state === 'pending' },
    isLoading() { return this.state === 'loading' },
    isLoaded() { return this.state === 'loaded' },
  },



  data() {
    return {
      state: 'pending',
      fetched: null,
    }
  },



  mounted() {
  },
}
</script>
