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
    createSibling: (e,branchType, tree, activeBranch) => {
        e.stopPropagation();
        dispatch(actions.generateNewBranch(branchType, tree, activeBranch));
        document.getElementById('outlineTree').focus()
    },
    makeNextActive: (e,tree, activeBranch) => {
        e.stopPropagation();
        dispatch(actions.getNextBranch(tree, activeBranch));
        document.getElementById('outlineTree').focus()
    },
    makePrevActive: (e,tree, activeBranch) => {
        e.stopPropagation();
        dispatch(actions.getPrevBranch(tree, activeBranch));
        document.getElementById('outlineTree').focus()
    },
    toggleBranch: (e,tree, activeBranch) => {
        e.stopPropagation();
        //toggleBranchOpenState = (targetID, activeBranch, openState, children)
        var branch = actions.getBranchPath(tree, activeBranch).foundBranch;
        if(branch.children.length) {
          dispatch(actions.toggleBranchOpenState(activeBranch,activeBranch,branch.openState, branch.children));
        }


        document.getElementById('outlineTree').focus()
    },
    removeBranch: (e,tree,textBodies,activeBranch) => {
        e.stopPropagation();

        dispatch(actions.removeBranch(tree, textBodies, activeBranch));
        document.getElementById('outlineTree').focus()
    },
    moveBranch: (e,direction,tree,activeBranch) => {
        e.stopPropagation();

        dispatch(actions.moveBranch(direction, tree, activeBranch));
        document.getElementById('outlineTree').focus()
    },
    toggleSearchBar: (e) => {
      e.stopPropagation();

      dispatch(actions.toggleSearchBar());

    }
  }
}

const TreeNavComponent = (props) => (
  <div className={styles.treeNavOuter}>
    <ul className={styles.treeNavUL}>

      <li className={styles.treeNavLI}>
        <button
          className={styles.treeNavButton}
          onClick={(e) => props.createSibling(e,'prev', props.tree, props.activeBranch)}
          >
          <i className={'fa fa-arrow-up ' + styles.rightSub6}></i>
          <i className={'fa fa-plus ' + styles.leftMain2}></i>
        </button>
      </li>

      <li className={styles.treeNavLI}>
        <button
          className={styles.treeNavButton}
          onClick={(e) => props.createSibling(e,'next', props.tree, props.activeBranch)}
          >
          <i className={'fa fa-arrow-down ' + styles.rightSub}></i>
          <i className={'fa fa-plus ' + styles.leftMain2}></i>
        </button>
      </li>

      <li className={styles.treeNavLI}>
        <button
          className={styles.treeNavButton}
          onClick={(e) => props.createSibling(e,'child', props.tree, props.activeBranch)}
          >
          <i className={'fa fa-arrow-right ' + styles.rightSub3}></i>
          <i className={'fa fa-minus fa-rotate-90 ' + styles.rightSub3b}></i>
          <i className={'fa fa-plus ' + styles.leftMain2}></i>
        </button>
      </li>


      <li className={styles.treeNavLI}>
        <button
          className={styles.treeNavButton}
          onClick={(e) => props.makePrevActive(e, props.tree, props.activeBranch)}
          >

          <i className={'fa fa-caret-up ' + styles.moveUpIcon}></i>
        </button>
      </li>
      <li className={styles.treeNavLI}>
        <button
          className={styles.treeNavButton}
          onClick={(e) => props.makeNextActive(e, props.tree, props.activeBranch)}
          >

          <i className={'fa fa-caret-down ' + styles.moveDownIcon}></i>
        </button>
      </li>
      <li className={styles.treeNavLI}>
        <button
          className={styles.treeNavButton}
          onClick={(e) => props.toggleBranch(e, props.tree, props.activeBranch)}

          >
          <i className={'fa fa-circle' + ' ' + styles.toggleIcon}></i>
          <i className={'fa fa-chevron-right' + ' ' + styles.closeBranchIcon}></i>
          <i className={'fa fa-chevron-down' + ' ' + styles.openBranchIcon}></i>



        </button>
      </li>




      <li className={styles.treeNavLI}>
        <button
          className={styles.treeNavButton}
          onClick={(e) => props.moveBranch(e, 'right', props.tree, props.activeBranch) }
          >
          <i className={'fa fa-file-text-o ' + styles.leftMain}></i>
          <i className={'fa fa-arrow-right ' + styles.rightSub3}></i>
          <i className={'fa fa-minus fa-rotate-90 ' + styles.rightSub3b}></i>
        </button>
      </li>

      <li className={styles.treeNavLI}>
        <button
          className={styles.treeNavButton}
          onClick={(e) => props.moveBranch(e, 'down', props.tree, props.activeBranch) }
          >
          <i className={'fa fa-arrow-down ' + styles.rightSub}></i>
          <i className={'fa fa-file-text-o ' + styles.leftMain}></i>
        </button>
      </li>

      <li className={styles.treeNavLI}>
        <button
          className={styles.treeNavButton}
          onClick={(e) => props.moveBranch(e, 'up', props.tree, props.activeBranch) }
          >
          <i className={'fa fa-arrow-up ' + styles.rightSub6}></i>
          <i className={'fa fa-file-text-o ' + styles.leftMain}></i>
        </button>
      </li>

      <li className={styles.treeNavLI}>
        <button
          className={styles.treeNavButton}
          onClick={(e) => props.moveBranch(e, 'left', props.tree, props.activeBranch) }
          >
          <i className={'fa fa-file-text-o ' + styles.leftMain}></i>
          <i className={'fa fa-arrow-left ' + styles.rightSub4}></i>
          <i className={'fa fa-minus fa-rotate-90 ' + styles.rightSub4b}></i>
        </button>
      </li>

      <li className={styles.treeNavLI}>
        <button
          className={styles.treeNavButton}
          onClick={(e) => props.removeBranch(e,props.tree,props.textBodies,props.activeBranch)}
          >
          <i className={'fa fa-trash' + styles.leftMain}></i>
          <i className={'fa fa-remove ' + styles.rightSub7}></i>
        </button>
      </li>

      <li className={styles.treeNavLI}>
        <button
          className={
            styles.treeNavButton
          }
          data-status={
              props.searchBarDisplayed ? 'active' : ''
          }
          onClick={(e) => props.toggleSearchBar(e)}
          >

          <i className={'fa fa-search'}></i>
        </button>
      </li>
      <li className={styles.treeNavLI}>
        <button
          className={styles.treeNavButton}

          >


          <i className="fa fa-eye" aria-hidden="true"></i>


        </button>
      </li>
    </ul>
    <ul className={styles.treeNavUL + ' ' + styles.right}>
      <li className={styles.treeNavLI}>
        <button
          className={styles.treeNavButton}

          >


          <i className="fa fa-cog" aria-hidden="true"></i>


        </button>
      </li>
    </ul>
  </div>

);


const TreeNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeNavComponent)

export default TreeNav
