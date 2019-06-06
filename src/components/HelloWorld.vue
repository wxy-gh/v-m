/*eslint-disable*/
<template>
  <div class="hello">
    <h2>从页面直接获取的值>>>   {{ this.$store.state.count }}</h2>
    <h2>从getters获取的计算后的值>>>  {{ this.$store.getters.getCount }}</h2>
    <p>count的值>>>{{this.$store.state.count}}</p>
    <button @click="add" style="margin-right:20px">+</button><button @click="sub">-</button>
    <div style="border:1px solid red; margin-top:50px;">
      {{ countt }}
    </div>
    <button @click="visibility">显示</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations} from 'vuex';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapState({
      countt: state => state.count,
      name: "name2",
      obj: state => state.obj
    })
  },
  methods: {
    add(){
      this.$store.dispatch('add',5);
    },
    sub(){
      this.$store.dispatch('sub',2);
    },
    visibility(){
      console.log();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
