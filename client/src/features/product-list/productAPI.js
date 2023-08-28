export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/category");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/brand");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/api/product/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/product", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/product/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function fetchProductsByFilter(filter, sort, pagination) {
  let query = "";

  for (const key in sort) {
    query += `${key}=${sort[key]}&`;
  }

  for (const key in pagination) {
    query += `${key}=${pagination[key]}&`;
  }

  // Convert the filter object to query parameters
  for (const key in filter) {
    if (Array.isArray(filter[key])) {
      filter[key].forEach((value) => {
        query += `${key}[]=${value}&`;
      });
    } else {
      query += `${key}=${filter[key]}&`;
    }
  }

  return new Promise(async (resolve) => {
    const response = await fetch("/api/product?" + query, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });

    const totalItems = response.headers.get("X-Total-Count");
    const data = await response.json();

    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}
