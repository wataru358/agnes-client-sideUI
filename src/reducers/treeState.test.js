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

import {
  constructTextBodies,
  constructTree,
  appDescription_treeArray
} from './dummy';

import treeState from './treeState';

describe('treeState with DEFAULT', () => {

  const treeStateDummy = {
    activeBranch:'tr_0',
    tree:{
      tr_id:'tree_root',
      children:constructTree(appDescription_treeArray)
    },
    textBodies:constructTextBodies(appDescription_treeArray)
  }

  const action = {
    type:DEFAULT
  }

  const r1 = treeState(treeStateDummy, action);

  it('should return the same state', () => {
    expect(r1).toBe(treeStateDummy);
  });

});

describe('treeState with TEXT_BODY_UPDATE', () => {

  const treeStateDummy = {
    activeBranch:'tr_3_0',
    tree:{
      tr_id:'tree_root',
      children:constructTree(appDescription_treeArray)
    },
    textBodies:constructTextBodies(appDescription_treeArray)
  }

  const action = {
    type:TEXT_BODY_UPDATE,
    value:{
      textBody:'I am the text!'
    }
  }

  const r1 = treeState(treeStateDummy, action);
  // console.log('r1:', r1)
  it('should return the updated text in activeBranch', () => {

    expect(r1.textBodies)
      .toHaveProperty(treeStateDummy.activeBranch, action.value.textBody);


  });

});

describe('treeState with MOVE_BRANCH', () => {

  const treeStateDummy = {
    activeBranch:'tr_3_0',
    tree:{
      tr_id:'tree_root',
      children:constructTree(appDescription_treeArray)
    },
    textBodies:constructTextBodies(appDescription_treeArray)
  }

  const treeDummy = {
    tr_id:'tree_root',
    children:constructTree(appDescription_treeArray)
  }
  function immutableSplice(arr, start, deleteCount, ...items) {
    return [ ...arr.slice(0, start), ...items, ...arr.slice(start + deleteCount) ]
  }
  // put first child to second place:
  treeDummy.children = [
    treeDummy.children[1],
    treeDummy.children[0],
    ...treeDummy.children.slice(2,treeDummy.children.length)
  ]



  const action = {
    type:MOVE_BRANCH,
    value:{
      ...treeDummy
    }
  }

  const r1 = treeState(treeStateDummy, action);

  it('should return the updated tree', () => {
    expect(r1.tree).toEqual(treeDummy);
  });

});

describe('treeState with REMOVE_BRANCH', () => {

  const treeStateDummy = {
    activeBranch:'tr_0',
    tree:{
      tr_id:'tree_root',
      children:constructTree(appDescription_treeArray)
    },
    textBodies:constructTextBodies(appDescription_treeArray)
  }

  treeStateDummy.activeBranch = treeStateDummy.tree.children[1].tr_id;

  // delete first children
  // put first child to second place:
  treeStateDummy.tree.children = [
    ...treeStateDummy.tree.children.slice(2, treeStateDummy.tree.children)
  ]

  const action = {
    type:REMOVE_BRANCH,
    value:treeStateDummy
  }

  const r1 = treeState(treeStateDummy, action);

  it('should return the updated tree', () => {
    expect(r1).toEqual(treeStateDummy);
  });

});

describe('treeState with TEXT_INPUT_CHANGE', () => {

  const treeStateDummy = {
    activeBranch:'tr_0',
    tree:{
      tr_id:'tree_root',
      children:constructTree(appDescription_treeArray)
    },
    textBodies:constructTextBodies(appDescription_treeArray)
  }

  const action = {
    type:TEXT_INPUT_CHANGE,
    value:'I am text_input_change!'
  }

  const r1 = treeState(treeStateDummy, action);

  it('should return the updated textBodies', () => {
    expect(r1.textBodies)
      .toHaveProperty(treeStateDummy.activeBranch, action.value);
  });

});

describe('treeState with INSERT_BRANCH', () => {

  const treeStateDummy = {
    activeBranch:'tr_0',
    tree:{
      tr_id:'tree_root',
      children:constructTree(appDescription_treeArray)
    },
    textBodies:constructTextBodies(appDescription_treeArray)
  }

  treeStateDummy.activeBranch = 'tr_4';
  treeStateDummy.tree.children.push(
    {
      id:'tr_4',
      text:'',
      children:[],
      openState:true
    }
  );


  const action = {
    type:INSERT_BRANCH,
    value:treeStateDummy
  }

  const r1 = treeState(treeStateDummy, action);

  it('should return the updated tree, activeBranch, textBodies', () => {
    expect(r1.textBodies)
      .toHaveProperty(treeStateDummy.activeBranch, '');


    expect(r1.activeBranch)
      .toBe(treeStateDummy.activeBranch);

    expect(r1.tree.children)
      .toEqual(treeStateDummy.tree.children);

  });

});

describe('treeState with CLOSE_BRANCH & OPEN_BRANCH', () => {

  const treeStateDummy = {
    activeBranch:'tr_0',
    tree:{
      tr_id:'tree_root',
      children:constructTree(appDescription_treeArray)
    },
    textBodies:constructTextBodies(appDescription_treeArray)
  }

  treeStateDummy.tree.children[1].openState = false;

  const action1 = {
    type:CLOSE_BRANCH,
    value:{
      targetID:treeStateDummy.tree.children[3].tr_id
    }
  }

  const action2 = {
    type:OPEN_BRANCH,
    value:{
      targetID:treeStateDummy.tree.children[1].tr_id
    }
  }

  const r1 = treeState(treeStateDummy, action1);
  const r2 = treeState(treeStateDummy, action2);

  it('should return the updated tree with target branch\'s openState toggled', () => {

    expect(r1.tree.children[3].openState)
      .toBe(!treeStateDummy.tree.children[3].openState);

    expect(r2.tree.children[1].openState)
      .toBe(!treeStateDummy.tree.children[1].openState);

  });


});
