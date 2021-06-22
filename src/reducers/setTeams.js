const initialstate={
    teams:''
}
export const setTeams= (state=initialstate, action={}) => {
    switch (action.type) {
      case 'SET_TEAMS':
        return Object.assign({}, state, {teams:action.payload})
      default:
        return state
    }
}