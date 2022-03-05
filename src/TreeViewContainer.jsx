import { useState } from "react";
import TreeViewItem from "./TreeViewItem";
import { FaPlusSquare } from "react-icons/fa";

const treeViewDataArr = [
  {
    id: 0,
    label: "پروفیل",
    children: [
      {
        id: 1,
        label: "فولادی",
        children: null
      }
    ]
  },
  {
    id: 2,
    label: "میلگرد",
    children: [
      {
        id: 3,
        label: "عاج دار",
        children: [
          {
            id: 4,
            label: "نازک",
            children: [
              {
                id: 6,
                label: "2mil",
                children: null
              },
              {
                id: 7,
                label: "3mil",
                children: null
              }
            ]
          }
        ]
      }
    ]
  }
];

const TreeViewContainer = () => {
  const [treeViewData, setTreeViewData] = useState(treeViewDataArr);

  const handleTreeItemParentSearch = (treeData, id) => {
    const parents = [];
    function findParents(treeData, id) {
      for (const item of treeData) {
        if (item.children) {
          findParents(item.children, id);
          item.children.map((item) => item.id).includes(id) &&
            parents.push(item.id);
          for (const parent of parents) {
            item.children.map((item) => item.id).includes(parent) &&
              parents.push(item.id);
          }
        }
      }
    }
    findParents(treeData, id);
    return parents.reverse();
  };

  const handleClickTreeItem = (treeData, id) => {
    const targetItem = {
      id: null,
      label: null,
      children: null,
      parents: null
    };

    function traverseArr(treeData, id) {
      for (const item of treeData) {
        console.log(item);
        if (item.children && item.id !== id) {
          traverseArr(item.children, id);
        } else {
          const parentIds = handleTreeItemParentSearch(treeViewData, id);
          targetItem.id = item.id;
          targetItem.label = item.label;
          targetItem.children = item.children;
          targetItem.parents = parentIds;
        }
      }
    }

    traverseArr(treeData, id);
    console.log(targetItem);
    return targetItem;
  };

  const handleAddItemToTreeView = (clickedNode) => {
    function traverseArr(treeData, id) {
      for (const item of treeData) {
        if (item.id !== id) {
          if (item.children) {
            traverseArr(item.children, id);
          }
        } else {
          const treeItem = {
            id: Date.now(),
            label: "",
            children: null
          };

          if (item.children) {
            item.children.push(treeItem);
          } else {
            item.children = [treeItem];
          }
        }
      }
      setTreeViewData(treeData);
    }
    const treeViewDataCopy = [...treeViewData];
    traverseArr(treeViewDataCopy, clickedNode);
  };

  const handleDeleteTreeItem = (clickedNode) => {
    function findParentArr(treeData, id, targetObjId) {
      for (const item of treeData) {
        if (item.id !== id && item.children) {
          findParentArr(item.children, id, targetObjId);
        } else if (item.id === id && item.children) {
          item.children = item.children.filter(
            (item) => item.id !== targetObjId
          );
          break;
        }
      }
      setTreeViewData(treeViewDataCopy);
    }

    function traverseArr(treeData, id) {
      for (const item of treeData) {
        if (item.id !== id) {
          if (item.children) traverseArr(item.children, id);
        } else {
          const parents = handleTreeItemParentSearch(treeViewDataCopy, id);
          if (parents.length !== 0) {
            findParentArr(treeViewDataCopy, parents[parents.length - 1], id);
          } else {
            const newArr = treeViewDataCopy.filter((item) => item.id !== id);
            setTreeViewData(newArr);
          }
        }
      }
    }

    const treeViewDataCopy = [...treeViewData];
    traverseArr(treeViewDataCopy, clickedNode);
  };

  const handleChangeTreeItem = (value, id) => {
    function traverseArr(treeData, id) {
      for (const item of treeData) {
        if (item.id !== id) {
          if (item.children) {
            traverseArr(item.children, id);
          }
        } else {
          item.label = value;
          setTreeViewData(treeViewDataCopy);
        }
      }
    }

    const treeViewDataCopy = [...treeViewData];
    traverseArr(treeViewDataCopy, id);
  };

  return (
    <span
      style={{
        display: "flex",
        flexDirection: "column",
        direction: "rtl"
      }}
    >
      <span>
        {treeViewData.map((item) => (
          <TreeViewItem
            key={item.id}
            item={item}
            treeViewData={treeViewData}
            handleChangeTreeItem={handleChangeTreeItem}
            handleDeleteTreeItem={handleDeleteTreeItem}
            handleTreeItemParentSearch={handleTreeItemParentSearch}
            depth={handleTreeItemParentSearch(treeViewData, item.id).length + 1}
            handleAddItemToTreeView={handleAddItemToTreeView}
          />
        ))}
      </span>
    </span>
  );
};

export default TreeViewContainer;
