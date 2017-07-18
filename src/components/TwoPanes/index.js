import React, { PropTypes } from 'react'
import styles from './styles.css'

//import TextEditor from './TextEditor'
import TextEditor from '../TextEditorDraft'
import OutlineTree from '../OutlineTree'

class TwoPanes extends React.Component {
  constructor(props) {
     super(props);

     this.state = {
       dragFlag:false,
       divideLineX:300
     }

  }
  conponentDidMount() {
    console.log('TwoPanels did mount');
  }
  dragStart(e){
    if(e.buttons = 1) {
      this.setState({
        dragFlag:true
      });
    } else {
      this.setState({
        dragFlag:false
      });
    }
  }
  dragEnd(){
    this.setState({
      dragFlag:false
    });
  }

  doDrag(e){
    if(this.state.dragFlag && 99 < e.pageX && e.pageX < (window.innerWidth - 99) ){

      this.setState({divideLineX:e.pageX});

    }
  }
  render(){
    return (
      <div className={styles.panelContainer}>
        <div className={styles.panelLeft} style={{width:this.state.divideLineX}}>

          <OutlineTree />

        </div>
        <div className={styles.panelRight} style={{width:'calc(100vw - '+this.state.divideLineX+'px)'}}>
          <TextEditor />
        </div>
        <div
          className={styles.panelResizeHandle}

          style={
            {
              left:this.state.divideLineX - 3
            }
          }

          onMouseDown={this.dragStart.bind(this)}
          onMouseUp={this.dragEnd.bind(this)}

          ></div>
        <div
          className={styles.panelCover}

          style={
            {
              display:this.state.dragFlag ? 'block' : 'none'
            }
          }
          onMouseUp={this.dragEnd.bind(this)}
          onMouseMove={this.doDrag.bind(this)}
        ></div>
      </div>
    )
  }
}

export default TwoPanes
