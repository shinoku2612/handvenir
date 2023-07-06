import { publicRequest } from "../config/axios.config";
export async function getAllProductService() {
    try {
        const res = await publicRequest.get("/product/all");
        return res.data;
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

export async function getProductBySlugService(slug) {
    try {
        const res = await publicRequest(`/product/single/${slug}`);
        return res.data;
    } catch (error) {
        console.log(error.message);
        return {};
    }
}
export async function getProductByIdService(productId) {
    try {
        const res = await publicRequest.get(`/product/get/${productId}`);
        return res.data;
    } catch (error) {
        console.log(error.message);
        return {};
    }
}
export async function findProductService(searchQuery) {
    try {
        const res = await publicRequest.get(`/product/search?s=${searchQuery}`);
        return res.data;
    } catch (error) {
        console.log(error.message);
        return [];
    }
}
export async function filterProductService(filterQuery) {
    try {
        const res = await publicRequest.get(`/product/filter?c=${filterQuery}`);
        return res.data;
    } catch (error) {
        console.log(error.message);
        return [];
    }
}
export async function getLatestProductService(limit) {
    try {
        const res = await publicRequest.get(`/product/latest/${limit}`);
        return res.data;
    } catch (error) {
        console.log(error.message);
        return [];
    }
}
