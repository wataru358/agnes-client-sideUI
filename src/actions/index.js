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
  GET_FILENAME,
  TOGGLE_SEARCH_BAR_DISPLAY,
  SHOW_SEARCH_BAR,
  HIDE_SEARCH_BAR,
  UPDATE_SEARCH_INPUT,
  UPDATE_REPLACE_INPUT,
  UPDATE_BRANCH_CLICK_COUNT,
  /*SEARCH_PREV,
  SEARCH_NEXT,*/
  SHOW_SEARCH,
  SEARCH_GOT_NO_MATCH,
  CLEAR_SEARCH_BUFFER,
  CLOSE_ABOUT_OVERLAY
} from './types';

// @todo
// [ ] separate actions into different files

/*
 * UI related
 * globalUIState
 */
 export const closeAboutOverlay = () =>{
   return {
     type: CLOSE_ABOUT_OVERLAY
   }
 }

export const clearSearchBuffer = () =>{
  return {
    type: CLEAR_SEARCH_BUFFER
  }
}
export const toggleSearchBar = () => {
  return {
    type:TOGGLE_SEARCH_BAR_DISPLAY
  }
}
export const showSearchBar = () => {
  return {
    type:SHOW_SEARCH_BAR
  }
}
export const hideSearchBar = () => {
  return {
    type:HIDE_SEARCH_BAR
  }
}
export const updateSearchInput = (e) => {
  return {
    type:UPDATE_SEARCH_INPUT,
    value:e.currentTarget.value
  }
}

