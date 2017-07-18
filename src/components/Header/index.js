import React from 'react'
import { connect } from 'react-redux'
import styles from './styles.css'

import TreeNav from '../TreeNav'


const HeaderComponent = (props) => (
  <header className={styles.mainHeader}>
    <TreeNav />
    {
      props.fileName + ' : ' + props.activeBranch
    }
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
