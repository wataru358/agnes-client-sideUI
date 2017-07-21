import React from 'react'
import { connect } from 'react-redux'
import {Editor, EditorState, ContentState, Modifier} from 'draft-js';
import styles from './styles.css'
import * as actions from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return state.treeState
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onTextAreaInputChange: (e) => {
      //dispatch(actions.textAreaUpdate(e))
    },
    onTextAreaTabKey: (e) => {
      //dispatch(actions.textAreaTab(e))
    },
    onTextUpdate: (text) => {
      //console.log('onTextUpdate:');
      //console.log(text);
      dispatch(actions.textBodyUpdate(text))
    }
  }
}

class TextEditorDraftComponent extends React.Component {
  constructor(props) {

    super(props);
    //console.log('constructor:')
    this.state = {
      editorState: EditorState.createWithContent(ContentState.createFromText(props.textBodies[props.activeBranch]))
    }
    this._activeBranch = props.activeBranch;
    //this.activeBranch =
    //this.state = {editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => {

      this.setState({editorState});

      props.onTextUpdate(editorState.getCurrentContent().getPlainText());

    }
    this.focus = () => this.refs.editor.focus();
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onTab = (e) => this._onTab(e);
    this.onKeyUp = (e) => this._onKeyUp(e);
  }
  shouldComponentUpdate(nextProps, nextState) {
    //console.log('shouldComponentUpdate:', nextProps, nextState);
    return true
  }
  componentWillReceiveProps(nextProps, nextState) {
    //console.log('componentWillReceiveProps:');
    //console.log(nextProps.activeBranch, this._activeBranch);
    //console.log(nextProps.textBodies[nextProps.activeBranch]);
    //this.props.onTextUpdate(this.state.editorState.getCurrentContent().getPlainText());

    if(nextProps.activeBranch!==this._activeBranch){
      this._activeBranch = nextProps.activeBranch;
      this.state = {editorState: EditorState.createWithContent(ContentState.createFromText(nextProps.textBodies[nextProps.activeBranch]))}
    } /*else {
      console.log('blur focus')
      this.refs.editor.blur()
      this.refs.editor.focus()
    }*/

  }
  _onKeyUp(e) {
    //console.log('_onKeyUp');
    //props.onTextUpdate(this.state.editorState.getCurrentContent().getPlainText())
  }
  _onTab(e) {
    //console.log('_onTab:');
    e.preventDefault();
    //const maxDepth = 4;
    //console.log(e.key);
    //console.log(RichUtils.onTab(e, this.state.editorState, maxDepth))
    //this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    const tabCharacter = "  ";
    let currentState = this.state.editorState;
    let newContentState = Modifier.replaceText(
       currentState.getCurrentContent(),
       currentState.getSelection(),
       tabCharacter
     );
     //console.log(newContentState.getPlainText());
     this.props.onTextUpdate(newContentState.getPlainText());
     this.setState({
       editorState: EditorState.push(currentState, newContentState, 'insert-characters')
     });

  }
  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  render(){
    return (
      <div className={styles.editorOuter}>
        <div className={styles.editorHolder} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            onPaste={this.onPaste}
            onKeyup={this.onKeyUp}
            stripPastedStyles={true}
            tabIndex="2"
            onTab={this.onTab}
            ref="editor"
          />
        </div>
        <div className={styles.editorBtm}>{'['+this.props.textBodies[this.props.activeBranch].length.toString()+']'}</div>

      </div>
    )
  }
}

/**
 * Handle pressing tab in the editor
 *
 * @param {SyntheticKeyboardEvent} event
 * @param {Draft.EditorState} editorState
 * @return {Draft.EditorState}
 */
function handleTab(e, editorState) {
    e.preventDefault();

    var contentState = editorState.getCurrentContent();
    var selection    = editorState.getSelection();
    var startKey     = selection.getStartKey();
    var currentBlock = contentState.getBlockForKey(startKey);

    var indentation = getIndentation(currentBlock.getText());
    var newContentState;

    if (selection.isCollapsed()) {
        newContentState = Draft.Modifier.insertText(
            contentState,
            selection,
            indentation
        );
    } else {
        newContentState = Draft.Modifier.replaceText(
            contentState,
            selection,
            indentation
        );
    }

    return Draft.EditorState.push(editorState, newContentState, 'insert-characters');
}

/*handleKeyCommand={this.handleKeyCommand}*/
const TextEditorDraft = connect(
  mapStateToProps,
  mapDispatchToProps
)(TextEditorDraftComponent)

export default TextEditorDraft
