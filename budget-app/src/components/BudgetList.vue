<template>
  <div class="budget-list-wrap">
    <el-card>
      <template #header>
      <div class="card-header">
        <div>
          <span>{{header}}</span>
          <el-icon  v-if="!isSorted" @click="onSorted" ><DCaret /></el-icon>
          <el-icon  v-if="isSorted & isAscending" @click="onSorted"><CaretBottom /></el-icon>
          <el-icon v-if="isSorted & !isAscending" @click="onSorted"><CaretBottom /></el-icon>
        </div>
        <div class="header_buttons">
          <el-button size="small" @click="onFiltered()" round plain ><el-icon><Top /></el-icon><el-icon><Bottom /></el-icon></el-button>
          <el-button size="small" @click="onFiltered('income')" round plain><el-icon><Top /></el-icon></el-button>
          <el-button size="small" @click="onFiltered('outcome')" round plain><el-icon><Bottom /></el-icon></el-button>
        </div>
      </div>
    </template>
      <template v-if="!isEmpty">
        <div v-for="(item, prop) in budgetList" :key="prop">
        <BudgetListItem :budget="item" @deleteBudget="onDeleteBudget"/>
      </div>
      <el-dialog title="Deleting of the budget" :v-model="dialogVisible" width="30%" :before-close="handleClose">
              <span>Are u sure want to delete the budget?</span>
              <span :v-slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="onConfirmatonOfDelete">Confirm</el-button>
              </span>
            </el-dialog>
    </template>
    <el-alert v-else type="info" :title="emptyTitle" :closable="false"/>
    </el-card>
  </div>
</template>

<script>
import BudgetListItem from './BudgetListItem.vue';
import { mapActions, mapGetters } from "vuex";

  export default{
      name: "BudgetList",
      emits:['onFiltered'],
      mounted(){
        console.log('On mounted');
        this.filterList();
      },
      components:{
        BudgetListItem
      },
      computed:{
        ...mapGetters("budgets",["budgetList"]),
        isEmpty(){
          console.log(this.budgetList == {})
          return this?.budgetList && !Object.keys(this?.budgetList).length
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
        dialogVisible: false,
        idToDelete :0,
        isSorted : false,
        isAscending: false
      }),
      methods:{
        ...mapActions("budgets",["filterList"]),
        onFiltered(param){
          this.filterList(param);
        },
        onSorted(){
          if(!this.isSorted){
          this.isSorted = true;
          console.log(this.isAscending);
          }else{
            console.log(this.isAscending);
            this.isAscending = !this.isAscending;
          }

          this.$emit("isSorted", this.isAscending)
        },
        onConfirmatonOfDelete(){
          this.$emit('deleteBudget',this.idToDelete);
          this.idToDelete = 0;
          this.dialogVisible = false;
        },
        onDeleteBudget(id){
          this.idToDelete = id;
          this.dialogVisible = true;
        },
        handleClose(done){
          this.$confirm('Are u sure want to close this dialog?').then( () =>{
            done();
            })
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

  .card-header{
    display: flex;
    justify-content: space-between;

  }
  .card-header div{
    width:40%;
  }

  .header_buttons{

    align-items: right;
  }
</style>