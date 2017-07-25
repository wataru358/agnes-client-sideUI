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
    expect(r1.type).toEqual(INSERT_BRANCH);
    expect(r1.value.tree.children.length).toBe(arrayLengthA_expected);
    expect(r1.value.tree.children[0].tr_id).toBe(root_firstChildID_expected);
    expect(r1.value.activeBranch).not.toBe(activeBranch_not_expected);

    // r2
    expect(r2.type).toEqual(INSERT_BRANCH);
    expect(r2.value.tree.children.length).toBe(arrayLengthA_expected);
    expect(r2.value.tree.children[0].tr_id).not.toBe(root_firstChildID_not_expected);
    expect(r2.value.activeBranch).not.toBe(activeBranch_not_expected);

    // r3
    expect(r3.type).toEqual(INSERT_BRANCH);
    expect(r3.value.tree.children[0].children.length).toBe(arrayLengthB_expected);
    expect(r3.value.tree.children[0].tr_id).toBe(root_firstChildIDB_expected);
    expect(r3.value.activeBranch).not.toBe(activeBranch_not_expected);
  });

});

describe('removeKeyFromObj', () => {

  const testObj = {
    foo:'foo',
    bar:'bar'
  }
  const expected = {
    foo:'foo'
  }

  const r = actions.removeKeyFromObj(testObj,'bar');

  it('return object with the key property removed', () => {
    expect(r).toEqual(expected);
  });

});

describe('removeBranch', () => {

  const dummyTree = {
    tr_id:'tree_root',
    children:constructTree(appDescription_treeArray)
  };
  const dummyBodies = constructTextBodies(appDescription_treeArray)

  // @note: activeBranch is going to be removed.
  const activeBranch1 = dummyTree.children[0].tr_id;
  const activeBranch2 = dummyTree.children[1].children[0].tr_id;
  const activeBranch3 = dummyTree.children[3].tr_id;
  const activeBranch4 = dummyTree.children[3].children[0].tr_id;

  const r1 = actions.removeBranch(dummyTree, dummyBodies, activeBranch1);
  const r2 = actions.removeBranch(dummyTree, dummyBodies, activeBranch2);
  const r3 = actions.removeBranch(dummyTree, dummyBodies, activeBranch3);
  const r4 = actions.removeBranch(dummyTree, dummyBodies, activeBranch4);


  it('should return action w/ REMOVE_BRANCH, value containing new textBodies and tree w/ target branch removed', () => {

    // r1
    expect(r1.type).toEqual(REMOVE_BRANCH);

    // textBodies
    expect(r1.value.textBodies)
      .not.toHaveProperty(activeBranch1, dummyBodies[activeBranch1]);

    // activeBranch
    expect(r1.value.activeBranch)
      .toBe(dummyTree.children[1].tr_id);

    // tree
    expect(r1.value.tree).not
      .toEqual(expect.arrayContaining([dummyTree.children[0]]));
    expect(r1.value.tree.children.length)
      .toBe(dummyTree.children.length - 1);

    // r2
    expect(r2.type).toEqual(REMOVE_BRANCH);
    expect(r2.value.textBodies)
      .not.toHaveProperty(activeBranch2, dummyBodies[activeBranch2]);
    expect(r2.value.activeBranch)
      .toBe(dummyTree.children[1].children[1].tr_id);
    expect(r2.value.tree.children[1].children).not
      .toEqual(expect.arrayContaining([dummyTree.children[1].children]));
    expect(r2.value.tree.children[1].children.length)
      .toBe(dummyTree.children[1].children.length - 1);

    // r3
    expect(r3.type).toEqual(REMOVE_BRANCH);
    expect(r3.value.textBodies)
      .not.toHaveProperty(activeBranch3, dummyBodies[activeBranch3]);
    expect(r3.value.activeBranch)
      .toBe(dummyTree.children[2].tr_id);
    expect(r3.value.tree.children).not
      .toEqual(expect.arrayContaining([dummyTree.children[3]]));
    expect(r3.value.tree.children.length)
      .toBe(dummyTree.children.length - 1);

    // r4
    expect(r4.type).toEqual(REMOVE_BRANCH);
    expect(r4.value.textBodies)
      .not.toHaveProperty(activeBranch4, dummyBodies[activeBranch4]);
    expect(r4.value.activeBranch)
      .toBe(dummyTree.children[3].tr_id);
    expect(r4.value.tree.children[3].children).not
      .toEqual(expect.arrayContaining([dummyTree.children[3].children[0]]));
    expect(r4.value.tree.children[3].children.length)
      .toBe(dummyTree.children[3].children.length - 1);

  });

});

