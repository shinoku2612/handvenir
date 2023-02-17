import { client } from '../utils/sanity-client';
export async function getAllProducts() {
    try {
        const query = '*[_type == "product"]';
        const resData = await client.fetch(query);
        return resData;
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
export async function getProductBySlug(slug) {
    try {
        const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
        const resData = await client.fetch(query);
        return resData;
    } catch (error) {
        return error.message;
    }
}
export async function getProductById(productId) {
    try {
        const query = `*[_type == "product" && _id == "${productId}"][0]`;
        const resData = await client.fetch(query);
        return resData;
    } catch (error) {
        return error.message;
    }
}