export const doSearch = (direction, searchInput, searchBuffer, searchBufferIndex, searchMode, tree, activeBranch, textBodies) => {

  /*console.log('direction',direction);
  console.log('searchInput',searchInput);
  console.log('searchBuffer',searchBuffer);
  console.log('searchBufferIndex',searchBufferIndex);
  console.log('searchMode',searchMode);
  console.log('tree',tree);
  console.log('activeBranch',activeBranch);
  console.log('textBodies',textBodies);
  console.log('searchBufferIndex',searchBufferIndex);
  */
  let nextActiveBranch;

  if(searchBuffer.length === 0) {
      // so we need to construct searchBuffer,
      // get proper activeBranch,
      // set right searchIndex
      console.log('do the search:');
      constructSearchBuffer(tree);

      if(searchBuffer.length) {
          searchBufferIndex = searchBuffer.findIndex((item)=>{
            return item.tr_id === activeBranch
          });
      } else if(searchBuffer.length === 0){
        return {
          type:SEARCH_GOT_NO_MATCH
        }
      }
      console.log(searchBufferIndex);
      if(searchBufferIndex < 0) {
        // activeBranch is not in the searchBuffer,
        // so we need to find the branch nearest to activeBranch
        searchBufferIndex = getNearestBranchInBuffer(direction, activeBranch, tree, searchBuffer, searchInput);
        nextActiveBranch = searchBuffer[searchBufferIndex].tr_id

      } else {
        // activeBranch is in the searchBuffer
        nextActiveBranch = searchBuffer[searchBufferIndex].tr_id;
      }

  } else {
    // just move searchBufferIndex one spep toward direction,
    // we just update:
    // activeBranch and searchBufferIndex
    console.log('move searchBufferIndex:');
    if(direction === 'next') {
      if(searchBufferIndex === searchBuffer.length - 1) {
        searchBufferIndex = 0
      } else {
        searchBufferIndex = searchBufferIndex + 1
      }

    } else {
      if(searchBufferIndex === 0) {
        searchBufferIndex = searchBuffer.length - 1
      } else {
        searchBufferIndex = searchBufferIndex - 1
      }
    }

    nextActiveBranch = searchBuffer[searchBufferIndex].tr_id

  }

  return {
    type:SHOW_SEARCH,
    value:{
      searchBuffer,
      searchBufferIndex,
      activeBranch:nextActiveBranch
    }
  }


  /*if(direction === 'next') {
    return {
      type:SEARCH_NEXT,
      value:{
        searchBuffer,
        searchBufferIndex,
        activeBranch:nextActiveBranch
      }
    }
  } else {
    return {
      type:SEARCH_PREV,
      value:{
        searchBuffer,
        searchBufferIndex,
        activeBranch:nextActiveBranch
      }
    }
  }*/
  function getNearestBranchInBuffer(direction, activeBranch, tree, searchBuffer, searchInput) {
    // we need to return target index in searchBuffer

    if(getBranchPath(tree, activeBranch).path.toString() === '0') {
      if(direction === 'next') {
        return 0
        // return searchBuffer[0].tr_id
      } else {
        return searchBuffer.length - 1;
      }
    }
    let tempArray = [
      {
        tr_id:activeBranch,
        term:searchInput,
        localIndex:0
      },
      ...searchBuffer

      ];
    for(let i = 0; i < tempArray.length; i++){
      tempArray[i].path = getBranchPath(tree, tempArray[i].tr_id).path;
    }
    //console.log(tempArray);
    let theLongestLength = tempArray[tempArray.reduce((maxI,el,i,arr) => {
      //console.log(maxI,el,i,arr);
      return el.path.length > arr[maxI].path.length ? i : maxI;
    }, 0)].length;
    // console.log(theLongestLength);

    for(let i = 0; i < tempArray.length; i++) {
      let diff = theLongestLength - tempArray[i].path.length;

      if(tempArray[i].path.length < theLongestLength) {
        tempArray[i].convertedPath = parseInt(tempArray[i].path.toString().replace(/\,/g,''))
      }
      for(let j = 0; j < diff; j++) {
        tempArray[i].convertedPath *= 10;
      }
    }
    console.log(tempArray);
    //mutable shift
    let origin = tempArray.shift(),
    targetIndex,
    tempDiff;
    if(direction === 'next') {
      tempDiff = tempArray[0].convertedPath - origin.convertedPath;
      targetIndex = tempArray.reduce((trgtI,currentElem,i,array)=>{
        let currentDiff = currentElem.convertedPath - origin.convertedPath;
        if( currentDiff < tempDiff) {
          tempDiff = currentDiff;
          return i
        } else {
          return trgtI
        }

      }, 0);
    } else { // direction === 'prev'
      tempDiff = origin.convertedPath - templArray[0].convertedPath;
      targetIndex = tempArray.reduce((trgtI,currentElem,i,array)=>{
        let currentDiff = origin.convertedPath - currentElem.convertedPath;
        if( currentDiff < tempDiff) {
          tempDiff = currentDiff;
          return i
        } else {
          return trgtI
        }

      },0);
    }
    return targetIndex;
  }
  function constructSearchBuffer(tree) {

    // then we have to walk through entire tree
    //console.log(tree.tr_id, textBodies, searchInput);
    if(tree.tr_id !== 'tree_root') {
      // console.log(searchInput)
      let result = textBodies[tree.tr_id].match(new RegExp(searchInput,'gi'));
      // console.log(result);
      if(result) {
        result.forEach((item,index)=>{
          searchBuffer.push({
            tr_id:tree.tr_id,
            term:item,
            localIndex:index
          });
        })
      }
    }
    // console.log(tree.children);
    if(tree.children.length) {
      tree.children.forEach((item,index)=>{constructSearchBuffer(item)});
    }
    // console.log(searchBuffer);
  }

}


export const updateReplaceInput = (e) => {
  return {
    type:UPDATE_REPLACE_INPUT,
    value:e.currentTarget.value
  }
}
export const updateBranchClickCount = () => {
  return {
    type:UPDATE_BRANCH_CLICK_COUNT
  }
}




/*
 * tree/editor related
 * treeState
 */
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
  // console.log('getNextBranch...activeBranch :',activeBranch);



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

  if(parent.tr_id === 'tree_root'){
    //console.log('getNextSibUpwords...parent.tr_id', parent.tr_id)

    // we could do directly return DEFAULT
    return {
      type:DEFAULT
    }
  }

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
    // console.log('grandParent...: ',grandParent.tr_id);

    /*if(grandParent.tr_id === 'tree_root') {
      return {
        type:DEFAULT
      }
    } else {
      return getNextSibUpwords(tree, grandParent);
    }*/
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
