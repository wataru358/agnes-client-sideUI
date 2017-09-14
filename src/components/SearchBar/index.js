import React from 'react'
import { connect } from 'react-redux'
import styles from './styles.css'
import * as actions from '../../actions'


const mapStateToProps = (state, ownProps) => {
  return {
    ...state.treeState,
    ...state.globalUIState
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFindNextClick:(e,props)=>{
      //console.log('onFindNextClick: ', props);
      dispatch(actions.doSearch('next', props.searchStatus.searchInput, props.searchBuffer, props.searchBufferIndex, props.searchMode, props.tree, props.activeBranch, props.textBodies))
    },
    onFindPrevClick:(e,props)=>{
      dispatch(actions.doSearch('prev', props.searchStatus.searchInput, props.searchBuffer, props.searchBufferIndex, props.searchMode, props.tree, props.activeBranch, props.textBodies ))
    },
    onReplaceClick:(e)=>{},
    onReplaceAllClick:(e)=>{},
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
    onKeyDown: (e, from, props)=>{
      //console.log(e);
      /*console.log(
        'e.key', e.key
      );*/
      if(e.key === 'Escape') {
        e.preventDefault();
        dispatch(actions.hideSearchBar());
        //do escape here
      } else if(e.key === 'Enter' && from === 'search' && props.searchStatus.searchInput.length){
        e.preventDefault();
        //do search or replace here
        dispatch(actions.doSearch('next', props.searchStatus.searchInput, props.searchBuffer, props.searchBufferIndex, props.searchMode, props.tree, props.activeBranch, props.textBodies))
      }
    },
    onInputBlur: ()=>{
      dispatch(actions.clearSearchBuffer());
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
                (e) => {props.onKeyDown(e, 'search', props)}
              }
              onBlur={
                () => { props.onInputBlur() }
              }
            />
            <span className={styles.searchInputPlaceHolder}>
              {
                props.searchStatus.searchInput.length ? '' : 'Find'
              }
            </span>
            <span className={styles.searchInputStatus}>
              {
                props.searchGotNoMatch ? 'no match' : '1 of 10'
                }
            </span>
          </div>

          <button
            className={styles.searchBtn}
            data-status={
              props.searchStatus.searchInput.length ? '' : 'disabled'
            }
            onClick={(e)=>{props.onFindNextClick(e,props)}}


          >
            Find Next
          </button>

          <button
            className={styles.searchBtn}
            data-status={
              props.searchStatus.searchInput.length ? '' : 'disabled'
            }
            onClick={(e)=>{props.onFindPrevClick(e,props)}}
          >
            Find Prev
          </button>

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
                (e) => {props.onKeyDown(e, 'replace', props)}
              }
              onBlur={
                () => { props.onInputBlur() }
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
