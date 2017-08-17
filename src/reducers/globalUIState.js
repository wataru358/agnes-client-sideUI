import {
  TOGGLE_SEARCH_BAR_DISPLAY,
  SHOW_SEARCH_BAR,
  HIDE_SEARCH_BAR,
  UPDATE_SEARCH_INPUT,
  UPDATE_REPLACE_INPUT,
  UPDATE_BRANCH_CLICK_COUNT
} from '../actions/types';

const globalUIStateDummy = {
  searchBarDisplayed: false,
  searchStatus:{
    searchInput:'',
    replaceInput:'',
  },
  searchBuffer:[],
  // to track brach click count,
  // which enables editor component to see if
  // the branch is clicked when updating active tree
  branchClickCount:0
}

const globalUIState = (state = globalUIStateDummy, action) => {
  switch (action.type) {
    case TOGGLE_SEARCH_BAR_DISPLAY:
      return {
        ...state,
        searchBarDisplayed:state.searchBarDisplayed ? false : true
      }
    case SHOW_SEARCH_BAR:
      return {
        ...state,
        searchBarDisplayed:true
      }
    case HIDE_SEARCH_BAR:
      return {
        ...state,
        searchBarDisplayed:false
      }
    case  UPDATE_SEARCH_INPUT:
      return {
        ...state,
        searchStatus: {
          ...state.searchStatus,
          searchInput:action.value
        }
      }
    case UPDATE_REPLACE_INPUT:
      return {
        ...state,
        searchStatus: {
          ...state.searchStatus,
          replaceInput:action.value
        }
      }
    case UPDATE_BRANCH_CLICK_COUNT:
      return {
        ...state,
        branchClickCount: state.branchClickCount + 1
      }
    default: // == case DEFAULT
      return state
  }
}
export default globalUIState
