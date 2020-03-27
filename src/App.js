import React, { useReducer, useContext, createContext, useState } from 'react';

const reducer=(state, action)=>{
  switch(action.type){
    case 'INCREMENT':
      return {count: state.count + 1}
    case 'DECREMENT':
      return {count: state.count - 1}
    case 'RESET':
      return {count: 0}
    case 'INCREMENTBYCUSTOM':
      return {count: state.count + action.payload}
    default:
      throw new Error();
  }
}

const CountContext = createContext();

function Counter(){
    const [state, dispatch] = useContext(CountContext);
    const [countInput, setCountInput] = useState(0);
    return(
      <>
        Count: {state.count}
        <button onClick={()=>dispatch({ type: 'INCREMENT' })}>+</button>
        <button onClick={()=>dispatch({ type: 'DECREMENT' })}>-</button>
        <button onClick={()=>dispatch({ type: 'RESET' })}>reset</button>
        <br />
        <input type="number" onChange={(e)=>setCountInput(Number(e.target.value))} placeholder="Give me an incrementor" />
        <button onClick={()=>dispatch({ type: 'INCREMENTBYCUSTOM', payload: countInput })}>Increment Now!</button>
      </>
    )
}

const UnrelatedCompContainer=()=>{
  return <UnrelatedComp />
}

const UnrelatedComp=()=>{
  const [state, dispatch] = useContext(CountContext);
  return (
    <>
      Count: {state.count}
      <button onClick={()=>dispatch({ type: 'INCREMENT' })}>+</button>
    </>
  )
}

function App() {
  const stateDispatchObj = useReducer(reducer, {count:0});
  return (
    <CountContext.Provider value={stateDispatchObj}>
      <Counter />
      <hr />
      <UnrelatedCompContainer />
    </CountContext.Provider>

  );
}
export default App;