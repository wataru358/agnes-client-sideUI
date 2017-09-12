import React from 'react'
import { connect } from 'react-redux'
import {Editor, EditorState, ContentState, Modifier, CompositeDecorator} from 'draft-js';
import styles from './styles.css'
import * as actions from '../../actions'
import deepEqual from 'deep-equal'

/*
 * start: highlight for searched term
 */

const SearchHighlight = (props, searchBuffer, searchBufferIndex, localIndexCount) => {
  return (
    <span
      className={styles.searchHighlight}
      data-local-index={localIndexCount}>
      {props.children}
    </span>
  );
};

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
/*
 * end: highlight for searched term
 */

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.treeState,
    ...state.globalUIState
  }
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
      editorState: EditorState.createWithContent(ContentState.createFromText(props.textBodies[props.activeBranch])),
      lineCount:props.textBodies[props.activeBranch].split(/\r\n|\r|\n/).length,
      lineHeightArray:[]
    }

    this._activeBranch = props.activeBranch;
    //this.activeBranch =
    //this.state = {editorState: EditorState.createEmpty() };

    this.onChange = (editorState) => {
      console.log('onChange');
      const textValue = editorState.getCurrentContent().getPlainText();
      this.setState({
        editorState,
        lineCount:textValue.split(/\r\n|\r|\n/).length
      });

      props.onTextUpdate(textValue);

    }
    this.focus = () => this.refs.editor.focus();
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onTab = (e) => this._onTab(e);

    this.watchGutterHeight = this._watchGutterHeight.bind(this);

  }

  componentDidMount(){
    //this.watchGutterHeight();
    let dataBlockDoms = document.querySelectorAll('div[data-block="true"]')
    //console.log(dataBlockDoms);
    let lineHeightArray = [];

    for(let i = 0; dataBlockDoms.length > i; i++){
      lineHeightArray[i] = dataBlockDoms[i].clientHeight / 30;
    }
    this.setState({
      lineHeightArray:lineHeightArray
    });

    // start watch process
    optimizedResize.add(this.watchGutterHeight);

    //focus
    this.refs.editor.focus();
    return true
  }
  /*shouldComponentUpdate(nextProps, nextState) {

    return true
  }*/
  componentDidUpdate(prevProps, prevState) {
    this.watchGutterHeight();
    // console.log(this.props.branchClickCount, nextProps.branchClickCount)
    /*if(this.props.branchClickCount > prevProps.branchClickCount) {
      //console.log('this.props.branchClickCount > prevProps.branchClickCount');
      //this.refs.editor.focus();
    }*/

  }
  componentWillReceiveProps(nextProps, nextState) {

    if(nextProps.searchBuffer.length) {
      let localIndexCount = 0;
      const compositeDecorator = new CompositeDecorator([
        {
          // strategy: handleStrategy,
          strategy:(contentBlock, callback, contentState) => {
            let myRegExp = new RegExp(escapeRegExp(nextProps.searchStatus.searchInput), 'gi');

            {
              const text = contentBlock.getText();
              let matchArr, start;
              while ((matchArr = myRegExp.exec(text)) !== null) {
                start = matchArr.index;
                callback(start, start + matchArr[0].length);
                localIndexCount++;
              }
            }
          },// this component is to hand SearchHighlight info to focus onto
          component:(props) => { return SearchHighlight(props, nextProps.searchBuffer, nextProps.searchBufferIndex, localIndexCount) },
        }
      ]);
      if(nextProps.activeBranch !== this._activeBranch) {
        this._activeBranch = nextProps.activeBranch;
        this.setState({
          editorState: EditorState.set(
            EditorState.createWithContent(
              ContentState.createFromText(nextProps.textBodies[nextProps.activeBranch])
            ),
            {decorator: compositeDecorator}
          )
        });
      } else {
        /*const selectionState = this.state.editorState.getSelection();
        const currentFocusKey = selectionState.getFocusKey();
        const currentAnchorKey = selectionState.getAnchorKey();*/

        this.setState({
          editorState:EditorState.set(
            this.state.editorState,
            {decorator:compositeDecorator}
          )
        });



      }


    } else {

      if(nextProps.activeBranch !== this._activeBranch) {

        this._activeBranch = nextProps.activeBranch;
        this.setState({
          editorState: EditorState.createWithContent(
            ContentState.createFromText(nextProps.textBodies[nextProps.activeBranch])
          )
        });

      }

    }






      /**/



    /*if(nextProps.searchBuffer.length) {
      this.setState({
        editorState: EditorState.createWithContent(
          ContentState.createFromText(nextProps.textBodies[nextProps.activeBranch])
        )
      });
    } else {
      this.setState({
        editorState: EditorState.createWithContent(
          ContentState.createFromText(nextProps.textBodies[nextProps.activeBranch])
        )
      });
    }*/

    if(this.props.searchBarDisplayed === true && nextProps.searchBarDisplayed === false) {
       console.log('searchBar Closed')
      this.refs.editor.focus();
    }



  }
  // @todo:
  // this is anti pattern.
  // should not rely on dom state...
  // but right now, no way arround.
  _watchGutterHeight(){
    let dataBlockDoms = document.querySelectorAll('div[data-block="true"]')
    // console.log(dataBlockDoms);
    let lineHeightArray = [];

    for(let i = 0; dataBlockDoms.length > i; i++){
      lineHeightArray[i] = dataBlockDoms[i].clientHeight / 30;
    }
    // console.log('_watchGutterHeight: ',lineHeightArray);
    // console.log(lineHeightArray);
    // console.log(this.state.lineHeightArray);

    let test = deepEqual(lineHeightArray, this.state.lineHeightArray)
    //console.log(test);
    if(!test) {
      this.setState({
        lineHeightArray:lineHeightArray
      });
    }

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
      <div
        className={styles.editorOuter}
        style={
          {
            height: this.props.searchBarDisplayed ? 'calc(100% - 80px)' : '100%'
          }
        }
        >
        <div className={styles.editorHolder} ref="editorHolder" onClick={this.focus}>
          <div
            className={styles.editorGutter}
            ref="gutter"

          >
          {
              writeLineCount(this.state.lineHeightArray)
          }

          </div>
          <div className={styles.editorWrapper}>
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              onPaste={this.onPaste}
              stripPastedStyles={true}
              tabIndex="2"
              onTab={this.onTab}
              ref="editor"
            />
          </div>

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

function writeLineCount(lineHeightArray) {
  //console.log('gutterHeight:', gutterHeight);
  //let count = Math.floor(gutterHeight / 30);
  //console.log(count);
  let lines = [];
  for (let i = 0; i < lineHeightArray.length; i++) {
    lines.push(
      <div
        className={styles.editorGutterOneLine}
        key={"line_"+i}
        style={
          {
            height:(lineHeightArray[i] * 30) + "px"
          }
        }
      >
          <span className={styles.editorGutterSpan} key={"line_span_"+i}>
            {i+1}
          </span>
      </div>
    );
  }
  //console.log(lines);
  return (
    <div>{lines}</div>
  )
}

var optimizedResize = (function() {

    var callbacks = [],
        running = false;

    // fired on resize event
    function resize() {

        if (!running) {
            running = true;

            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(runCallbacks);
            } else {
                setTimeout(runCallbacks, 66);
            }
        }

    }

    // run the actual callbacks
    function runCallbacks() {

        callbacks.forEach(function(callback) {
            callback();
        });

        running = false;
    }

    // adds callback to loop
    function addCallback(callback) {

        if (callback) {
            callbacks.push(callback);
        }

    }

    return {
        // public method to add additional callback
        add: function(callback) {
            if (!callbacks.length) {
                window.addEventListener('resize', resize);
            }
            addCallback(callback);
        }
    }
}());



/*handleKeyCommand={this.handleKeyCommand}*/
const TextEditorDraft = connect(
  mapStateToProps,
  mapDispatchToProps
)(TextEditorDraftComponent)

export default TextEditorDraft
