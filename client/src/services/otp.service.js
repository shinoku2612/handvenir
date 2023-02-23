import { publicRequest } from '../config/axios.config';
import { setToast } from '../redux/slice/global.slice';

export async function sendOTPService({ type, email, password }, dispatch) {
    try {
        await publicRequest.post('/otp/auth', {
            type,
            email,
            password,
        });
        return true;
    } catch (error) {
        dispatch(
            setToast({
                show: true,
                type: 'danger',
                message: error.response.data.data,
            }),
        );
        return false;
    }
}
