<style lang="scss" scoped>
</style>

<template>
  <div>
    <main class="vc@container">
      <h1>Forms</h1>

<!--
      <section>
        <h2>Text Fields</h2>
        <div v-for="type in INPUT_TYPES" :key="type">
          <vn@-text-field
            :type="type"
            :label="type"
            :name="`input_type_${type}`"
            :placeholder="type"
            v-model="inputType[type]"
          ></vn@-text-field>
          <p>{{inputType[type]}}</p>
        </div>
      </section>
-->

      <section>
        <h2>hoge</h2>
        <vn@-text-field
          label="氏名"
          name="input_1_1"
          placeholder="田中　太郎"
          hint="30文字以内で入力してください"
          counter="30"
        ></vn@-text-field>
      </section>
    </main>
  </div>
</template>

<script>
const INPUT_TYPES = [
  'text',
  'search',
  'tel',
  'url',
  'email',
  'password',
  'number',
  'datetime',
  'date',
  'month',
  'week',
  'time',
  'datetime-local',
];


export default {
  head: {
    title() {
      return {
        inner: 'Forms',
      }
    },
  },

  data() {
    return {
      inputType: {},
      hoge: 5,
    }
  },

  computed: {
    INPUT_TYPES() { return INPUT_TYPES },
  },

  created() {
    INPUT_TYPES.forEach(type => {
      this.$set(this.inputType, type, null);
    });
  },
}
</script>
