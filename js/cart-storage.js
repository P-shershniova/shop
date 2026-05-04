// Cart in localStorage: key "cartIds" = space-separated product ids

var CART_KEY = "cartIds";

function getCartIds() {
  var s = localStorage.getItem(CART_KEY) || "";
  return s.trim().split(/\s+/).filter(Boolean);
}

function getCartCount() {
  return getCartIds().length;
}

function addToCart(id) {
  var ids = getCartIds();
  ids.push(String(id));
  localStorage.setItem(CART_KEY, ids.join(" "));
}

function clearCart() {
  localStorage.setItem(CART_KEY, "");
}

function updateBadge() {
  var el = document.getElementById("badge");
  if (el) el.textContent = getCartCount();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateBadge);
} else {
  updateBadge();
}
