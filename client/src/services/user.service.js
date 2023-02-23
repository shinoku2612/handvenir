import { privateRequest } from '../config/axios.config';
import { setToast } from '../redux/slice/global.slice';

export async function getUserService(userId, dispatch) {
    try {
        const res = await privateRequest.get(`/user/find/${userId}`);
        return res.data.data;
    } catch (error) {
        dispatch(
            setToast({
                show: true,
                type: 'danger',
                message: error.response.data.data,
            }),
        );
        return {};
    }
}
