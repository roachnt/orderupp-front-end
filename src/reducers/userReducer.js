export default function userReducer(state = {}, { type, payload }) {
  if (type === "LOGIN") {
    if (!payload) {
      localStorage.removeItem("user");
      return null;
    } else {
      localStorage.setItem("user", JSON.stringify(payload));
      return payload;
    }
  }
  return state;
}
