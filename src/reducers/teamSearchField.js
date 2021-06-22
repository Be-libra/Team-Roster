const initialstate={
    searchValue:''
}
export const setTeamsSearchField = (state=initialstate, action={}) => {
    switch (action.type) {
      case 'TEAMS_SEARCH_CHANGE':
        return Object.assign({}, state, {searchValue:action.payload})
      default:
        return state
    }
  }
