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
      },
      filteredList:{}
    },
  },
  getters:{
    budgetList: ({filteredLists})=> Object.values(filteredLists),
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
    },
    FILTER_BUDGET(state, filter){
      console.log('filtering')
      state.filtered = {};
      switch(filter){
        case 'income':
          Object.assign(state.filtered,Object.values(state.list).filter(x=>x.type=="INCOME"));
          break;
        case 'outcome':
          Object.assign(state.filtered,Object.values(state.list).filter(x=>x.type=="OUTCOME"));
          break;
        default:
          Object.assign(state.filtered,state.list);
          break;
         }
    }
  },
  actions:{
    addNewBudget({commit}, budget){
      commit("ADD_BUDGET",budget)
    },
    deleteBudget({commit}, id){
      commit("DELETE_BUDGET",id)
    },
    filterList: ({commit},filter) => {
      commit("FILTER_BUDGET",filter)
      },
  }
}

export default budgets;