import { combineReducers }  from 'redux'
//import editorState from './editorState'
import fetchFileName from './fetchFileName'
import treeState from './treeState'

const combinedReducers = combineReducers({
  fetchFileName,
  treeState
});

export default combinedReducers
