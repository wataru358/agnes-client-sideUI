import { combineReducers }  from 'redux'
//import editorState from './editorState'
import fetchFileName from './fetchFileName'
import treeState from './treeState'
import globalUIState from './globalUIState'

const combinedReducers = combineReducers({
  fetchFileName,
  treeState,
  globalUIState
});

export default combinedReducers
