const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)

  switch (action.type) {
    case 'GOOD':
      const newState={...state,good:state.good+1}
      return newState
    case 'OK':
      const newState2={...state,ok:state.ok+1}
      return newState2
    case 'BAD':
      const newState3={...state,bad:state.bad+1}
      return newState3
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer