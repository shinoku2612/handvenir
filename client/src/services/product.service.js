import { client } from "../utils/sanity-client";
import { publicRequest } from "../config/axios.config";
export async function getAllProductService() {
    try {
        const res = await publicRequest.get("/product/all");
        return res.data;
    } catch (error) {
        return error.message;
    }
}

export async function getProductBySlugService(slug) {
    try {
        const res = await publicRequest(`/product/single/${slug}`);
        return res.data;
    } catch (error) {
        return error.message;
    }
}
export async function getProductByIdService(productId) {
    try {
        const res = await publicRequest.get(`/product/get/${productId}`);
        return res.data;
    } catch (error) {
        return error.message;
    }
}
export async function findProductService(searchQuery) {
    try {
        const res = await publicRequest.get(`/product/find?s=${searchQuery}`);
        return res.data;
    } catch (error) {
        return error.message;
    }
}
export async function filterProductService(filterQuery) {
    try {
        const res = await publicRequest.get(`/product/filter?c=${filterQuery}`);
        return res.data;
    } catch (error) {
        return error.message;
    }
}

export async function getNewProductList(limit) {
    try {
        const query = `*[_type == "product"] | order(_createdAt desc)[0..${
            limit - 1
        }]`;
        const resData = await client.fetch(query);
        return resData;
    } catch (error) {
        return error.message;
    }
}
export async function getRandomProductList(limit) {
    try {
        const query = `*[_type == "product"]`;
        const resData = await client.fetch(query);
        const randomList = [];
        const indexList = [];
        for (let i = 0; i < limit; i++) {
            let index;
            do {
                index = Math.floor(Math.random() * (limit + 1));
            } while (indexList.includes(index));
            indexList.push(index);
            randomList.push(resData[index]);
        }
        return randomList;
    } catch (error) {
        return error.message;
    }
}
