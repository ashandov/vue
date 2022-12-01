<template>
  <div class="list-item" v-if="budget">
            <span class="budget-comment"> {{budget.comment}} </span>
            <span class="budget-value" :class="[redClass]" > {{budget.value}} </span>
            <i v-if="budget.type == 'INCOME'" class="el-icon-top"></i>
            <i v-if="budget.type == 'OUTCOME'" class="el-icon-bottom"></i>
            <el-button type="danger" size="mini" @click="deleteBudget(budget.id)">Delete</el-button>
        </div>
</template>

<script>

export default {
  name:"BudgetListItem",
  mounted(){
        console.log(this.budget);
  },
  props:{
    budget: {
      type: Object,
      default: ()=>({})
    }
  },
  computed:{
    redClass(){
      return{
      'red': this.budget.type == 'OUTCOME'
      }
    }
  },
  methods:{ 
        deleteBudget(id){
          this.$emit('deleteBudget',id);
        },
  },
  data: ()=>({
  })
}
</script>

<style scoped>
    .list-item{
    display: flex;
    align-items: center;
    padding: 10px 15px;
  }

  .budget-value{
    font-weight: bold;
    margin-left: auto;
    margin-right: 20px;
  }
</style>