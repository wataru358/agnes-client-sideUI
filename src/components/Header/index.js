import React from 'react'
import { connect } from 'react-redux'
import styles from './styles.css'

import TreeNav from '../TreeNav'


export const HeaderComponent = (props) => (
  <header className={styles.mainHeader}>
    <div className={styles.headerInfo}>
      {
        props.fileName /*+ ' : ' + props.activeBranch */
      }
    </div>
    <TreeNav />
  </header>
);

const mapStateToProps = (state) => {
  return {
    ...state.fetchFileName,
    ...state.treeState
  }
}

const Header = connect(
  mapStateToProps
)(HeaderComponent)

export default Header
