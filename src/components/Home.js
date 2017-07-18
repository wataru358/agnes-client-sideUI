import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import TwoPanes from './TwoPanes'

const mapStateToProps = (state) => {
  return state.fetchFileName
}



const HomeLayout = (props) => (
  <div>
    <Header />
    <TwoPanes />

  </div>
)

const Home = connect(
  mapStateToProps
)(HomeLayout)

export default Home;
