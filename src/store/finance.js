const finance = {
    state: {
        loans: [],
        timeToRefreshLoans: 0,
    },
    mutations: {
        updateLoans(state, newLoans){
            state.loans = newLoans;
        },
        updateTimeToRefreshLoans(state, newTime){
            state.timeToRefreshLoans = newTime;
        },
        addLoan (state, loan) {
            state.loans.push(loan);
        },
        editLoan (state, loan) {
            const index = state.loans.findIndex(item => item.id === loan.id);
            if (index !== -1) state.loans.splice(index, 1, loan);
        },
        deleteLoan (state, loan) {
            const index = state.loans.findIndex(item => item.id === loan.id);
            if (index !== -1) state.loans.splice(index, 1);
        }
    },
    getters:{
        getLoans(state){
            return state.loans;
        },
        getTimeToRefreshLoans(state){
            return state.timeToRefreshLoans;
        },  
    }
};

export default finance;