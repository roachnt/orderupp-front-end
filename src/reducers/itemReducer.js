export default function itemReducer(state = [], action) {
  if (action.type === "POPULATE_ITEMS") return action.payload;
  return state;
}
