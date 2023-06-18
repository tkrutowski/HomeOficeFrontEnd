const finance = {
    state: {
        loans: [],
        fees: [],
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
        },
        //FEE
        updateFees(state, newFees){
            state.fees = newFees;
        },
        addFee (state, fee) {
            state.fees.push(fee);
        },
        editFee (state, fee) {
            const index = state.fees.findIndex(item => item.id === fee.id);
            if (index !== -1) state.fees.splice(index, 1, fee);
        },
        deleteFee (state, fee) {
            const index = state.fees.findIndex(item => item.id === fee.id);
            if (index !== -1) state.fees.splice(index, 1);
        }
    },
    getters:{
        getLoans(state){
            return state.loans;
        },
        getTimeToRefreshLoans(state){
            return state.timeToRefreshLoans;
        },
        //FEE
        getFees(state){
            return state.fees;
        },
    }
};

export default finance;