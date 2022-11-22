<template>
  <div id="app">
    <FormComponent @submitForm="onFormSubmit"/>
    <TotalBalance :total="totalBalance"/>
    <BudgetList :list="list" @deleteBudget="onDeleteBudget"/>
  </div>
</template>

<script>
import BudgetList from '@/components/BudgetList.vue';
import TotalBalance from '@/components/TotalBalance.vue';
import FormComponent from '@/components/FormComponent.vue';

export default {
  name: 'App',
  components: {
    BudgetList,
    TotalBalance,
    FormComponent
  },
  computed:{
    totalBalance(){
      return Object.values(this.list).reduce((acc,item)=>
        item.type === 'OUTCOME'? acc -  Math.abs(item.value) : acc + item.value,0
      )
    }
  },
  data : ()=>({
    list:{
      1: {
        type: 'INCOME',
        value: 100,
        comment: "Some comments",
        id: 1
      },
      2: {
        type: 'OUTCOME',
        value: -50,
        comment: "Some outcome comments",
        id: 2
      }
    }
  }),
  methods:{
    onDeleteBudget(id){
      this.$delete(this.list, id);
    },
    onFormSubmit(data){
      const newObj = {
        ...data,
        id: String(Math.random())
      };

      this.$set(this.list, newObj.id, newObj)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