describe('moveBranch', () => {

  const dummyTree = {
    tr_id:'tree_root',
    children:constructTree(appDescription_treeArray)
  };

  const activeBranch1 = dummyTree.children[0].tr_id;
  const activeBranch2 = dummyTree.children[1].children[0].tr_id;
  const activeBranch3 = dummyTree.children[3].tr_id;
  const activeBranch4 = dummyTree.children[3].children[0].tr_id;

  const directionLeft = 'left';
  const directionRight = 'right';
  const directionUp = 'up';
  const directionDown = 'down';

  const r1_left = actions.moveBranch(directionLeft, dummyTree, activeBranch1);
  const r1_right = actions.moveBranch(directionRight, dummyTree, activeBranch1);
  const r1_up = actions.moveBranch(directionUp, dummyTree, activeBranch1);
  const r1_down = actions.moveBranch(directionDown, dummyTree, activeBranch1);

  const r2_left = actions.moveBranch(directionLeft, dummyTree, activeBranch2);
  const r2_right = actions.moveBranch(directionRight, dummyTree, activeBranch2);
  const r2_up = actions.moveBranch(directionUp, dummyTree, activeBranch2);
  const r2_down = actions.moveBranch(directionDown, dummyTree, activeBranch2);

  const r3_left = actions.moveBranch(directionLeft, dummyTree, activeBranch3);
  const r3_right = actions.moveBranch(directionRight, dummyTree, activeBranch3);
  const r3_up = actions.moveBranch(directionUp, dummyTree, activeBranch3);
  const r3_down = actions.moveBranch(directionDown, dummyTree, activeBranch3);

  const r4_left = actions.moveBranch(directionLeft, dummyTree, activeBranch4);
  const r4_right = actions.moveBranch(directionRight, dummyTree, activeBranch4);
  const r4_up = actions.moveBranch(directionUp, dummyTree, activeBranch4);
  const r4_down = actions.moveBranch(directionDown, dummyTree, activeBranch4);


  it('should return action w/ MOVE_BRANCH with new tree(branch moved) or DEFAULT', () => {

    // r1
    expect(r1_left.type).toEqual(DEFAULT);
    expect(r1_right.type).toEqual(DEFAULT);
    expect(r1_up.type).toEqual(DEFAULT);

    expect(r1_down.type).toEqual(MOVE_BRANCH);
    expect(r1_down.value.children[1].tr_id).toBe(activeBranch1);

    // r2
    expect(r2_left.type).toEqual(MOVE_BRANCH);
    expect(r2_left.value.children[2].tr_id).toBe(activeBranch2);

    expect(r2_right.type).toEqual(DEFAULT);

    expect(r2_up.type).toEqual(DEFAULT);

    expect(r2_down.type).toEqual(MOVE_BRANCH);
    expect(r2_down.value.children[1].children[1].tr_id).toBe(activeBranch2);

    // r3
    expect(r3_left.type).toEqual(DEFAULT);

    expect(r3_right.type).toEqual(MOVE_BRANCH);
    expect(r3_right.value.children[2].children[0].tr_id).toBe(activeBranch3);

    expect(r3_up.type).toEqual(MOVE_BRANCH);
    expect(r3_up.value.children[2].tr_id).toBe(activeBranch3);

    expect(r3_down.type).toEqual(DEFAULT);

    // r4
    expect(r4_left.type).toEqual(MOVE_BRANCH);
    expect(r4_left.value.children[4].tr_id).toBe(activeBranch4);

  });

});

