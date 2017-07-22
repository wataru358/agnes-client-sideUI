import React from 'react';
import { mount, shallow } from 'enzyme';
import * as actions from './index';
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
import {
  constructTextBodies,
  constructTree,
  appDescription_treeArray
} from '../reducers/dummy';
// @todo
// [ ] separate tests when separating actions into different files
// but I might judge against that. let's see...




describe('textBodyUpdate', () => {

  const dummyTxt = 'textBodyUpdate returns proper action with type TEXT_BODY_UPDATE';
  const expected = {
    type: TEXT_BODY_UPDATE,
    value: {
      textBody:dummyTxt
    }
  };

  const r = actions.textBodyUpdate(dummyTxt);

  it('should return the value that matches with expected', () => {
    expect(r).toEqual(expected);
  });

});


//@Todo: delete textAreaUpdate
describe('textAreaUpdate', () => {

  const dummyEvent = {
    target:{
      value:'textAreaUpdate returns an action with TEXT_INPUT_CHANGE'
    }
  };

  const expected = {
    type: TEXT_INPUT_CHANGE,
    value:dummyEvent.target.value
  }

  const r = actions.textAreaUpdate(dummyEvent);


  it('should return the value should that matches with expected', () => {
    expect(r).toEqual(expected);
  });

});

//@Todo: old
describe('textAreaTab', () => {

  const dummyEvent = {
    foo:'foo',
    bar:'bar'
  };

  const expected = {
    type: TAB_KEY,
    value:dummyEvent
  }

  const r = actions.textAreaTab(dummyEvent);


  it('should return the value matches with expected', () => {
    expect(r).toEqual(expected);
  });

});


describe('updateActiveTree', () => {

  const id = 'tr_9487542976lklkjgjfg7';

  const expected = {
    type: UPDATE_ACTIVETREE,
    value:{
      targetID:id
    }
  }

  const r = actions.updateActiveTree(id);

  it('return value should matches with expected', () => {
    expect(r).toEqual(expected);
  });
});

describe('getRandomStr', () => {

  const l = 10;

  const r1 = actions.getRandomStr(l);
  const r2 = actions.getRandomStr(l);

  it('should return randome string. Two returns should be same length, but should not have the same content', () => {
    expect(r1.length).toBe(l);
    expect(r2.length).toBe(l);
    expect(r1).not.toBe(r2);
  });
});

describe('generateNewBranch', () => {

  // @note: branchType should be define somewhere...
  const branchTypeNext = 'next';
  const branchTypePrev = 'prev';
  const branchTypeChild = 'child';

  const dummyTree = {
    tr_id:'tree_root',
    children:constructTree(appDescription_treeArray)
  };

  const activeBranch = dummyTree.children[0].tr_id;

  const r1 = actions.generateNewBranch(branchTypeNext, dummyTree, activeBranch);
  const r2 = actions.generateNewBranch(branchTypePrev, dummyTree, activeBranch);
  const r3 = actions.generateNewBranch(branchTypeChild, dummyTree, activeBranch);

  // for all
  const type_expected = INSERT_BRANCH;

  // for r1 & r2
  const arrayLengthA_expected = dummyTree.children.length + 1;

  // for r3
  const arrayLengthB_expected = dummyTree.children[0].children.length + 1;

  // for r1
  const root_firstChildID_expected = dummyTree.children[0].tr_id;

  // for r2
  const root_firstChildID_not_expected = dummyTree.children[0].tr_id;

  // for3
  const root_firstChildIDB_expected = dummyTree.children[0].tr_id;

  // for all
  const activeBranch_not_expected = activeBranch;

  it('should return the actions with proper tree, activeBranchID', () => {

    // r1
    expect(r1.type).toBe(INSERT_BRANCH);
    expect(r1.value.tree.children.length).toBe(arrayLengthA_expected);
    expect(r1.value.tree.children[0].tr_id).toBe(root_firstChildID_expected);
    expect(r1.value.activeBranch).not.toBe(activeBranch_not_expected);

    // r2
    expect(r2.type).toBe(INSERT_BRANCH);
    expect(r2.value.tree.children.length).toBe(arrayLengthA_expected);
    expect(r2.value.tree.children[0].tr_id).not.toBe(root_firstChildID_not_expected);
    expect(r2.value.activeBranch).not.toBe(activeBranch_not_expected);

    // r3
    expect(r3.type).toBe(INSERT_BRANCH);
    expect(r3.value.tree.children[0].children.length).toBe(arrayLengthB_expected);
    expect(r3.value.tree.children[0].tr_id).toBe(root_firstChildIDB_expected);
    expect(r3.value.activeBranch).not.toBe(activeBranch_not_expected);
  });

});
