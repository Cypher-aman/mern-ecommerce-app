export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/cart/", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCartItem(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/cart/" + item.id, {
      method: "PATCH",
      body: JSON.stringify({ quantity: item.quantity }),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteCartItem(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    resolve({ data: { itemId } });
  });
}

export function fetchCartItems(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/cart?user=" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function resetCart(userId) {
  return new Promise(async (resolve) => {
    const response = await fetchCartItems(userId);
    const items = response.data;
    for (const item of items) {
      await deleteCartItem(item.id);
    }
    resolve({ status: "reset" });
  });
}
