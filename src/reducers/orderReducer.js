export default function orderReducer(state = {}, { type, payload }) {
  if (type === "ADD_ITEM") {
    /*
      payload = {itemId, options}
    */
    const size = state.size + 1;
    const items = { ...state.items };
    items[`item${size}`] = {
      itemId: payload.itemId,
      options: {}
    };
    for (let j = 0; j < payload.options.length; j++) {
      items[`item${size}`]["options"][`option${j + 1}`] = payload.options[j];
    }
    localStorage.setItem(
      "order",
      JSON.stringify({
        items,
        size: parseInt(size, 10)
      })
    );
    return { items, size };
  } else if (type === "REMOVE_ITEM") {
    const order = { ...state };
    if (order["items"][payload]) {
      delete order["items"][payload];
      order["size"]--;
    } else console.log("Item does not exist");
    localStorage.setItem(
      "order",
      JSON.stringify({
        items: order["items"],
        size: parseInt(order["size"], 10)
      })
    );
    return order;
  } else if (type === "SET_ORDER") {
    localStorage.setItem(
      "order",
      JSON.stringify({
        ...payload,
        size: parseInt(payload["size"], 10)
      })
    );
    return payload;
  }
  return state;
}
