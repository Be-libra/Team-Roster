const initialstate={
    players:''
}
export const setPlayers= (state=initialstate, action={}) => {
    switch (action.type) {
      case 'SET_PLAYERS':
        return Object.assign({}, state, {players:action.payload})
      default:
        return state
    }
}