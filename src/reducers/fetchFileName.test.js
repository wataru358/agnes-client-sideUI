import React from 'react';
import {
  DEFAULT,
  GET_FILENAME
} from '../actions/types';

import fetchFileName from './fetchFileName';

const dummyState = {fileName:'undefined'};


describe('fetchFileName with GET_FILENAME', () => {

  const action = {
    type:GET_FILENAME
  }

  const r1 = fetchFileName(dummyState, action)

  it('should return fake name', () => {

    expect(r1.fileName).toEqual('testname');

  });

});
