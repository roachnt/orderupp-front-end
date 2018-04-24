export const addItemToOrderAction = (itemId, options) => ({
  type: "ADD_ITEM",
  payload: { itemId, options }
});

export const removeItemFromOrderAction = orderItemKey => ({
  type: "REMOVE_ITEM",
  payload: orderItemKey
});

export const setOrderAction = order => ({
  type: "SET_ORDER",
  payload: order
});
