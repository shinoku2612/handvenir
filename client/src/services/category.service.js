import { publicRequest } from "../config/axios.config";
export async function getCategories() {
    try {
        const res = await publicRequest.get("/category");
        return res.data;
    } catch (error) {
        return error.message;
    }
}
