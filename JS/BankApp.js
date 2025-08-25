    //constans types
    const DEPOSIT_MONEY = 'DEPOSIT_MONEY';
    const WITHDRAW_MONEY = 'WITHDRAW_MONEY';
    const ADD_PRODUCT = 'ADD_PRODUCT';
    const GET_PRODUCTS = 'GET_PRODUCTS';


//-------------------------------Action Creators-------------------------------//

    // function to deposit money
    const depositMoney = function(amount){
        return {
            type: DEPOSIT_MONEY,
            payload: amount
        }
    }

    // function to withdraw money
    const withdrawMoney = function(amount){
        return {
            type:WITHDRAW_MONEY,
            payload: amount
        }
    }

    // function to add product
    const addProduct = function(product){
        return {
            type: ADD_PRODUCT,   
            payload: product
        }
    }

    // function to get products
    const getProduct = (product)=>{
        return {
            type: GET_PRODUCTS,
            payload:product
        }
    }   

    // fetch products from api
    const fetchProducts=()=>{
        return async(dispatch)=>{
            const res = await fetch('https://fakestoreapi.com/products');
            const data = await res.json();
            console.log(data);
            dispatch(getProduct(data));
        }
    }
//--------------------------------------------------------------//

    // create reducer function 
    const bankReducer = (state =100, action)=>{
        switch(action.type){
            case DEPOSIT_MONEY:
                return state + action.payload;

            case WITHDRAW_MONEY:
                return state - action.payload;

            default:
                return state;
        }        
    }

    const productsReducer = (state =[], action)=>{
        switch(action.type){
            case GET_PRODUCTS:
                return [...action.payload, ...state]
            case ADD_PRODUCT:
                return [...state, action.payload];
            default:
                return state;
        }        
    }

    // multiple reducers
    const rootReducer = Redux.combineReducers({
        bank: bankReducer,
        products: productsReducer
    })

    // create centerlize store 
    const store = Redux.createStore(rootReducer,Redux.applyMiddleware(ReduxThunk)); 

    store.dispatch(depositMoney(100));  100   // dispatch: reducer داله ترسل اجراء الي 
    store.dispatch(withdrawMoney(75));  50
    console.log(store.getState());

    store.dispatch(fetchProducts());


 
    store.dispatch(addProduct({id:1, title:'Product 1'}));  


// UI logic
    const Balance = store.getState().bank;
    let amountInput = document.getElementById('amount');
    
    document.querySelector('#value').innerText = `Balance: $${Balance}`;

    document.querySelector('#deposit').addEventListener('click',()=>{
        store.dispatch(depositMoney(+amountInput.value));
    })

    document.querySelector('#withdraw').addEventListener('click',()=>{
        store.dispatch(withdrawMoney(+amountInput.value)) - Balance;
    }) 


    store.subscribe(()=>{
        console.log('Updated State', store.getState());
        document.querySelector('#value').innerText = `Balence ${store.getState().bank}`;
        amountInput.value = '';
    })

    console.log(Redux);
    // print redux thunk
    // console.log(ReduxThunk);