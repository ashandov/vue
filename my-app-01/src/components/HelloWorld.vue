<template>
  <div class="hello">
    <h1>{{header}}</h1>
    <button @click="onClick">Sent Event</button><br/><br/>
    <input type="text" v-model="textComputed"/>
    <h2>Input text value": {{text}}</h2>
    <h2>Checkbox value: {{checkboxArray}}</h2>
    <div>
      <input type="checkbox" value="one" v-model="checkboxArray">
      <input type="checkbox" value="two"  v-model="checkboxArray">
      <input type="checkbox" value="three"  v-model="checkboxArray">
    </div>

    <select v-model="select">
      <option value="bmw">BMW</option>
      <option value="audi">Audi</option>
    </select>
    <h2>Select values: {{select}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  computed:{
    textComputed:{
      get(){
        return this.text;
      },
      set(value){
        this.text = value;
        console.log(value);
      }
    }
  },
  props: {
    header: {
      type: String,
      default:'Title',
      required: false
    },
    user:{
      type: Object,
      // default: ()=>({}),
      validator(value){
        console.log(value);
        return value.userName;
      }
    }
  },
  methods:{
    onClick(){
      this.counter +=  1;
      this.$emit("onChangeCounter", this.counter)
    }
  },
  data: ()=> ({
    counter:0,
    text: "default",
    checkbox: false,
    checkboxArray:[],
    select:""
  })
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
