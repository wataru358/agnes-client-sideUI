import React from 'react'
import { connect } from 'react-redux'
import styles from './styles.css'
import * as actions from '../../actions'



const mapStateToProps = (state, ownProps) => {
  return state.globalUIState
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFindNextClick:()=>{},
    onFindPrevClick:()=>{},
    onReplaceClick:()=>{},
    onReplaceAllClick:()=>{},
    onSearchInputChange:(e)=>{
      e.preventDefault();
      e.stopPropagation();
      dispatch(actions.updateSearchInput(e));
    },
    onReplaceInputChange:(e)=>{
      e.preventDefault();
      e.stopPropagation();
      dispatch(actions.updateReplaceInput(e));

    },
    onKeyDown: (e, from)=>{
      //console.log(e);
      /*console.log(
        'e.key', e.key
      );*/
      if(e.key === 'Escape') {
        e.preventDefault();
        dispatch(actions.hideSearchBar());
        //do escape here
      } else if(e.key === 'Escape'){
        e.preventDefault();
        //do search or replace here

      }
    }
  }
}

const SearchBarComponent = (props) => {
  // console.log('SearchBarComponent',props.searchBarDisplayed)
  return (
    <div
      className={styles.searchBarOuter}
      style={
        {
          height: props.searchBarDisplayed ? '80px' : '0',
          borderBottom:props.searchBarDisplayed ? '1px' : '0',
        }
      }
      >

      <ul className={styles.searchOptionsUL}>
        <li className={styles.searchOpLI} >
          <button className={styles.searchOpBtn} data-status="active">
            [.*]
          </button>
        </li>
        <li className={styles.searchOpLI} >
          <button className={styles.searchOpBtn}>
            Aa
          </button>
        </li>

      </ul>

      <div className={styles.searchSec}>
        <div className={styles.searchSubSec}>
          <div className={styles.searchInputOuter}>
            <input
              className={styles.searchInput}
              onChange={
                (e) => {props.onSearchInputChange(e)}
              }
              tabIndex="6"
              id="searchInput"
              value={props.searchStatus.searchInput}
              onKeyDown={
                (e) => {props.onKeyDown(e)}
              }
            />
            <span className={styles.searchInputPlaceHolder}>
              {
                props.searchStatus.searchInput.length ? '' : 'Find'
              }
            </span>
            <span className={styles.searchInputStatus}>
              1 of 10
            </span>
          </div>

          <button className={styles.searchBtn}>Find Next</button>
          <button className={styles.searchBtn}>Find Prev</button>
        </div>
        <div className={styles.searchSubSec}>
          <div className={styles.searchInputOuter}>
            <input
              className={styles.searchInput}
              onChange={
                (e)=>{props.onReplaceInputChange(e)}
              }
              tabIndex="7"
              value={props.searchStatus.replaceInput}
              onKeyDown={
                (e) => {props.onKeyDown(e)}
              }
            />
              <span className={styles.searchInputPlaceHolder}>
                {
                  props.searchStatus.replaceInput.length ? '' : 'Replace'
                }

              </span>
          </div>
          <button
            className={styles.searchBtn}
            data-status="disabled"
            >Replace</button>
          <button
            className={styles.searchBtn}
            data-status="disabled"
            >Replace All</button>
        </div>
      </div>



    </div>
  )
}

const SearchBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBarComponent)

export default SearchBar
