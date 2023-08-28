export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const data = await response.json();
        reject(data);
      }
    } catch (err) {
      reject({ message: err.message });
    }
  });
}

export function checkCredentials(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const data = await response.json();
        reject(data);
      }
    } catch (err) {
      reject({ message: err.message });
    }
  });
}
