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
  OPEN_BRANCH
} from '../actions/types';

// getNewBranch here is just to
// inject temp initial state.
const getNewBranch = (tr_id,children) => {
  var newBranch = {
    tr_id
  }
  if(Array.isArray(children)){
    newBranch.children = children;
  } else if(typeof children !== 'undefined') {
    newBranch.children = [children];
  } else {
    newBranch.children = [];
  }

  newBranch.openState = true;

  return newBranch
}

var dummyNode1_3_1 = getNewBranch('tr_6666666666666666');

var dummyNode1_1 = getNewBranch('tr_88888');
var dummyNode1_2 = getNewBranch('tr_88889');
var dummyNode1_3 = getNewBranch('tr_88855',dummyNode1_3_1);
var dummyNode1_4 = getNewBranch('tr_88858');

var dummyRoot1 = getNewBranch('tr_99999');
var dummyRoot2 = getNewBranch('tr_99997',[dummyNode1_1,dummyNode1_2,dummyNode1_3,dummyNode1_4]);
var dummyRoot3 = getNewBranch('tr_99996');
var dummyRoot4 = getNewBranch('tr_99995');

const textBodiesDummie = {
  tr_6666666666666666:'this is tr_6666666666666666',
  tr_88888:'what I researched \n a lot of ideas \n sample',
  tr_88889:'my great ideas',
  tr_88855:'You can toggle me, open and close',
  tr_88858:'rolf rolf',
  tr_99999:'chapter 1. \n dblfdlkaklfdakljfda',
  tr_99997:'I have child text. you can toggle',
  tr_99996:'you can edit',
  tr_99995:'edit text right side'
}

const treeStateDummy = {
  activeBranch:'tr_99996',
  tree:getNewBranch('tree_root', [
    dummyRoot1,
    dummyRoot2,
    dummyRoot3,
    dummyRoot4
  ]),
  textBodies:textBodiesDummie
}

/*
return {
  type: toggleTo,
  value: {
    targetID: targetID,
    focusCurrent: ( toggleTo === 'CLOSE_BRANCH' && activeChildFlag ) ? true : false
  }
}
*/

const toggleBranchState = (state, targetID, openOrClose) => {
  //console.log(processBranches(state.tree.children, targetID, openOrClose))
  console.log(targetID, openOrClose);
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
    case REMOVE_BRANCH:
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
    case TAB_KEY:
    // get caret position/selection
      var val = action.value.target.value,
         start = action.value.target.selectionStart,
         end = action.value.target.selectionEnd;

      // set textarea value to: text before caret + tab + text after caret

      var newText = val.substring(0, start) + '\t' + val.substring(end);

      action.value.target.selectionStart = action.value.target.selectionEnd = start + 1;

      return {
        ...state,
        textBodies:{
          ...state.textBodies,
          [state.activeBranch]:newText
        }
      }


    /*case 'TOGGLE_BRANCH':
      return toggleBranch(state, action.value)*/

    /*return {
      type:'INSERT_BRANCH',
      value: {
        tree: getNewTree(tree, getNewBranchObj(newID), targetParentID, targetIndex),
        activeBranch:newID
      }

    }*/

    case INSERT_BRANCH:
      //focusBranch(action.value.activeBranch);
      return {
        ...state,
        tree:action.value.tree,
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

    default:
      return state
  }
}
/*function focusBranch(id) {
  document.getElementById(id).focus();
}*/

/*
function toggleBranch(state, targetID) {
  //console.log(state)
  var activeBranch,
  activeChildFlag,
  tree = processBranches(state.tree);

  console.log(activeChildFlag);
  return {
    ...state,
    tree:tree,
    activeBranch: activeChildFlag ? targetID : state.activeBranch
  }

  function processBranches(tree) {
    //console.log(tree)
    return tree.map( (branch, index) => {
        if(branch.tr_id === targetID) {
          if(branch.openState && 0 < branch.children.length){
            activeChildFlag = checkIfActiveChild(branch.children);
          }
          return {
            ...branch, openState:branch.openState ? false : true
          }
        } else if(branch.hasChildren){
          return {
            ...branch, children:processBranches(branch.children,targetID)
          }
        } else {
          return branch
        }
    })
  }
  function checkIfActiveChild(tree){
    return tree.some(branch => {
        if(branch.tr_id === state.activeBranch) {
            return true
        }  else if (0 < branch.children.length){
            return checkIfActiveChild(branch.children);
        }
        return false;
      })

  }


}*/

const editText = (state = '', action) => {
  switch (action.type) {
    case TEXT_INPUT_CHANGE:
      return {
        textBody:action.value
      }
    case TAB_KEY:

         // get caret position/selection
        var val = action.target.value,
            start = action.target.selectionStart,
            end = action.target.selectionEnd;

         // set textarea value to: text before caret + tab + text after caret

        var newState = val.substring(0, start) + '\t' + val.substring(end);

        action.target.selectionStart = action.target.selectionEnd = start + 1;

        return newState
    default:
      return state
  }
}

export default treeState
