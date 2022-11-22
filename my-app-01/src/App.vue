<template>
  <template v-if="false">
  <template v-if="false">
  <div id="app">
    <h1>{{ firstName}}</h1>
    <h2>{{ number + 2 }}</h2>
    <h3>{{number >1 ? 'Number: > 1': 'Number < 1'}}</h3>
    <h3>{{obj}}</h3>
    <a :href="linkUrl">Link</a>
    <a :[attrKey]="linkUrl">Link</a>
  </div>
  <template  v-if="msgIsVisible === 1">
    <div class="message"> Some message!</div></template>
  <template v-else-if="msgIsVisible === 2">
    <div class="message" >Else If message!</div></template>
  <template v-else>
    <div class="message" >Else message!</div>
  </template>
  <div v-show="false">V Show Example</div>

  <div class="name-input" v-if="inputNameVisible">
    <label>Name</label>
    <input type="text" placeholder="input name">
  </div>

  <div class="nickname-input" v-else>
    <label>Nickname</label>
    <input type="text" placeholder="input nickname">
  </div>

  <button @click="inputNameVisible=!inputNameVisible">Change form</button>

  </template>
  <template v-else-if="false">
  <button @click.right="onClick('some value', $event)">Click event</button>
  <a href="" @click.prevent="onLinkClick">Link</a>
  <h1>{{text}}</h1>
  <input type="text" @keyup.enter="onKeyUp">
  </template>
  <template v-else>
   <ul>
      <!-- <li v-for="(user) of users" :key="user.id">{{user.Name}}: {{user.Age}}</li> -->
      <li v-for="(value, name, index) in product" :key="index">{{ index }}{{name}}:{{ value}}</li>
      <!-- <li v-for="(color, index) in colors" :key="index">{{color}}</li> -->
    </ul>
    <input type="text" @keyup.enter="deleteProperty">
  </template>
</template>
<VueBases msg="asdas"/>
<HelloWorld :header="childTitle"
            :user="user"
            @onChangeCounter="onChangeCounter"/>
</template>
<script>
import HelloWorld from './components/HelloWorld.vue';
import VueBases from './components/VueBases.vue';

export default {
  name: 'app',
  components: {
    VueBases,
    HelloWorld
},
  watch:{
    lastName: "onLastNameUpdate"
  },
  computed:{
    fullName:{
      get(){
        return `${this.firstName || "Default"} ${this.lastName || "User"}`
      },
      set(value){
        console.log(value);
        const [firstName, lastName] = value.split(" ");
        console.log(firstName,lastName);
        this.firstName = firstName;
        this.lastName = lastName;
      }
    }
  },
  methods:{
    onChangeCounter(value){
      console.log("In App.vue, counter:", value);
    },
    onLastNameUpdate(value){
      console.log("watch", value);
    },
    setName(e){
      this.fullName = e.target.value;
    },
    onClick(value, e){
      console.log("click",value, e);
    },
    onLinkClick(){
      console.log("on link click");
    },
    onKeyUp(e){

      this.text = e.target.value;
    },
    addNewColor(e){
      //this.colors.push(e.target.value);
      this.colors[this.colors.length] = e.target.value;
      //this.$set(this.colors, this.colors.length, e.target.value);
    },
    deleteProperty(e){
      delete this.product[e.target.value];
    }
  },
  data: () => ({
    colors: ["orange", "black", "yeallow"],
    users: [{Name:"Ivan", Age: 25, id:1 }, {Name:"Egor", Age: 23, id: 2},{Name:"Derek", Age: 18, id: 3}],
    product: { brand:"Apple", model: "iphone 11 pro", price: 1000 },
    text: "",
    user: {
      userName:"Denis"
    },
    childTitle: "Some Title",
    firstName: 'Anatol',
    lastName:'',
    number: 2,
    obj: {
      age: 12,
    },
    linkUrl:"https://google.com",
    attrKey: 'href',
    msgIsVisible: 2,
    isVisibleBlock: true,
    inputNameVisible: true
  })
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
