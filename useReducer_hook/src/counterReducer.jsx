import React,{useReducer} from "react";

//step1: Define a reducer fn
function counterReducer(state,action){
        switch(action.type){
            case 'increment':
                return{count: state.count+1};
            case 'decrement':
                return{count: state.count-1};
            case 'reset':
                return{count:0};
            default:
                throw new Error('Unknown action type.!!');
        }
}
function Counter(){
    //step2: Intialize useReducer hook
    const [state,dispatch] = useReducer(counterReducer,{count:0});

    return(
        //step3: Dispatch actions
        <div>
            <h1>Count:{state.count}</h1>
            
            <button onClick={()=>dispatch({type:'increment'})}>
                Increment
            </button>
            <button onClick={()=>dispatch({type:'decrement'})}>
                Decrement
            </button>
            <button onClick={()=>dispatch({type:'reset'})}>
                Reset
            </button>
        </div>
    );
}
export default Counter;