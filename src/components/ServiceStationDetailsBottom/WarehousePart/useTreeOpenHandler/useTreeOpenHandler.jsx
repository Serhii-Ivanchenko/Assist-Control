import {
  getDescendants,
  //   NodeModel,
  //   TreeMethods,
} from "@minoru/react-dnd-treeview";
import { useRef } from "react";
import { useState } from "react";

const useTreeOpenHandler = () => {
  const ref = useRef(null);

  const [openIds, setOpenIds] = useState([]);

  const open = (id) => {
    ref.current?.open(id);
    setOpenIds((p) => {
      return p.includes(id) ? p : [...p, id];
    });
  };
  const close = (id) => {
    ref.current?.close(id);
    setOpenIds((p) => {
      return [...p.filter((v) => v !== id)];
    });
  };
  const toggle = (id) => {
    openIds.includes(id) ? close(id) : open(id);
  };

  const openParentIfNeeded = (newNodeId, treeData) => {
    const newNode = treeData.find((node) => node.id === newNodeId);
    if (
      newNode &&
      newNode.parent !== null &&
      !openIds.includes(newNode.parent)
    ) {
      open(newNode.parent); // Відкриваємо батьківський вузол
    }
  };

  const isVisible = (id, treeData) => {
    const parentId = treeData.find((node) => node.id === id)?.parent;
    const parentExistsInTree =
      parentId && treeData.find((node) => node.id === parentId);
    if (parentExistsInTree) {
      const isParentVisible = openIds.includes(parentId);
      return isParentVisible ? isVisible(parentId, treeData) : false;
    } else {
      return true;
    }
  };

  const getPipeHeight = (id, treeData) => {
    treeData = getDescendants(treeData, id);
    const ROW_HEIGHT = 58;
    const LIST_PADDING = 0;

    const droppableHeightExceedsRow = (node) =>
      node?.droppable &&
      openIds.includes(node.id) &&
      treeData.filter((n) => n.parent === node.id).length > 0;

    const getHeightOfId = (id) => {
      const directChildren = treeData.filter((node) => node.parent === id);
      const heightOfChildren = directChildren.map((node) =>
        droppableHeightExceedsRow(node)
          ? getHeightOfId(node.id) + ROW_HEIGHT + LIST_PADDING
          : ROW_HEIGHT
      );
      const height = heightOfChildren.reduce((a, b) => a + b, 0);
      return height;
    };

    const lastChild = treeData
      .filter((node) => node.parent === id)
      .reverse()[0];
    if (droppableHeightExceedsRow(lastChild)) {
      return getHeightOfId(id) - getHeightOfId(lastChild.id) - LIST_PADDING;
    }

    return getHeightOfId(id);
  };

  return {
    ref,
    open,
    close,
    toggle,
    getPipeHeight,
    isVisible,
    openIds,
    openParentIfNeeded,
  };
};

export default useTreeOpenHandler;
