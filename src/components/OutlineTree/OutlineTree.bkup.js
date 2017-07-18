import React from 'react'
import { connect } from 'react-redux'
import styles from './OutlineTree.css'

const mapStateToProps = (state, ownProps) => {
  return state.treeState
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onBranchClick: (e) => {
      //console.log(e.currentTarget.tagName);
      //console.log(e.target.currentTarget.tagName)
        e.stopPropagation();
        dispatch(updateActiveTree(e))
    },
    onToggleButtonClick:(e)=>{
        e.stopPropagation();
        dispatch(toggleTreeOpen(e))
    }
  }
}
function updateActiveTree(e){
  //console.log(e.target);
  //console.log(e.currentTarget.getAttribute('data-branchid'));
  //console.log(e.currentTarget);

  //value:e.target.getAttribute('data-branchid')
  return {
    type:'UPDATE_ACTIVETREE',
    value:e.currentTarget.getAttribute('id')
  }
}
function toggleTreeOpen(e){
  //console.log(e.target)
  return {
    type:'TOGGLE_OPEN',
    value:e.target.getAttribute('data-forId')
  }
}
const TreeComponent = (tree,depth,activeTree,myKey,props) => (
  return (

      <ul className={styles.treeUL} key={ myKey ? myKey : 'tree_root'} id={ myKey ? 'child_of_' + myKey : 'tree_root'}>
        {tree.map( (branch,index) =>
          <li
            key={branch.tr_id}
            id={branch.tr_id}
            className={styles.treeLI}
            data-active-state={(branch.tr_id == activeTree)? 'yes' : 'no'}
            data-open-state={branch.openState ? 'yes' : 'no' }
            data-has-children={branch.hasChildren ? 'yes' : 'no' }
            data-index={index}
            data-depth={depth}
            tabIndex='1'
            onClick={(e) => props.onBranchClick(e)}
          >
            <div className={styles.treeLItitle} data-branchid={branch.tr_id} data-active={(branch.tr_id == activeTree)? 'yes' : 'no'}>
              <div className={styles.treePaddingBox} style={
                {
                  width:8 + (depth * 18),
                  minWidth:8 + (depth * 18)
                }
              }></div>
              <div className={styles.treeButton}
                data-display={branch.hasChildren ? 'active' : 'inactive'}
                data-open-state={branch.openState ? 'yes' : 'no' }
                data-forId={branch.tr_id}
                onClick={(e) => props.onToggleButtonClick(e)}
              >
                <i className='fa fa-chevron-right'
                  data-display={
                    (branch.hasChildren && !branch.openState) ? 'active' : 'inactive'
                  }
                ></i>
                <i className='fa fa-chevron-down'
                  data-display={
                    (branch.hasChildren && branch.openState) ? 'active' : 'inactive'
                  }
                ></i>
              </div>
              <div className={styles.treeButton2} data-display={!branch.hasChildren ? 'active' : 'inactive'}>
                <i className='fa fa-file-text-o'
                  data-display='active'
                  >
                </i>
              </div>
              {'depth:' + depth + '. id:' +branch.tr_id}

            </div>

            { branch.children ? (growTree(branch.children, (depth+1), activeTree, branch.tr_id, props)) : false }
          </li>
        )}


      </ul>

  )
);
function growTree(tree,depth,activeTree,myKey,props,parentIndex){//make args to object
    //console.log(tree)
    //console.log(tree.map(branch => branch.tr_id));
    return (

        <ul className={styles.treeUL} key={ myKey ? myKey : 'tree_root'} id={ myKey ? 'child_of_' + myKey : 'tree_root'}>
          {tree.map( (branch,index) =>
            <li
              key={branch.tr_id}
              id={branch.tr_id}
              className={styles.treeLI}
              data-active-state={(branch.tr_id == activeTree)? 'yes' : 'no'}

              data-has-children={branch.hasChildren ? 'yes' : 'no' }
              data-index={index}
              data-depth={depth}

              data-open-state={branch.openState ? 'yes' : 'no' }

              tabIndex='1'
              onClick={(e) => props.onBranchClick(e)}
            >
              <div className={styles.treeLItitle} data-branchid={branch.tr_id} data-active={(branch.tr_id == activeTree)? 'yes' : 'no'}>
                <div className={styles.treePaddingBox} style={
                  {
                    width:8 + (depth * 18),
                    minWidth:8 + (depth * 18)
                  }
                }></div>
                <div className={styles.treeButton}
                  data-display={branch.hasChildren ? 'active' : 'inactive'}
                  data-open-state={branch.openState ? 'yes' : 'no' }
                  data-forId={branch.tr_id}
                  onClick={(e) => props.onToggleButtonClick(e)}
                >
                  <i className='fa fa-chevron-right'
                    data-display={
                      (branch.hasChildren && !branch.openState) ? 'active' : 'inactive'
                    }
                  ></i>
                  <i className='fa fa-chevron-down'
                    data-display={
                      (branch.hasChildren && branch.openState) ? 'active' : 'inactive'
                    }
                  ></i>
                </div>
                <div className={styles.treeButton2} data-display={!branch.hasChildren ? 'active' : 'inactive'}>
                  <i className='fa fa-file-text-o'
                    data-display='active'
                    >
                  </i>
                </div>
                {'open: ' +'. depth:' + depth + '. id:' +branch.tr_id}

              </div>

              { branch.children ? (growTree(branch.children, (depth+1), activeTree, branch.tr_id, props)) : false }
            </li>
          )}


        </ul>

    )

}
const OutlineTreeComponent = (props) => (
  <div className={styles.treeHolder}>
    {growTree(props.tree,0,props.activeTree,false,props)}
  </div>
);

/*
<TreeComponent
  tree={props.tree}
  depth={0}
  activeTree={props.activeTree}
  myKey={false}
  props={props}
  />
*/
const OutlineTree = connect(
  mapStateToProps,
  mapDispatchToProps
)(OutlineTreeComponent)

export default OutlineTree
