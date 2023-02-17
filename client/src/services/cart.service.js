import { client } from '../utils/sanity-client';
export async function getCart() {
    try {
        const query = '*[_type == "cart"]';
        const resData = await client.fetch(query);
        return resData;
    } catch (error) {
        return error.message;
    }
}
