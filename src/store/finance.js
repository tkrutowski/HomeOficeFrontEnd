const finance = {
    state: {
        loans: [],
        fees: [],
        payments: new Map(),
        timeToRefreshLoans: 0,
        installment:{},
        refreshPayment:"0",
    },
    mutations: {
        //REFRESH
        updateRefresh(state, newRefresh){
            console.log("REFRESH",newRefresh);
            state.refreshPayment = newRefresh;
        },
        //LOAN
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
        updateInstallment(state, newInstallment){
            state.installment = newInstallment;
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
        },
        //payment
        refreshPayments (state, payments) {
            state.payments = payments;
        },
        // addPayment (state, payment) {
        //     // const index = state.payments.flat().filter(isNaN).flat().findIndex(item => item.id === payment.id);
        //     const pmt = state.payments.flat().filter(isNaN).flat()
        //         .filter(item => item.id === payment.id).find(item => item.id === payment.idLoan);
        //     pmt.installments.push(payment);
        //
        // },
        updateFeePayment (state, payment) {
            console.log("STORE updateFeePayment: ",payment);

            const pmt = state.payments.flat().filter(isNaN).flat().find(item => item.id === payment.idFee);
            console.log("STORE PAY1",pmt);
            const index =  pmt.installments.findIndex(item => item.idFeeInstallment === payment.idFeeInstallment);
            if (index !== -1) pmt.installments.splice(index, 1, payment);
        },
        updateLoanPayment (state, payment) {
            console.log("STORE updateLoanPayment: ",payment);

            const pmt = state.payments.flat().filter(isNaN).flat().find(item => item.id === payment.idLoan);
            console.log("STORE PAY1",pmt);
            const index =  pmt.installments.findIndex(item => item.idLoanInstallment === payment.idLoanInstallment);
            if (index !== -1) pmt.installments.splice(index, 1, payment);
        },
        resetFinance (state, empty) {
            state.loans = empty;
            state.fees = empty;
            state.payments = new Map();
            state.installment = {};
        }
    },


    getters:{
        getLoans(state){
            return state.loans;
        },
        getTimeToRefreshLoans(state){
            return state.timeToRefreshLoans;
        },
        getInstallment(state){
            return state.installment;
        },
        //FEE
        getFees(state){
            return state.fees;
        },
        //PAYMENTS
        getPayments(state){
            return state.payments;
        },
    }
};

export default finance;