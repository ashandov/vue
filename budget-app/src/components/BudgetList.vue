<template>
  <div class="budget-list-wrap">
    <el-card :header="header" >
      <template v-if="!isEmpty">
        <div v-for="(item, prop) in list" :key="prop">
        <BudgetListItem :budget="item" @deleteBudget="onDeleteBudget"/>
      </div>
      <el-dialog title="Deleting of the budget" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
              <span>Are u sure want to delete the budget?</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVIsible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
              </span>
            </el-dialog>
    </template>
    <el-alert v-else type="info" :title="emptyTitle" :closable="false"/>
    </el-card>
  </div>
</template>

<script>
import BudgetListItem from './BudgetListItem.vue';
  export default{
      name: "BudgetList",
      components:{
        BudgetListItem
      },
      computed:{
        isEmpty(){
          return !Object.keys(this.list).length
        }
      },
      props: {
        list:{
          type: Object,
          default: ()=> ({})
        }
      },
      data: ()=>({
        header: "Budget List",
        emptyTitle:"Empty List",
        dialogVisible: false
      }),
      methods:{
        onDeleteBudget(id){
          this.dialogVisible = true;
          this.$emit('deleteBudget',id);
        },
        handleClose(done){
          this.$confirm('Are u sure want to close this dialog?').then( () =>{done();})
          .catch(()=>{})

        }
      }
  }
</script>

<style scoped>
  .budget-list-wrap {
    max-width: 500px;
    margin: auto;
  }
</style>