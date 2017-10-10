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
          name="input_1"
          placeholder="田中　太郎"
          hint="3文字以上、5文字以内で入力してください"
          counter="10"
          :rules="[
            {rule: 'min:3', message: '3文字以上にしてね'},
            {rule: 'max:5', message: '5文字以内にしてね'},
          ]"
        ></vn@-text-field>

        <vn@-text-field
          label="文章"
          type="textarea"
          name="input_2"
          placeholder="プレースホルダ"
          hint="100文字以内で入力してください"
          counter="10"
          :rules="[
            {rule: 'max:100', message: '100文字以内にしてね'},
          ]"
        ></vn@-text-field>

        <vn@-text-field
          label="Ammount"
          prefix="$"
        ></vn@-text-field>

        <vn@-text-field
          label="Email address"
          suffix="@gmail.com"
        ></vn@-text-field>

        <vn@-text-field
          label="Phone number"
          left-icon="phone"
        ></vn@-text-field>

        <vn@-text-field
          label="Phone number"
          right-icon="phone"
        ></vn@-text-field>

        <vn@-text-field
          label="Search"
          type="search"
          left-icon="search"
          :suggest="[
            'サジェスト1',
            '長ーいサジェスト2です。長ーいサジェスト2です。長ーいサジェスト2です。長ーいサジェスト2です。長ーいサジェスト2です。長ーいサジェスト2です。',
            'サジェスト3',
          ]"
        ></vn@-text-field>

        <p>hoge</p>
        <p>hoge</p>
        <p>hoge</p>
        <p>hoge</p>
        <p>hoge</p>
        <p>hoge</p>
        <p>hoge</p>
        <p>hoge</p>
        <p>hoge</p>
        <p>hoge</p>
        <p>hoge</p>
        <p>hoge</p>
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
      hoge: '',
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
