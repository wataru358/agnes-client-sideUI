import {
  constructTextBodies,
  constructTree,
  appDescription_treeArray
} from './dummy';


describe('constructTextBodies should construct textBodies object', () => {
  const r = constructTextBodies(appDescription_treeArray);

  // for "visual" inspection of the object
  // console.log(r);

  it('it should be an object', () => {
    expect(typeof r).toBe('object');
  });

  it('the object\'s keys should include "tr_0","tr_1",etc', () => {
    expect(r).toEqual(expect.objectContaining({
      tr_0: expect.any(String),
      tr_1: expect.any(String),
    }));
  });
});
describe('constructRootTree should construct tree root array', () => {
  const r = constructTree(appDescription_treeArray);

  // for "visual" inspection of the object
  // console.log(r);

  it('it should be an array', () => {
    expect(Array.isArray(r)).toBe(true);
  });

  it('the object should have tr_ids like "tr_0","tr_1",etc', () => {
    expect(r[0]).toEqual(expect.objectContaining({
      tr_id:'tr_0',
    }));
  });
});
