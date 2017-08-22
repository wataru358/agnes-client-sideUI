import {
  DEFAULT,
  TEXT_BODY_UPDATE,
  TEXT_INPUT_CHANGE,
  TAB_KEY,
  UPDATE_ACTIVETREE,
  INSERT_BRANCH,
  REMOVE_BRANCH,
  MOVE_BRANCH,
  CLOSE_BRANCH,
  OPEN_BRANCH,
  SHOW_SEARCH
} from '../actions/types';

import {
  constructTextBodies,
  constructTree,
  appDescription_treeArray
} from './dummy';

const treeStateDummy = {
  activeBranch:'tr_0',
  tree:{
    tr_id:'tree_root',
    children:constructTree(appDescription_treeArray)
  },
  textBodies:constructTextBodies(appDescription_treeArray)
}


const toggleBranchState = (state, targetID, openOrClose) => {
  //console.log(processBranches(state.tree.children, targetID, openOrClose))
  //console.log(targetID, openOrClose);
  return processBranches(state.tree.children, targetID, openOrClose)

  function processBranches(children, targetID, openOrClose) {
    return children.map( branch => {
        if(branch.tr_id === targetID) {
            return {
              ...branch, openState:(openOrClose === 'open') ? true : false
            }
        } else if(branch.children.length) {
          return {
            ...branch, children:processBranches(branch.children,targetID, openOrClose)
          }
        } else {
          return branch
        }
    })
  }
}

const branchToggle = (state, targetID, openOrClose, focusCurrent) => {
  //console.log('branchToggle');
  //console.log(targetID, openOrClose)

  return {

    tree: processBranches(state.tree, targetID, openOrClose),
    activeBranch: focusCurrent ? targetID : state.activeBranch
  }

  function processBranches(tree, targetID, openOrClose) {
    //console.log('processBranches');
    return tree.map( branch => {
        //console.log(branch.tr_id );
        if(branch.tr_id === targetID) {
          //console.log('branch.tr_id: === ',  targetID);
          //console.log('openState toggeld to:', (openOrClose === 'open') ? true : false)
          return  {
            ...branch, openState:(openOrClose === 'open') ? true : false
          }
        } else if(branch.children.length){
          //console.log(branch.tr_id,'.hasChildren')
          return {
            ...branch, children:processBranches(branch.children,targetID, openOrClose)
          }
        } else {
          return branch
        }
    })
  }
}

const treeState = (state = treeStateDummy, action) => {
  switch (action.type) {
    case SHOW_SEARCH:
      return {
        ...state,
        activeBranch:action.value.activeBranch
      }
    case TEXT_BODY_UPDATE:
    return {
        ...state,
        textBodies:{
          ...state.textBodies,
          [state.activeBranch]:action.value.textBody
        },
        tree:{...state.tree}
      }
    case MOVE_BRANCH:
      return {
        ...state,
        tree:{
          ...state.tree,
          ...action.value
        }
      }
    case REMOVE_BRANCH://REMOVE_BRANCH needs activeTree updated, whereis MOVE_BRANCH does not
      return {
        ...state,
        ...action.value
      }
    case TEXT_INPUT_CHANGE:
      return {
        ...state,
        textBodies:{
          ...state.textBodies,
          [state.activeBranch]:action.value
        }
      }

    case INSERT_BRANCH:
      //focusBranch(action.value.activeBranch);
      return {
        ...state,
        tree: { ...action.value.tree },
        activeBranch:action.value.activeBranch,
        textBodies:{
          ...state.textBodies,
          [action.value.activeBranch]:''
        }
      }

    case UPDATE_ACTIVETREE:
      //focusBranch(action.value.targetID);
      return {...state, activeBranch:action.value.targetID}

    case CLOSE_BRANCH:
      //action.value.focusCurrent ? focusBranch(action.value.targetID) : false ;

      return  {
          ...state,
          activeBranch: action.value.focusCurrent ? action.value.targetID : state.activeBranch,
          tree:{
            ...state.tree,
            children:toggleBranchState(state, action.value.targetID, 'close')
          }
        }

    case OPEN_BRANCH:
    return  {
        ...state,
        tree:{
          ...state.tree,
          children:toggleBranchState(state, action.value.targetID, 'open')
        }
      }

    default: // == case DEFAULT
      return state
  }
}

export default treeState
