import React from 'react'
import { connect } from 'react-redux'
import styles from './styles.css'
import * as actions from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return state.treeState
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onBranchClick: (e, activeBranch) => {
        e.stopPropagation();
        if(e.currentTarget.id !== activeBranch){
          dispatch(actions.updateActiveTree(e.currentTarget.id))
        }
    },
    onToggleButtonClick:(e,activeBranch,openState,children)=>{
        e.stopPropagation();
        //console.log();
        dispatch(actions.toggleBranchOpenState(e.currentTarget.dataset.forid, activeBranch, openState, children))
    },
    onTreeKeyDown:(e,tree,activeBranch)=>{
      //console.log('onBranchKeyDown:', activeBranch);
      e.stopPropagation();
      if(e.key === 'ArrowUp' ||e.key ===  'ArrowDown' ||e.key ===  'ArrowLeft' ||e.key ===  'ArrowRight') {
        //console.log('prevent')
        e.preventDefault();
      }


      dispatch(actions.treeKeyDown({
        key:e.key,
        altKey:e.altKey,
        ctrlKey:e.ctrlKey,
        shiftKey:e.shiftKey,
        metaKey:e.metaKey
      },tree,activeBranch));
    }
  }
}
/* onKeyDown={(e) => props.onBranchKeyDown(e,tree,activeBranch)} */
/* tabIndex='1' */
/* get rid of not-needed args, props */
function growTree(tree,depth,activeBranch,myKey,props,treeIndex){//make args to object
    return (

        <ul className={styles.treeUL} key={ myKey ? myKey : 'tree_root'} id={ myKey ? 'child_of_' + myKey : 'tree_root'}>
          {tree.map( (branch,index) =>
            <li
              key={branch.tr_id}
              id={branch.tr_id}
              className={styles.treeLI}
              data-active-state={(branch.tr_id == activeBranch)? 'yes' : 'no'}
              data-open-state={branch.openState ? 'yes' : 'no' }
              data-has-children={branch.children.length ? 'yes' : 'no' }
              data-children-length={branch.children.length}
              data-index={index}
              data-depth={depth}
              data-tree-index={
                treeIndex ? treeIndex + '-' + index : index
              }

              onClick={(e) => props.onBranchClick(e, activeBranch)}

              data-has-active-decendant={
                !branch.openState ? 'yes' : 'no'
              }
            >
              <div className={styles.treeLItitle} data-branchid={branch.tr_id} data-active={(branch.tr_id == activeBranch)? 'yes' : 'no'}>
                <div className={styles.treePaddingBox} style={
                  {
                    width:8 + (depth * 18),
                    minWidth:8 + (depth * 18)
                  }
                }></div>
                <div className={styles.treeButton}
                  data-display={branch.children.length ? 'active' : 'inactive'}
                  data-open-state={branch.openState ? 'yes' : 'no' }
                  data-forId={branch.tr_id}
                  onClick={(e) => props.onToggleButtonClick(e,activeBranch,branch.openState,branch.children)}
                >
                  <i className='fa fa-chevron-right'
                    data-display={
                      (branch.children.length && !branch.openState) ? 'active' : 'inactive'
                    }
                  ></i>
                  <i className='fa fa-chevron-down'
                    data-display={
                      (branch.children.length && branch.openState) ? 'active' : 'inactive'
                    }
                  ></i>
                </div>
                <div className={styles.treeButton2} data-display={!branch.children.length ? 'active' : 'inactive'}>
                  <i className='fa fa-file-text-o'
                    data-display='active'
                    >
                  </i>
                </div>
                {
                  //branch.tr_id + ': '
                }
                <span className={styles.titlehere}>{//contents here, first line in textBody
                  props.textBodies[branch.tr_id].split('\n')[0].length ? props.textBodies[branch.tr_id].split('\n')[0].replace(/\s/g,' ') : 'untitled'
                }</span>

              </div>

              { branch.children.length ? (growTree(branch.children, (depth+1), activeBranch, branch.tr_id, props, (treeIndex ? treeIndex + '-' + index : index)  )) : false }
            </li>
          )}


        </ul>

    )

}
/*function getLongestTitle(textBodies, tree) {

  var longestEntry =  Object.keys(textBodies).reduce(function(a, b){ return textBodies[a].split('\n')[0].length > textBodies[b].split('\n')[0].length ? a : b });
  console.log(longestEntry);

  return (
    <span>{textBodies[longestEntry]}</span>
  );
  //http://stackoverflow.com/questions/16075664/how-to-get-the-total-depth-of-an-unknown-json-hierarchy

  function getDepth(tree, targetID) {
    var tempDepth = 0;

    return tempDepth;
  }

}*/
const OutlineTreeComponent = (props) => (
  <div
    className={styles.treeHolder}
    onKeyDown={(e) => props.onTreeKeyDown(e, props.tree,props.activeBranch)}
    tabIndex='1'
    id="outlineTree"
    >


    {growTree(props.tree.children,0,props.activeBranch,false,props)}
  </div>
);


const OutlineTree = connect(
  mapStateToProps,
  mapDispatchToProps
)(OutlineTreeComponent)

export default OutlineTree


/*
function updateActiveTree(e){
  //console.log(e.target);
  //console.log(e.currentTarget.getAttribute('data-branchid'));
  //console.log(e.currentTarget);

  //value:e.target.getAttribute('data-branchid')
  return {
    type:'UPDATE_ACTIVETREE',
    value:
    {
      targetID:e.currentTarget.getAttribute('id')
    }
  }
}
function toggleTreeOpen(e){
  //console.log(e.target)
  return {
    type:'TOGGLE_BRANCH',
    value:e.target.getAttribute('data-forId')
  }
}
*/
