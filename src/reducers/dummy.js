// dummy json
export const appDescription_treeArray = [
  {
    id:'tr_0',
    text:'About Agnes Outline Processor\nThis is a repo for UI development phase of an outline processor, named Agnes.\nYou can edit right here.',
    children:[]
  },
  {
    id:'tr_1',
    text:'How to\nThe interface is pretty intuitive.\nPlease play with the header menu. When focusing (clicking) on left "tree", try using arrow keys to navigate, open and close items.',
    children:[
      {
        id:'tr_1_0',
        text:'Edit text\nyou can edit text right here!\nRemember, the first line of the text will always become the "title" of the item on the left tree.',
        children:[]
      },
      {
        id:'tr_1_1',
        text:'Add item\nYou can use "plus & allow" icons to add items, as younger or older siblings, or as a child.',
        children:[]
      },
      {
        id:'tr_1_2',
        text:'Remove item\nYou can use "document & X" icon to remove item.',
        children:[]
      },
      {
        id:'tr_1_3',
        text:'Move item\nYou can use "document & arrow" icons to move items up, down, as well as left and right.',
        children:[]
      },
      {
        id:'tr_1_4',
        text:'Collapse and Open item with child(ren)\nYou can use "circle & chevron right & down" icon to toggle open / close (collapse) status of the item with children.',
        children:[]
      },
      {
        id:'tr_1_5',
        text:'Move highlight on the left tree\nYou can use "caret up" and "caret down" icon.',
        children:[]
      }
    ]
  },
  {
    id:'tr_2',
    text:'Motivation\n\nWhen I was looking for an outline editor on Mac, there was none that satisfy my needs.\n\nThey were all great, but either they have too many features or lack specific features I wanted.\n\nBasically I wanted those three things.\n\nA. No distinction with title and content\n    B. Easy two pane layout\nC. Nothing more\n\n(on the UI at first glance. More features should be hidden so that they won\'t distract users)\n\nThese are the same features I got from Nami2000, a legendary outline editor for Windows 98.\nI just wanted it on Mac. :)\n',
    children:[]
  },
  {
    id:'tr_3',
    text:'Special Thanks\n\nhttp://www.geocities.jp/my_ultraseven/mozart/_start.htm',
    children:[
      {
        id:'tr_3_0',
        text:'This is test text',
        children:[]
      }
    ]
  },
  {
    id:'tr_4',
    text:'Sample Usage ',
    children:[
    ]
  },
  {
    id:'tr_5',
    text:'Planning A Movie Plot',
    children:[
      {
        id:'tr_5_0',
        text:'Opening - Space Ship',
        children:[
          {
            id:'tr_5_0_0',
            text:'Shooting inside the Space Ship',
            children:[

            ]
          },
          {
            id:'tr_5_0_1',
            text:'R2D2 and 3PO are being given the instructions by Princess Leia',
            children:[

            ]
          },
          {
            id:'tr_5_0_2',
            text:'Robots are able to escape the ship using the evacuation pod',
            children:[

            ]
          },
          {
            id:'tr_5_0_3',
            text:'Darth Vader overpowers rebels, captures the Princess',
            children:[

            ]
          }
        ]
      },
      {
        id:'tr_5_1',
        text:'Planet Tatooine',
        children:[
          {
            id:'tr_5_1_0',
            text:'Luke Skywaker appears; has arguments with his Uncle',
            children:[

            ]
          },
          {
            id:'tr_5_1_1',
            text:'Luke Skywaker and the Uncle are going to...',
            children:[

            ]
          }
        ]
      },
    ]
  }

]


export const constructTextBodies = (treeArray) => {
  let r = {};
  for(let i = 0; i < treeArray.length; i++) {
    r[treeArray[i].id] = treeArray[i].text;
    if (treeArray[i].children.length > 0) {
      r = {...r, ...constructTextBodies(treeArray[i].children)}
    }
  }
  return r;
}

export const constructTree = (treeArray) => {
  let r = [];

  for(let i = 0; i < treeArray.length; i++) {
    r[i] = createOneBranch(treeArray[i].id, treeArray[i].children);
  }

  return r;
}
const createOneBranch = (tr_id, children) => {
  let branch = {
    tr_id,
    openState:true
  }
  if(children.length == 0) {
    branch.children = children
  } else if(children.length > 0) {
    branch.children = constructTree(children)
  }
  return branch
}


// getNewBranch here is just to
// inject temp initial state.
const getNewBranch = (tr_id,children) => {
  var newBranch = {
    tr_id
  }
  if(Array.isArray(children)){
    newBranch.children = children;
  } else if(typeof children !== 'undefined') {//means children is "a child"
    newBranch.children = [children];
  } else {
    newBranch.children = [];
  }

  newBranch.openState = true;

  return newBranch
}

var dummyNode1_3_1 = getNewBranch('tr_6666666666666666');

var dummyNode1_1 = getNewBranch('tr_88888');
var dummyNode1_2 = getNewBranch('tr_88889');
var dummyNode1_3 = getNewBranch('tr_88855',dummyNode1_3_1);
var dummyNode1_4 = getNewBranch('tr_88858');

var dummyRoot1 = getNewBranch('tr_99999');
var dummyRoot2 = getNewBranch('tr_99997',[dummyNode1_1,dummyNode1_2,dummyNode1_3,dummyNode1_4]);
var dummyRoot3 = getNewBranch('tr_99996');
var dummyRoot4 = getNewBranch('tr_99995');

const textBodiesDummie = {
  tr_6666666666666666:'this is tr_6666666666666666',
  tr_88888:'what I researched \n a lot of ideas \n sample',
  tr_88889:'my great ideas',
  tr_88855:'You can toggle me, open and close',
  tr_88858:'rolf rolf',
  tr_99999:'chapter 1. \n dblfdlkaklfdakljfda',
  tr_99997:'I have child text. you can toggle',
  tr_99996:'you can edit',
  tr_99995:'edit text right side'
}

export const treeStateDummy = {
  activeBranch:'tr_99996',
  tree:getNewBranch('tree_root', [
    dummyRoot1,
    dummyRoot2,
    dummyRoot3,
    dummyRoot4
  ]),
  textBodies:textBodiesDummie
}
