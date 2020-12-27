const BACKEND_URL = "http://localhost:8080";

export const sendNewProduct = (name, calories,photo) => {
  let formData = new FormData()
  formData.append('name', name)
  formData.append('calories', calories)
  formData.append('photo', photo)

  return fetch(`${BACKEND_URL}/addProduct`, {
    method: "POST",
    body: formData
  })
    .then(response => response.text())
}

export const getProduct = (productId) => {
  return fetch(`${BACKEND_URL}/getProduct/${productId}`, {
    method: "GET"
  })
    .then(response => response.json())
}

export const changeProduct = (productId, name, calories,photo) => {
  let formData = new FormData()
  formData.append('name', name)
  formData.append('calories', calories)
  formData.append('photo', photo)

  return fetch(`${BACKEND_URL}/updateProduct/${productId}`, {
    method: "POST",
    body: formData
  })
    .then(response => response.text())
}

export const getAllProducts = () => {
  return fetch(`${BACKEND_URL}/products`, {
    method: "GET"
  })
    .then(response => response.json())
}

export const getPhoto = (path) => {
  return fetch(`${BACKEND_URL}/getPhoto`, {
    method: "POST",
    body: path
  })
    .then(response => response.blob())
    .then(image => image.size > 0 ? window.URL.createObjectURL(image) : null)
}

export const getProductsByName = (name) => {
  return fetch(`${BACKEND_URL}/getProductsByName/${name}`, {
    method: "GET"
  })
    .then(response => response.json())
}

export const deleteProduct = (id) => {
  return fetch(`${BACKEND_URL}/deleteProduct/${id}`,{
    method: 'GET'
  })
    .then(response => response.text())
}