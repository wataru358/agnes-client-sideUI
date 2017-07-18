import {
  INPUT_CHANGE,
  TAB_KEY
} from '../actions/types';

const editorState = (state = {textBody:''}, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        textBody:action.value
      }
    case TAB_KEY:

         // get caret position/selection
        var val = action.target.value,
            start = action.target.selectionStart,
            end = action.target.selectionEnd;

         // set textarea value to: text before caret + tab + text after caret

        var newValue = val.substring(0, start) + '\t' + val.substring(end);

        action.target.selectionStart = action.target.selectionEnd = start + 1;

        return {
            textBody:newValue
        }
    default:
      return state
  }
}

export default editorState
