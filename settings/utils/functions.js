import { produce } from "immer";
export function findItemByName(items, name) {
  for (const item of items) {
    if (item.name === name) {
      return item;
    }
    if (item.children) {
      const foundItem = findItemByName(item.children, name);
      if (foundItem) {
        return foundItem;
      }
    }
  }
  return null;
}

export const getParentObjectByValue = (items, name) => {
  const key = items.filter(item => item.children && item.children.find(child => child.name === name))
  return key[0]
}



export const updateData = (attr, value, ...props) => {
  if (props.length === 0) {
    return value;
  }
  const [currentProp, ...remainingProps] = props;
  if (remainingProps.length === 0) {
    return produce(attr, (draft) => {
      draft[currentProp] = value;
    });
  }
  return produce(attr, (draft) => {
    if (!Object.prototype.hasOwnProperty.call(draft, currentProp)) {
      draft[currentProp] = {};
    }
    draft[currentProp] = updateData(
      draft[currentProp],
      value,
      ...remainingProps
    );
  });
}



