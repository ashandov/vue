<template>
  <div class="budget-list-wrap">
    <el-card>
      <template #header>
      <div class="card-header">
        <div>
          <span>{{header}}</span>
          <i v-if="!isSorted" @click="onSorted" class="el-icon-d-caret"></i>
          <i v-if="isSorted & isAscending" @click="onSorted" class="el-icon-caret-top"></i>
          <i v-if="isSorted & !isAscending" @click="onSorted" class="el-icon-caret-bottom"></i>
        </div>
        <div class="header_buttons">
          <el-button size="small" :click="onFiltered()" round plain ><i class="el-icon-top"></i><i class="el-icon-bottom"></i></el-button>
          <el-button size="small" :click="onFiltered('income')" round plain><i class="el-icon-top"></i></el-button>
          <el-button size="small" :click="onFiltered('outcome')" round plain><i class="el-icon-bottom"></i></el-button>
        </div>
      </div>
    </template>
      <template v-if="!isEmpty">
        <div v-for="(item, prop) in list" :key="prop">
        <BudgetListItem :budget="item" @deleteBudget="onDeleteBudget"/>
      </div>
      <el-dialog title="Deleting of the budget" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
              <span>Are u sure want to delete the budget?</span>
              <span slot="footer" class="dialog-footer">
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
        dialogVisible: false,
        idToDelete :0,
        isSorted : false,
        isAscending: false
      }),
      methods:{
        onFiltered(value){
          switch(value){
            case 'all':
              this.$emit('onFiltered','all');
              break;
            case 'income':
              this.$emit('onFiltered','income')
              break;
            case 'outcome':
              this.$emit('onFiltered','outcome')
              break;
          }

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