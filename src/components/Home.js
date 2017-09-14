import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import TwoPanes from './TwoPanes'
import About from './About'
import * as actions from '../actions'

const mapStateToProps = (state) => {
  return {
    ...state.fetchFileName,
    ...state.globalUIState
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onGeneralKeyDown:(e)=>{
      if (e.key === 'f' && e.metaKey ||
          e.key === 'f' && e.ctrlKey) {
          e.preventDefault();
          document.getElementById('searchInput').focus();
          dispatch(actions.showSearchBar());

      }

    }
  }
}


const HomeLayout = (props) => (
  <div
    onKeyDown={
      (e) => { props.onGeneralKeyDown(e) }
    }
  >
    <Header />
    <TwoPanes />
    {
      props.aboutDisplayed ? <About /> : null
    }

  </div>
)

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeLayout)

export default Home;
