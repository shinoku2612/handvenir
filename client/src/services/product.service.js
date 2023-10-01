import { publicRequest } from "../config/axios.config";
import { checkType } from "../utils/helper";
export async function getAllProductService(query) {
    try {
        let url = "/product/all";
        if (checkType(query) === "object") {
            const queryString = Object.keys(query)
                .reduce(
                    (urlString, key) =>
                        query[key] !== undefined
                            ? urlString + `${key}=${query[key]}&`
                            : urlString,
                    "?",
                )
                .slice(0, -1);
            url += queryString;
        }

        const res = await publicRequest.get(url);
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
export async function getLatestProductService(limit) {
    try {
        const res = await publicRequest.get(`/product/latest/${limit}`);
        return res.data;
    } catch (error) {
        console.log(error.message);
        return [];
    }
}
