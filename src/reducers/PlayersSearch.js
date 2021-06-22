const initialstate={
    searchValue:''
}
export const setPlayersSearchField = (state=initialstate, action={}) => {
    switch (action.type) {
      case 'PLAYERS_SEARCH_CHANGE':
        return Object.assign({}, state, {searchValue:action.payload})
      default:
        return state
    }
  }
