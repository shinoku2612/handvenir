import { publicRequest } from '../config/axios.config';
import { setToast } from '../redux/slice/global.slice';

export async function sendOTPService({ type, email }, dispatch) {
    try {
        await publicRequest.post('/otp/auth', {
            type,
            email,
        });
        return true;
    } catch (error) {
        dispatch(
            setToast({
                show: true,
                type: 'danger',
                message: 'Oops! Cannot send OTP, please try again!',
            }),
        );
        return false;
    }
}
