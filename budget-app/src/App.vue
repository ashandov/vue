<template>
  <div id="app">
    <FormComponent @submitForm="onFormSubmit"/>
    <TotalBalance :total="totalBalance"/>
    <BudgetList @isSorted="onListSorted"/>
  </div>
</template>

<script>
// import BudgetList from '@/components/BudgetList.vue';
import TotalBalance from '@/components/TotalBalance.vue';
import FormComponent from '@/components/FormComponent.vue';

export default {
  name: 'App',
  components: {
    // BudgetList,
    TotalBalance,
    FormComponent
  },
  created() {
    // Object.assign(this.filteredList,Object.values(this.list));
  },
  computed:{
    totalBalance(){
      return Object.values(this.filteredList).reduce((acc,item)=>
        item.type === 'OUTCOME'? acc -  Math.abs(item.value) : acc + item.value,0
      )
    }
  },
  data : ()=>({

    filteredList :{}
  }),
  methods:{

    onFiltered(value='all'){
      this.filteredList = {};
      console.log('filter hanlder');
      switch(value){
        case 'all':
            Object.assign(this.filteredList,this.list);
              break;
            case 'income':
            Object.assign(this.filteredList,Object.values(this.list).filter(x=>x.type=="INCOME"));
              break;
            case 'outcome':
            Object.assign(this.filteredList,Object.values(this.list).filter(x=>x.type=="OUTCOME"));
              break;
         }

    },
    onListSorted(isAscending){
      let sortedValue = isAscending? Object.values(this.filteredList).sort((x,y)=>y.value - x.value) :  Object.values(this.filteredList).sort((x,y)=>x.value - y.value)
      this.filteredList = {}
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

.red{
    color: red;
  }
</style>
