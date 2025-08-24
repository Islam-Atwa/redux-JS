

// create action object
const action = {
    type: 'DEPOSIT_MONEY',
}
const action2 = {
    type: 'WITHDRAW_MONEY',
}

// create reducer function 
const reducer = (state =0, action)=>{
    switch(action.type){
        case 'DesPOSIT_MONEY':
            return state + 100;

        case 'WITHDRAW_MONEY':
            return state - 100;

        default:
            return state;
    }        
}

// create store
const store = Redux.createStore(reducer); 
console.log(store.getState());


console.log(Redux);