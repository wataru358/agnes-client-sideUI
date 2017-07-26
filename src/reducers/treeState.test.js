import React from 'react';
import { mount, shallow } from 'enzyme';
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

  it('should return the updated text in activeBranch', () => {
    expect(r1.textBodies.tr_3_0).toBe('I am the text!');
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
