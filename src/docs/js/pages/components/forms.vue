<style lang="scss" scoped>
</style>

<template>
  <div>
    <header class="vc@page-header">
      <h1 class="vc@page-header__inner vc@page__container">Forms</h1>
    </header>

    <main class="vc@page">
      <div class="vc@page__container">
        <p class="vc@page__introduction">Use our iOS integration to style your native iOS applications to be consistent with the <span>hogehoge</span></p>
      </div>

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

      <section id="textfields" class="vc@page__section vc@page__container" data-anchor-point>
        <h2 class="vc@page__section-header">Text fields</h2>

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

        <vn@-text-field
          label="Search"
          type="search"
          left-icon="search"
        >
          <vn@-btn slot="leftBtn" primary outline>左ボタン</vn@-btn>
        </vn@-text-field>

        <vn@-text-field
          label="Search"
          type="search"
          left-icon="search"
          :suggest="[
            'サジェスト1',
            '長ーいサジェスト2です。長ーいサジェスト2です。長ーいサジェスト2です。長ーいサジェスト2です。長ーいサジェスト2です。長ーいサジェスト2です。',
            'サジェスト3',
          ]"
        >
          <vn@-btn slot="rightBtn" primary icon><vn@-icon>search</vn@-icon></vn@-btn>
        </vn@-text-field>

        <vn@-text-field
          label="Comment"
          type="textarea"
        >
          <vn@-btn slot="leftBtn" secondary><vn@-icon>upload</vn@-icon></vn@-btn>
        </vn@-text-field>
      </section>

      <section id="checkboxes" class="vc@page__section vc@page__container" data-anchor-point>
        <h2 class="vc@page__section-header">Checkboxes</h2>
        <vn@-checkbox
          label="modelなし"
          light
          value="aaa"
          name="checkbox1"
          :rules="[
            {rule: 'required', message: 'この項目は必須だよ'},
          ]"
        ></vn@-checkbox>

        <vn@-checkbox
          :label="`modelあり: ${checkbox1 === null ? 'null' : checkbox1.toString()}`"
          v-model="checkbox1"
          light
          value="checked"
          :rules="[
            {rule: 'required', message: 'この項目は必須だよ'},
          ]"
        ></vn@-checkbox>

        <h3>Array</h3>
        <div>{{checkbox2}}</div>
        <vn@-checkbox
          label="太郎"
          v-model="checkbox2"
          light
          value="太郎"
        ></vn@-checkbox>

        <vn@-checkbox
          label="花子"
          v-model="checkbox2"
          light
          value="花子"
        ></vn@-checkbox>

        <h3>States</h3>
        <vn@-checkbox input-value="true" value label="on"></vn@-checkbox>
        <vn@-checkbox value label="off"></vn@-checkbox>
        <vn@-checkbox value indeterminate label="indeterminate"></vn@-checkbox>
        <vn@-checkbox input-value="true" value disabled label="on disabled"></vn@-checkbox>
        <vn@-checkbox value disabled label="off disabled"></vn@-checkbox>
      </section>

      <section id="radios" class="vc@page__section vc@page__container" data-anchor-point>
        <h2 class="vc@page__section-header">Radios</h2>

        <h3>モデル無し</h3>
        <vn@-radio-group name="radio1">
          <vn@-radio label="Radio 1" value="radio-1"></vn@-radio>
          <vn@-radio label="Radio 2" value="radio-2"></vn@-radio>
        </vn@-radio-group>

        <h3>モデル有り</h3>
        <p>&gt;&gt;&gt; {{radio1}}</p>
        <vn@-radio-group v-model="radio1" row>
          <vn@-radio label="Radio 1" value="radio-1"></vn@-radio>
          <vn@-radio label="Radio 2" value="radio-2"></vn@-radio>
          <vn@-radio label="Radio 3" value="radio-3"></vn@-radio>
          <vn@-radio label="Radio 4" value="radio-4"></vn@-radio>
          <vn@-radio label="Radio 5" value="radio-5"></vn@-radio>
          <vn@-radio label="Radio 6" value="radio-6"></vn@-radio>
          <vn@-radio label="Radio 7" value="radio-7"></vn@-radio>
          <vn@-radio label="Radio 8" value="radio-8"></vn@-radio>
          <vn@-radio label="Radio 9" value="radio-9"></vn@-radio>
          <vn@-radio label="Radio 10" value="radio-10"></vn@-radio>
        </vn@-radio-group>

        <h3>状態</h3>
        <vn@-radio-group name="radio2" disabled>
          <vn@-radio label="Radio 1" value="radio-1"></vn@-radio>
          <vn@-radio label="Radio 2" value="radio-2"></vn@-radio>
        </vn@-radio-group>
      </section>

      <section id="selects" class="vc@page__section vc@page__container" data-anchor-point>
        <h2 class="vc@page__section-header">Selects</h2>

        <h3>モデルなし。option直書き</h3>
        <vn@-select name="dummy-select-name">

          <vn@-option v-for="item in selectItems" :key="item.value" :value="item.value">{{item.content}}</vn@-option>
        </vn@-select>

        <h3>モデルあり。props渡し</h3>
        <p>&gt;&gt;&gt; {{selectItems.filter(item => item.value === select1)[0] || '未選択'}}</p>
        <vn@-select v-model="select1" :items="selectItems"></vn@-select>

        <h3>複数選択</h3>
        <p>&gt;&gt;&gt; {{select2}}</p>
        <vn@-select v-model="select2" :items="selectItems" multiple></vn@-select>
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
      checkbox1: null,
      checkbox2: [],
      radio1: null,
      select1: null,
      select2: [],
      selectItems: [
        {content: '選択肢1', value: 1},
        {content: '選択肢2', value: 2},
        {content: '選択肢3', value: 3},
        {content: 'これは長い項目です', value: 4},
        {content: '選択肢5', value: 5},
      ],
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
