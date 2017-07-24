import md5 from 'md5';
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
  GET_FILENAME
} from './types';

// @todo
// [ ] separate actions into different files


export const textBodyUpdate = (textBody) => {
  return {
    type:TEXT_BODY_UPDATE,
    value:{
      textBody:textBody
    }
  }
}
//@Todo: delete textAreaUpdate
export const textAreaUpdate = (e) => {
  return {
    type:TEXT_INPUT_CHANGE,
    value:e.target.value
  }
}
//@Todo: old
export const textAreaTab = (e) => {
  return {
    type:TAB_KEY,
    value:e
  }
}
export const updateActiveTree = (id) => {
  return {
    type:UPDATE_ACTIVETREE,
    value:
    {
      targetID:id
    }
  }
}

// @todo: export for testing purpose.
// this would become a part of actions, which is not the greatest sin
// but not recommended.
// should consider the way we export stuff from here
export const getRandomStr = (l) => {
    var t = ''
        ,c = "abcdefghijklmnopqrstuvwxyz0123456789"
        ;
    if(typeof l === 'undefined' || typeof l === 'null'){
      var l = 12
    }

    for( var i=0; i < l; i++ ) {
        t += c.charAt(Math.floor(Math.random() * c.length));
    }
    return t;
};



export const generateNewBranch = (branchType, tree, activeBranch) => {
  //console.log('generateNewBranch...:');
  //console.log(tree);
  var newID = 'tr_' + md5(new Date().toString() + getRandomStr(12) ),
      targetIndex,
      branchData = getBranchPath(tree, activeBranch),
      targetParentID = getParentWithPath(tree, branchData.path ).tr_id;
      //console.log('branchData1: ',branchData);

      //console.log('branchData2: ',branchData);
      //console.log('targetParentID: ',targetParentID);


  //console.log()
  /*if(currentBranch.parentElement.id === 'tree_root') {
    targetParentID = 'tree_root'
  }*/

  if(branchType === 'next'){
    //console.log(branchData.path[branchData.path.length - 1]);
    //console.log(typeof branchData.path[branchData.path.length - 1])

    targetIndex = branchData.path[branchData.path.length - 1] + 1;
    //console.log(branchData.path);
    //console.log(targetIndex);
    //targetIndex = parseInt(currentBranch.dataset.index) + 1;

    //currentBranch is LI, so parent ID is actually parent UL's parent LI's ID
    //console.log("branchType === 'next'")
    //console.log(currentBranch.parentElement.parentElement.id)

  } else if(branchType === 'prev') {
    //targetIndex = parseInt(currentBranch.dataset.index) - 1 ;

    //targetIndex = parseInt(currentBranch.dataset.index) ;
    targetIndex = branchData.path[branchData.path.length - 1];

  } else if(branchType === 'child') {
    targetIndex = 0;
    targetParentID = branchData.foundBranch.tr_id;
    //targetParentID = targetParentID ? targetParentID : currentBranch.id
    //when creating a child, targetParentID always has to be currentBranch.id

  }
  //console.log('targetParentID: ',targetParentID);

  /*var test = {
    type:'INSERT_BRANCH',
    value: {
      tree: getNewTree(tree, getNewBranchObj(newID), targetParentID, targetIndex),
      activeBranch:newID
    }
  }*/
  //console.log(test);

  /*return {
    type:DEFAULT
  }*/

  return {
    type:INSERT_BRANCH,
    value: {
      tree: getNewTree(tree, getNewBranchObj(newID), targetParentID, targetIndex),
      activeBranch:newID
    }

  }


}
const getNewTree =(tree, newBranchObj, targetParentID, targetIndex) => {
  //console.log('getNewTree...:');
  //console.log(tree.children);
  if (targetParentID === 'tree_root') {
    return insertBranchImmutably(tree, newBranchObj, targetIndex);
  } else {
    return {
      ...tree,
      children: tree.children.map( ( branch ) => {
          //console.log('iterating...: ', branch.tr_id);
          //console.log('targetParentID: ', targetParentID);
          //console.log('targetIndex: ', targetIndex);
          if(branch.tr_id === targetParentID) {
            //console.log(branch.tr_id + ' === ' +  targetParentID);
            return {
              ...branch,
              ...insertBranchImmutably(branch, newBranchObj, targetIndex),
              openState:true
            }

          } else if (branch.children.length) {
            return {
              ...branch,
              ...getNewTree(branch, newBranchObj, targetParentID, targetIndex)
            }
          } else {
            return branch
          }


        }
      )
    }
  }
}
const insertBranchImmutably = (obj, newBranchObj, targetIndex) => {
  return {
    ...obj,
    children: [...obj.children.slice(0,targetIndex), newBranchObj, ...obj.children.slice(targetIndex)]
  }
}
const getNewBranchObj = (tr_id,children) => {
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

//http://wecodetheweb.com/2016/02/12/immutable-javascript-using-es6-and-beyond/
export const removeKeyFromObj = (object, targetKey) => {
  return Object.keys(object).reduce((obj, key) => {
    if(key !== targetKey) {
      return { ...obj, [key]:object[key]}
    }
    return obj
  },{})
}

export const removeBranch = (tree, textBodies, activeBranch) => {
  var target = getBranchPath(tree, activeBranch),
  branch = {...target.foundBranch},
  path = target.path,
  parent = getParentWithPath(tree,path),
  newActiveBranch;


  //you cannot delete a branch if there is only one branch in the whole tree...
  if(parent.tr_id === 'tree_root' && parent.children.length === 1) {
    return {
      type:DEFAULT
    }
  }

  if(parent.children.length === 1){ //if it is only child, parent becomes active
    newActiveBranch = parent.tr_id;
  } else if(parent.children.length - 1 === path[path.length - 1]) {//if it is the last child, prev branch becomes active
    newActiveBranch = getPrevSiblingWithPath(tree, path).tr_id
  } else {//else next branch becomes active
    newActiveBranch = getNextSiblingWithPath(tree, path).tr_id
  }
  /*console.log({
    type:REMOVE_BRANCH,
    value:{
      textBodies:removeKeyFromObj(textBodies, activeBranch),
      activeBranch:newActiveBranch,
      tree:removeOneBranchFromTree(tree, activeBranch, path)
    }

  });

  return {
    type:DEFAULT
  }*/
  return {
    type:REMOVE_BRANCH,
    value:{
      textBodies:removeKeyFromObj(textBodies, activeBranch),
      activeBranch:newActiveBranch,
      tree:removeOneBranchFromTree(tree, activeBranch)
    }

  }

}
function immutableDelete (arr, index) {
   return arr.slice(0,index).concat(arr.slice(index+1))
}
export const removeOneBranchFromTree = (branch, activeBranch) => {
   var index = branch.children.findIndex((child) => {
     return child.tr_id === activeBranch
   });
   if(index > -1) {
     return {
       ...branch,
       children:immutableDelete(branch.children, index)
     }
   } else if(branch.children.length) {
     return {
       ...branch,
       children:branch.children.map((child)=>{
         return removeOneBranchFromTree(child, activeBranch)
       })
     }
   } else {
     return {
       ...branch
     }
   }

}

export const moveBranch = (direction, tree, activeBranch) => {
  var target = getBranchPath(tree, activeBranch),
  branch = {...target.foundBranch},
  path = target.path,
  parent = getParentWithPath(tree,path),
  targetParentID, targetIndex, removedTargetTree;
  //console.log(target, branch, path, parent);

  //getNewTree =(tree, newBranchObj, targetParentID, targetIndex)

  if('left' === direction) {//left = one level up
    if(parent.tr_id === 'tree_root'){//if parent is root, then no more up level.
      return {
        type:DEFAULT
      }
    } else {
      removedTargetTree = {...removeOneBranchFromTree(tree, activeBranch)};
      var parentPath = getBranchPath(tree, parent.tr_id).path;
      //console.log('...: ',getBranchPath(tree, parent.tr_id).path);
      var grandParent = getParentWithPath(tree, parentPath);
      //console.log('...2:',grandParent);
      targetParentID = grandParent.tr_id,
      targetIndex = parentPath[parentPath.length - 1] + 1;
      //console.log(newTree, branch, targetParentID, targetIndex);

      return {
        type:MOVE_BRANCH,
        value: getNewTree(removedTargetTree, branch, targetParentID, targetIndex)
      }
    }
  } else if('right' === direction) {//right is one level down
    //if you are parent's only child, you can not go down.
    //also if you are prarent's the oldest child, you can not go down
    //basically, you have to have prev sibling to go right = one level down
    //if(path[path.length - 1] === parent.children.length || path[path.length - 1] === 0){
    if(path[path.length - 1] === 0 || 0 === parent.children.length){
      return {
        type:DEFAULT
      }
    } else {
      removedTargetTree = {...removeOneBranchFromTree(tree, activeBranch)};
      //console.log('...:',getPrevSiblingWithPath(tree, path));
      var targetParent = getPrevSiblingWithPath(tree, path);
      targetParentID = targetParent.tr_id;
      targetIndex = targetParent.children.length;
      /*console.log({
        ...getNewTree({...getNewTree(newTree, branch, targetParentID, targetIndex)}, branch, targetParentID, targetIndex)
      })*/
      return {
        type:MOVE_BRANCH,
        value:getNewTree(removedTargetTree, branch, targetParentID, targetIndex)
      }
    }
  } else if('up' === direction) {//move upword
    if(path[path.length - 1] === 0){//if you are the oldest child, no more upword.
      return {
        type:DEFAULT
      }
    } else {
      removedTargetTree = {...removeOneBranchFromTree(tree, activeBranch)};

      var targetParent = getParentWithPath(tree, path);
      targetParentID = targetParent.tr_id;
      targetIndex = path[path.length - 1] - 1;

      return {
        type:MOVE_BRANCH,
        value:getNewTree(removedTargetTree, branch, targetParentID, targetIndex)
      }
    }

  } else if('down' === direction) {

    /*console.log(
      'activeBranch: ', activeBranch,
      '\npath.length - 1: ', path.length - 1,
      '\npath[path.length - 1]: ', path[path.length - 1],
      '\nparent.children.length: ', parent.children.length,
      '\npath: ', path
    )*/

    // if you are the youngest child, no more downword.
    // this condition seems
    if(path[path.length - 1] === parent.children.length - 1){
      return {
        type:DEFAULT
      }
    } else {
      removedTargetTree = {...removeOneBranchFromTree(tree, activeBranch)};

      var targetParent = getParentWithPath(tree, path);
      targetParentID = targetParent.tr_id;
      targetIndex = path[path.length - 1] + 1;

      return {
        type:MOVE_BRANCH,
        value:getNewTree(removedTargetTree, branch, targetParentID, targetIndex)
      }
    }
  }

  return {
    type:DEFAULT
  }
}
export const treeKeyDown = (o, tree, activeBranch) => {
  var keyMap = {
    ArrowUp: (tree, activeBranch) => {
      return getPrevBranch(tree, activeBranch)
    },
    ArrowDown: (tree, activeBranch) => {
      return getNextBranch(tree, activeBranch)
    },
    ArrowLeft: (tree,activeBranch) => {
      return openBranch(tree,activeBranch);
    },
    ArrowRight: (tree,activeBranch) => {
      return closeBranch(tree,activeBranch);
    }
  }
  return (typeof keyMap[o.key] !== 'undefined') ? keyMap[o.key](tree,activeBranch) : {
    type:DEFAULT
  }
}


function getTargetBranch(obj,activeBranch) {
  var r;
  if(obj.tr_id === activeBranch){
    r = obj
  }  else {
    recursiveCheck(obj.children,activeBranch)
  }
  return r;
  function recursiveCheck(array,activeBranch) {
    for (var i = 0; i < array.length; i++) {
      if(array[i].tr_id === activeBranch){
        r = array[i];
        break
      } else if(array[i].children.length) {
        recursiveCheck(array[i].children,activeBranch)
      }
    }
  }
  /*if(obj.tr_id === activeBranch){
    return obj
  } else  {
    return obj.children.findIndex(processBranches) ? obj.children[obj.children.findIndex(processBranches)] : obj.children.find((branch) => { return getTargetBranch(branch, activeBranch) });
  }

  function processBranches(branch) {
    return branch.tr_id === activeBranch
  }*/
}
function immutablePop(arr){
  return arr.slice(0, -1)
}
export const getPrevSiblingWithPath = (tree, path) => {
  //console.log('getPrevSiblingWithPath:', tree, path);
  if(0 >= path[path.length - 1] ){
    return false
  } else {
    var branch = tree;
    for(var i = 0; i <  path.length; i++) {
      if (i === path.length - 1) {
        branch = branch.children[path[i] - 1]
      } else {
        //console.log(branch);
        branch = branch.children[path[i]]
      }
    }
    return branch
  }

}
export const getNextSiblingWithPath = (tree, path) => {
  var parent = getParentWithPath(tree, path);
  //console.log(path);
  //console.log(parent.children.length, path[path.length - 1]);
  if(parent.children.length - 1 === path[path.length - 1] ) {
    return false
  } else {
    var branch = tree;
    for(var i = 0; i <  path.length; i++) {
      if (i === path.length - 1) {
        branch = branch.children[path[i] + 1]
      } else {
        branch = branch.children[path[i]]
      }
    }
    return branch
  }


}
export const getParentWithPath = (tree, path) => {
  if(path.length === 1) {
    return tree
  } else {
    //console.log(path);
    var parentPath = immutablePop(path);
    //console.log(path);
    return getBranchWithPath(tree, parentPath);
  }
}
export const getBranchWithPath = (tree, path) => {
  var branch = tree;
  for(var i = 0; i <  path.length; i++) {
    branch = branch.children[path[i]]
  }
  return {
    ...branch
  }
}
export const getBranchPath = (tree, targetID) => {
  //console.log('getBranchPath...:',tree)
  //function isArray()
  //http://stackoverflow.com/questions/32141291/javascript-reflection-get-nested-objects-path
  //
  var foundBranch,
  path = '';
  processBranches(tree, targetID,'');
  path = path.substring(1).split('-');
  path = path.map(item => {return parseInt(item)});
  //result = processBranches(tree, targetID,'');
  //console.log('result...:', result);
  return {
    path,
    foundBranch
  }
  function processBranches(branch, targetID, tempPath){
    //console.log(tempPath)
    //var tempPath = tempPath ? tempPath : '';
    for(var i = 0; i < branch.children.length; i++) {

      //console.log(branch.children[i].tr_id + ' ? ' + targetID)
      //console.log(tree.children[i].children.length)
      if(branch.children[i].tr_id===targetID){
        //console.log('branch.children[i].tr_id===targetID',targetID);
        tempPath = tempPath + '-' + i.toString();
        //console.log(tempPath);

        foundBranch = branch.children[i];
        path = tempPath;
        //console.log(tempPath);
        break
        //return tempPath;

      } else if(typeof branch.children[i].children !== 'undefined'){
        if(branch.children[i].children.length) {
          processBranches(branch.children[i], targetID, tempPath + '-' + i.toString() )
        }
      }
    }


  }
  /*function processBranches(tree, targetID, tempPath){
    var tempPath = tempPath ? tempPath : '';
    console.log('processBranches...:');
    for(var i = 0; i < tree.children.length; i++) {
      console.log(tree.children[i].tr_id + ':' + targetID)
      if(tree.children[i].tr_id===targetID){
        console.log('tree.children[i].tr_id===targetID',targetID);
        tempPath = tempPath + ':' + i.toString();
        branch = tree.children[i];
        //console.log()
        break

      }
    }
    if(!branch) {
      for(var i = 0; i < tree.children.length; i++) {
        processBranches(tree.children[i], targetID, tempPath + ':' + i.toString())
      }
    } else if(branch) {
      path = tempPath
    }
  }*?

  /*targetIndex = tree.children.findIndex(branch => {branch.tr_id === targetBranch});
  if(targetIndex) {
    return {
      path:targetIndex.toString(),
      branch:tree.children[targetIndex]
    }
  } else {
    return getBranchData(tree.children,targetBranch,path)
  }*/
}

export const openBranch = (tree,activeBranch) => {
  //console.log('openBranch:...');
  //console.log(activeBranch);


  var targetBranch = getTargetBranch(tree,activeBranch);
  //console.log('targetBranch:...',targetBranch);
  if(targetBranch === undefined) {
    //console.log('something wrong...check');
    return {
      type:DEFAULT
    }
  }

  //console.log('targetBranch.children.length:',targetBranch.children.length);
  //console.log('targetBranch.openState:',targetBranch.openState);

  if(targetBranch.children.length && targetBranch.openState === false) {
    //console.log(toggleBranchOpenState(activeBranch, activeBranch, targetBranch.openState, targetBranch.children))
    return toggleBranchOpenState(activeBranch, activeBranch, targetBranch.openState, targetBranch.children)
  } else {
    return {
      type:DEFAULT
    }
  }
}
export const closeBranch= (tree,activeBranch) => {
  //console.log('closeBranch:...');
  //console.log(tree,activeBranch);


  //console.log(getTargetBranch(tree,activeBranch));
  var targetBranch = getTargetBranch(tree,activeBranch);
  if(targetBranch === undefined) {
    //console.log('something wrong...check');
    return {
      type:DEFAULT
    }
  }

  if(targetBranch.children.length && targetBranch.openState) {
    return toggleBranchOpenState(activeBranch, activeBranch, targetBranch.openState, targetBranch.children)
  } else {
    return {
      type:DEFAULT
    }
  }
}



export const getPrevBranch = (tree, activeBranch) => {//to do: name e no longer suitable. come up with proper name
  //console.log('getPrevBranch');
  //console.log(activeBranch);


  var branchData = getBranchPath(tree, activeBranch),
      parent = getParentWithPath(tree, branchData.path),
      prevSibling = getPrevSiblingWithPath(tree, branchData.path);



  //if(0 < el.dataset.index) {//check current index, and the branch is not first child
  if(0 < branchData.path[branchData.path.length - 1]) {
    //console.log('0 < el.dataset.index');
    if(prevSibling.children.length && prevSibling.openState === true){
      return getPrevSibDownwords(prevSibling);
    } else if( (prevSibling.children.length  && prevSibling.openState === false ) || prevSibling.children.length === 0 ) {
      return {
        type:UPDATE_ACTIVETREE,
        value:
        {
          targetID:prevSibling.tr_id
        }
      }
    }





  } else if (0 === branchData.path[branchData.path.length - 1] && parent.tr_id !== 'tree_root' ) {
    //branch is the first child and its parent is not root
    return {
      type:UPDATE_ACTIVETREE,
      value:
      {
        targetID:parent.tr_id
      }
    }
  } else if (0 === branchData.path[branchData.path.length - 1] && parent.tr_id === 'tree_root' ) {
    return {
      type:DEFAULT
    }
  }

}
function getPrevSibDownwords(branch) {
  if(branch.children[branch.children.length - 1].children.length && branch.children[branch.children.length - 1].openState === true) {

    return  getPrevSibDownwords(branch.children[branch.children.length - 1])

  } else if( (branch.children[branch.children.length - 1].children.length && branch.children[branch.children.length - 1].openState === false ) ||  branch.children[branch.children.length - 1].openState === false  ||  branch.children[branch.children.length - 1].children.length === 0) {
    return {
      type:UPDATE_ACTIVETREE,
      value:
      {
        targetID:branch.children[branch.children.length - 1].tr_id
      }
    }
  }
}


export const getNextBranch = (tree, activeBranch) => {//to do: name e no longer suitable. come up with proper name
  //console.log('getNextBranch...:');



  var branchData = getBranchPath(tree, activeBranch),
      parent = getParentWithPath(tree, branchData.path),
      nextSibling = getNextSiblingWithPath(tree, branchData.path);

  if(branchData.foundBranch.children.length && branchData.foundBranch.openState === true){
    return {
      type:UPDATE_ACTIVETREE,
      value:
      {
        targetID:branchData.foundBranch.children[0].tr_id
      }
    }
  } else if ( (branchData.foundBranch.children.length && branchData.foundBranch.openState === false) ||  branchData.foundBranch.children.length === 0) {
    if(nextSibling !== false) {
      return {
        type:UPDATE_ACTIVETREE,
        value:
        {
          targetID:nextSibling.tr_id
        }
      }
    } else if(parent.tr_id !== 'tree_root') {

      //console.log(getNextSibUpwords(tree, parent))
      //return getNextSiblingUpwords(el)
      return getNextSibUpwords(tree, parent)
    } else if(parent.tr_id === 'tree_root') {
      return {
        type:DEFAULT
      }
    } else {
      return {
        type:DEFAULT
      }
    }
  }

}
function getNextSibUpwords(tree, parent) {

  var parentData = getBranchPath(tree, parent.tr_id),

      nextUncle = getNextSiblingWithPath(tree, parentData.path);
      //console.log('nextUncle:', nextUncle);
    //grandParent = getParentWithPath(tree, parentData.path),
  if(nextUncle !== false) {
  //  console.log();
    return {
      type:UPDATE_ACTIVETREE,
      value:
      {
        targetID:nextUncle.tr_id
      }
    }
  } else {
    var grandParent = getParentWithPath(tree, parentData.path);
    //console.log('grandParent...: ',grandParent.tr_id);
    return getNextSibUpwords(tree, grandParent);
  }
}

export const toggleBranchOpenState = (targetID, activeBranch, openState, children) => {
  var toggleTo, focusCurrent, targetID = targetID;
  //console.log('toggleBranchOpenState...:');
  //console.log(targetID, activeBranch, openState);

  //console.log(openState);
  if(openState) {
    toggleTo = CLOSE_BRANCH
  } else {
    toggleTo = OPEN_BRANCH
  }

  if(toggleTo === CLOSE_BRANCH) {
    //console.log("toggleTo === 'CLOSE_BRANCH'");
    //console.log( checkIfActiveChild(activeBranch,children));
    focusCurrent = checkIfActiveChild(activeBranch,children);
  } else {
    focusCurrent = false
  }

  function checkIfActiveChild(activeBranch,children) {
    return children.some(branch => {
      return (branch.tr_id === activeBranch) ? true : branch.children ? checkIfActiveChild(activeBranch,branch.children) : false
    })
  }
  //console.log('dispaching...');
  /*console.log({
    type:toggleTo,
    value: {
      targetID,
      focusCurrent
    }
  });*/
  return {
    type:toggleTo,
    value: {
      targetID,
      focusCurrent
    }
  }

}

// @todo:
// split actions into multiple files
// export * from './splitAction';
