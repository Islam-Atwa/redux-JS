

(function() {
    const customRedux = function(){
        function createStore(reducer){
            console.log(reducer);
            let state;
            
            const getState = ()=> state;
            
            const dispatch = (action)=>{
                state = reducer(action)

            }
            
            const subscribe = ()=>{}
            
            return {
                getState,
                dispatch,
                subscribe,
                
            };
        }
        return {
            createStore,
        }
    }
    
    if(!window.customRedux){
        window.$redux = window.customRedux = customRedux;
    }
})();



console.log("customRedux", $redux);

const store = $redux.createStore(reducer);

console.log(store);



