import api from "./api";

export const getProducts = async () => {
    const res = await api.get('/products/getProducts')
    return res.data
}

export const createProduct = async (product) => {
    const res = await api.post('/products/', product)
    return res.data
}

export const getProductById = async (id) => {
    const res = await api.get(`/products/getProductById/${id}`)
    return res.data

}

export const updateProduct = async (id, product) => {
    const res = await api.put(`/products/updateProduct/${id}`, product)
    return res.data
}

export const deleteProduct = async (id) => {
    const res = await api.delete(`/products/deleteProduct/${id}`)
    return res.data
}   