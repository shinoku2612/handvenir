import { client } from '../utils/sanity-client';
export async function getCategories() {
    try {
        const query = '*[_type == "category"]';
        const resData = await client.fetch(query);
        return resData;
    } catch (error) {
        return error.message;
    }
}
