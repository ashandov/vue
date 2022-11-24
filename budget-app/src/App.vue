<template>
  <div id="app">
    <FormComponent @submitForm="onFormSubmit"/>
    <TotalBalance :total="totalBalance"/>
    <BudgetList @isSorted="onListSorted" @onFiltered="onFiltered" :list="filteredList" @deleteBudget="onDeleteBudget"/>
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
  created() { if(!Object.values(this.filteredList).lenght){
    console.log('init filter');
    this.onFiltered();
  }},
  computed:{
    totalBalance(){
      return Object.values(this.filteredList).reduce((acc,item)=>
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
    },
    filteredList :{}
  }),
  methods:{

    onFiltered(value = 'all'){
      console.log('init');
      switch(value){
            case 'all':
            this.filteredList = {}
            Object.assign(this.filteredList,this.list);
              break;
            case 'income':
            this.filteredList = {}
            Object.assign(this.filteredList,Object.values(this.list).filter(x=>x.type=="INCOME"));
              break;
            case 'outcome':
            this.filteredList = {}
            Object.assign(this.filteredList,Object.values(this.list).filter(x=>x.type=="OUTCOME"));
              break;
          }

    },
    onListSorted(isAscending){
      let sortedValue = isAscending? Object.values(this.filteredList).sort(x=>x.value) :  Object.values(this.filteredList).reverse(x=>x.value)
      this.list = {}
      Object.assign(this.filteredList,sortedValue);
    },
    onDeleteBudget(id){
      this.$delete(this.filteredList, id);
    },
    onFormSubmit(data){
      const newObj = {
        ...data,
        id: String(Math.random())
      };

      this.$set(this.filteredList, newObj.id, newObj)
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

.red{
    color: red;
  }
</style>
