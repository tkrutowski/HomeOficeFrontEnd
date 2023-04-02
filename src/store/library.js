const library = {
    state: {
        library: [],
        timeToRefresh: 0,
    },
    mutations: {
        updateLibrary(state, newLibrary){
            state.library = newLibrary;
        },
        updateTimeToRefresh(state, newTime){
            state.timeToRefresh = newTime;
        },
    },
    getters:{
        getLibrary(state){
            return state.library;
        },
        getTimeToRefresh(state){
            return state.timeToRefresh;
        },  
    }
};

export default library;