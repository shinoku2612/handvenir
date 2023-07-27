import { publicRequest } from "../config/axios.config";

export async function getProvince(country) {
    try {
        const res = await publicRequest.get(
            `/location/province?country=${country}`,
        );
        return res.data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
export async function getDistrict(country, province) {
    try {
        const res = await publicRequest.get(
            `/location/district?country=${country}&province=${province}`,
        );
        return res.data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
export async function getCommune(country, district) {
    try {
        const res = await publicRequest.get(
            `/location/commune?country=${country}&district=${district}`,
        );
        return res.data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
