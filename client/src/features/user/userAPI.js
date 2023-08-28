export function fetchUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/order?user=" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchUserInfo(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/user/" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/user/" + userData.id, {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
