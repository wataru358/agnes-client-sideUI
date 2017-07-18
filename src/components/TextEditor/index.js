import React from 'react'
import { connect } from 'react-redux'
import styles from './styles.css'
import * as actions from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return state.treeState
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onTextAreaInputChange: (e) => {
      dispatch(actions.textAreaUpdate(e))
    },
    onTextAreaTabKey: (e) => {
      dispatch(actions.textAreaTab(e))
    }
  }
}
const TextEditorComponent = (props) => (
  <textarea
    className={styles.plainTexteditor}
    onChange={(e) => props.onTextAreaInputChange(e)}
    onKeyDown={(e) => {
          if(  e.key === 'Tab'){
            //console.log(e.key);
            //console.log('e.keyCode === 9');
            e.preventDefault();
            props.onTextAreaTabKey(e)
          }
          return false
      }
    }
    value={props.textBodies[props.activeBranch]}
    tabIndex='2'
  ></textarea>
);


const TextEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(TextEditorComponent)

export default TextEditor
