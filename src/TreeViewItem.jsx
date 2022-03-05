import { useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";

const TreeViewItem = ({
  item,
  depth,
  treeViewData,
  handleTreeItemParentSearch,
  handleAddItemToTreeView,
  handleChangeTreeItem,
  handleDeleteTreeItem
}) => {
  const hasChildren = item.children ? true : false;
  const [isOpen, setIsOpen] = useState(false);
  const addItemHandler = () => {
    handleAddItemToTreeView(item.id);
  };

  return (
    <>
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          padding: `0 ${item.children ? depth * 2 : depth * 2.5}rem 0 0`,
          width: "fit-content",
          userSelect: "none"
        }}
      >
        <span
          style={{ display: "flex", alignItems: "center", columnGap: ".15rem" }}
          onClick={() => {
            if (item.children) {
              setIsOpen((prevState) => !prevState);
            } else {
              return;
            }
          }}
        >
          {item.children && (
            <span style={{ cursor: "pointer" }}>
              {isOpen ? (
                <IoIosArrowDown size="1.5rem" />
              ) : (
                <IoIosArrowBack size="1.5rem" />
              )}
            </span>
          )}
          <span
            style={{
              border: "1px solid black",
              margin: ".5rem 0",
              padding: ".5rem .8rem",
              borderRadius: ".5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "20rem",
              cursor: "pointer"
            }}
          >
            <input
              type="text"
              value={item.label}
              onChange={(e) => {
                handleChangeTreeItem(e.target.value, item.id);
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              placeholder="عنوان"
              style={{
                height: "100%"
              }}
            />
            <span
              style={{
                display: "flex",
                columnGap: ".5rem"
              }}
            >
              <FaPlusSquare
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                  addItemHandler();
                }}
              />
              <AiFillDelete
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTreeItem(item.id);
                }}
              />
              <CgDetailsMore />
            </span>
          </span>
        </span>
      </span>

      <span>
        {hasChildren &&
          isOpen &&
          item.children.map((item) => (
            <TreeViewItem
              key={item.id}
              item={item}
              depth={
                handleTreeItemParentSearch(treeViewData, item.id).length + 1
              }
              treeViewData={treeViewData}
              handleTreeItemParentSearch={handleTreeItemParentSearch}
              handleAddItemToTreeView={handleAddItemToTreeView}
              handleChangeTreeItem={handleChangeTreeItem}
              handleDeleteTreeItem={handleDeleteTreeItem}
            />
          ))}
      </span>
    </>
  );
};

export default TreeViewItem;
