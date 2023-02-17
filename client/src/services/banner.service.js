import { client } from '../utils/sanity-client';
export async function getBannerList() {
    try {
        const query = '*[_type == "banner"]';
        const resData = await client.fetch(query);
        return resData;
    } catch (error) {
        return error.message;
    }
}