describe('treeKeyDown (getPrevBranch, getNextBranch)', () => {
  const dummyTree = {
    tr_id:'tree_root',
    children:constructTree(appDescription_treeArray)
  };

  const activeBranch1 = dummyTree.children[0].tr_id;
  const activeBranch2 = dummyTree.children[1].children[0].tr_id;
  const activeBranch3 = dummyTree.children[3].tr_id;
  const activeBranch4 = dummyTree.children[3].children[0].tr_id;
  const activeBranch5 = dummyTree.children[1].children[dummyTree.children[1].children.length -1].tr_id;

  const obj0 = {
    key:'foo'
  };
  const obj1 = {
    key:'ArrowUp'
  };
  const obj2 = {
    key:'ArrowDown'
  };

  const r0 = actions.treeKeyDown(obj0, dummyTree, activeBranch1);

  const r1_1 = actions.treeKeyDown(obj1, dummyTree, activeBranch1);
  const r1_2 = actions.treeKeyDown(obj1, dummyTree, activeBranch2);
  const r1_3 = actions.treeKeyDown(obj1, dummyTree, activeBranch3);
  const r1_4 = actions.treeKeyDown(obj1, dummyTree, activeBranch4);

  const r2_1 = actions.treeKeyDown(obj2, dummyTree, activeBranch1);
  const r2_2 = actions.treeKeyDown(obj2, dummyTree, activeBranch2);
  const r2_3 = actions.treeKeyDown(obj2, dummyTree, activeBranch3);
  const r2_4 = actions.treeKeyDown(obj2, dummyTree, activeBranch4);
  const r2_5 = actions.treeKeyDown(obj2, dummyTree, activeBranch5);



  it('should return action to manipulate tree, or DEFAULT', () => {

    // r0
    expect(r0.type).toEqual(DEFAULT);

    // r1
    expect(r1_1.type).toEqual(DEFAULT);

    expect(r1_2.type).toEqual(UPDATE_ACTIVETREE);
    expect(r1_2.value.targetID).toBe(dummyTree.children[1].tr_id);

    expect(r1_3.type).toEqual(UPDATE_ACTIVETREE);
    expect(r1_3.value.targetID).toBe(dummyTree.children[2].tr_id);

    expect(r1_4.type).toEqual(UPDATE_ACTIVETREE);
    expect(r1_4.value.targetID).toBe(dummyTree.children[3].tr_id);

    // r2
    expect(r2_1.type).toEqual(UPDATE_ACTIVETREE);
    expect(r2_1.value.targetID).toBe(dummyTree.children[1].tr_id);

    expect(r2_2.type).toEqual(UPDATE_ACTIVETREE);
    expect(r2_2.value.targetID).toBe(dummyTree.children[1].children[1].tr_id);

    expect(r2_3.type).toEqual(UPDATE_ACTIVETREE);
    expect(r2_3.value.targetID).toBe(dummyTree.children[3].children[0].tr_id);

    expect(r2_4.type).toEqual(DEFAULT);

    expect(r2_5.type).toEqual(UPDATE_ACTIVETREE);
    expect(r2_5.value.targetID).toBe(dummyTree.children[2].tr_id);


    // @todo
  });
});

describe('treeKeyDown (openBranch, closeBranch)', () => {

  const dummyTree = {
    tr_id:'tree_root',
    children:constructTree(appDescription_treeArray)
  };


  const activeBranch1 = dummyTree.children[0].tr_id;
  const activeBranch2 = dummyTree.children[1].tr_id;
  const activeBranch3 = dummyTree.children[2].tr_id;
  const activeBranch4 = dummyTree.children[3].tr_id;

  dummyTree.children[1].openState = false;

  const obj3 = {
    key:'ArrowLeft'
  };
  const obj4 = {
    key:'ArrowRight'
  };

  const r3_1 = actions.treeKeyDown(obj3, dummyTree, activeBranch1);
  const r3_2 = actions.treeKeyDown(obj3, dummyTree, activeBranch2);
  const r3_3 = actions.treeKeyDown(obj3, dummyTree, activeBranch3);
  const r3_4 = actions.treeKeyDown(obj3, dummyTree, activeBranch4);

  const r4_1 = actions.treeKeyDown(obj4, dummyTree, activeBranch1);
  const r4_2 = actions.treeKeyDown(obj4, dummyTree, activeBranch2);
  const r4_3 = actions.treeKeyDown(obj4, dummyTree, activeBranch3);
  const r4_4 = actions.treeKeyDown(obj4, dummyTree, activeBranch4);



  it('should return action to manipulate tree, or DEFAULT', () => {
    // r3
    expect(r3_1.type).toEqual(DEFAULT);

    expect(r3_2.type).toEqual(OPEN_BRANCH);
    expect(r3_2.value.targetID).toBe(activeBranch2);

    expect(r3_3.type).toEqual(DEFAULT);
    expect(r3_4.type).toEqual(DEFAULT);

    // r4
    expect(r4_1.type).toEqual(DEFAULT);
    expect(r4_2.type).toEqual(DEFAULT);
    expect(r4_3.type).toEqual(DEFAULT);

    expect(r4_4.type).toEqual(CLOSE_BRANCH);
    expect(r4_4.value.targetID).toBe(activeBranch4);

  });

})
