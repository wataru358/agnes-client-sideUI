import React from 'react'
import { connect } from 'react-redux'
import styles from './styles.css'
import * as actions from '../../actions'

import Overlay from '../Overlay'
import capture01 from '../../../assets/img/capture1.gif'

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.globalUIState
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCloseBtnClick:(e)=>{
      e.preventDefault();
      dispatch(actions.closeAboutOverlay())
    }
  }
}

const AboutComponent = (props) => {
  return (
    <div className={styles.about}>
      <Overlay
        onClick={(e) => props.onCloseBtnClick(e)}
        />
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <button
            className={styles.closeButton}
            onClick={(e) => props.onCloseBtnClick(e)}
            >
            <i className={'fa fa-remove '}></i>
          </button>
          <h1 className={styles.title}>Agnes Outline Processor</h1>
          <span className={styles.smallNote}>(in Development)</span>
          <div className={styles.imgHolder}>
            <img src={capture01} width="800" height="360"/>
          </div>
          <div className={styles.lower}>
            <p className={styles.description}>
              Agnes Outline Processor is a simple yet useful outline processor powered by React / Redux framework.
              It is yet actively being developed for beta test version, and not fully functioning. Yet you can play with Agnes creating a nested note or outline, to feel how it works.
              The goal of the project is to ship the powerful "desktop" outline processor for Mac and Windows alike,
              borrowing the power of <a href="https://electron.atom.io/" target="_blank">Electron.</a><br />
            If you're not familia with the concept you can look into it <a href="https://en.wikipedia.org/wiki/Outliner" target="_blank">here.</a> 
            </p>
            <ul className={styles.ul}>
              <li className={styles.liTitle}> More features to come:</li>
              <li>[ ] Search</li>
              <li>[ ] Replace</li>
              <li>[ ] Markdown Rendering</li>
              <li>[ ] Electron-ification</li>
              <li>[ ] Save and Open from file</li>
              <li>[ ] Export to several formats. (word, html, md) </li>
              <li className={styles.liNote}>You can check the pre-Electron ver. for public review <a href="https://github.com/wataru358/agnes-client-sideUI" target="_blank">here.</a> </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}

const About = connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutComponent)

export default About
