import {
  GET_FILENAME
 } from '../actions/types';

const fetchFileName = (state = {fileName:'undefined'}, action) => {
  switch (action.type) {
    case GET_FILENAME:
      return {
        ...state,
        fileName:'testname'
      }
    default:
      return state
  }
}
export default fetchFileName
