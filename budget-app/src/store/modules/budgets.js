const budgets = {
  namespaced: true,
  state:{
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
      },
      3: {
        type: 'INCOME',
        value: 23,
        comment: "Some outcome comments",
        id: 2
      },
      4: {
        type: 'OUTCOME',
        value: -29,
        comment: "Some outcome comments",
        id: 2
      }
    },
  },
  getters:{
    budgetList: ({list})=> Object.values(list),
    filteredList: ({list},filter) => {
      switch(filter){
        case 'income':
            return Object.values(list).filter(x=>x.type=="INCOME");
        case 'outcome':
            return Object.values(list).filter(x=>x.type=="OUTCOME");
        default:
            return list;
         }
      },
    sortedList: ({list}, isAscending)=>{
      return isAscending? Object.values(list).sort((x,y)=>y.value - x.value) :  Object.values(list).sort((x,y)=>x.value - y.value)
    }
  },
  mutations:{
    ADD_BUDGET(state,budget){
      state.list[budget.id] = budget;
    },
    DELETE_BUDGET(state,id){
     delete state.list[id];
    }
  },
  actions:{
    addNewBudget({commit}, budget){
      commit("ADD_BUDGET",budget)
    },
    deleteBudget({commit}, id){
      commit("DELETE_BUDGET",id)
    },
    filterList: ({list},filter) => {
      console.log(list,filter)
      switch(filter){
        case 'income':
            return Object.values(list).filter(x=>x.type=="INCOME");
        case 'outcome':
            return Object.values(list).filter(x=>x.type=="OUTCOME");
        default:
            return list;
         }
      },
  }
}

export default budgets;