import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from 'react';
import ReactDOM from 'react-dom';
import styles from './Toast.module.css';
import { CheckCircle, Error, Close } from '@mui/icons-material';
import cx from '../../utils/class-name';

function Toast(
    {
        variant,
        autoClose = true,
        delay = 3000,
        duration = 300,
        timeline = true,
    },
    ref,
) {
    // [STATES]
    const [toastList, setToastList] = useState([]);
    const [removedToastId, setRemovedToastId] = useState(null);

    // [SIDE EFFECTS]
    // --Auto close toast: (1)--
    useEffect(() => {
        if (removedToastId) {
            setToastList((toasts) =>
                toasts.filter((toast) => toast.id !== removedToastId),
            );
        }
    }, [removedToastId]);
    // --Trigger (1)--
    useEffect(() => {
        const toastsLength = toastList.length;
        if (autoClose && toastsLength) {
            const id = toastList[toastsLength - 1].id;
            const setRemovedToastIdTimeout = setTimeout(() => {
                setRemovedToastId(id);
                clearTimeout(setRemovedToastIdTimeout);
            }, delay);
        }
    }, [autoClose, delay, toastList]);
    // --Export show toast function to forwarded ref--
    useImperativeHandle(ref, () => ({
        showToast(type, message) {
            let toast = null;
            const toastAnimations = [
                `${styles.slideToLeft} ${duration}ms linear`,
                `${styles.fadeOut} ${duration}ms linear ${delay - duration}ms`,
            ];
            let toastClassList = styles.toast;
            if (variant && styles[variant]) {
                toastClassList = cx(toastClassList, styles[variant]);
            }
            if (autoClose && timeline) {
                toastClassList = cx(toastClassList, styles.timeline);
            }
            switch (type) {
                case 'success': {
                    toast = {
                        id: Date.now(),
                        status: 'Success',
                        message: message,
                        statusIcon: <CheckCircle />,
                        color: '#28a745',
                        background: '#dcf8e7',
                        animation: autoClose && toastAnimations.join(', '),
                    };
                    break;
                }
                case 'danger': {
                    toast = {
                        id: Date.now(),
                        status: 'Failure',
                        message: message,
                        statusIcon: <Error />,
                        color: '#dc3545',
                        background: '#ffe4e4',
                        animation: autoClose && toastAnimations.join(', '),
                    };
                    break;
                }
                default:
                    break;
            }
            toast.classList = toastClassList;
            setToastList((prev) => [...prev, toast]);
        },
    }));

    // [HANDLER FUNCTIONS]
    // --Close toast manualy--
    function handleCloseToast(toastId) {
        setToastList((toasts) =>
            toasts.filter((toast) => toast.id !== toastId),
        );
    }

    // [RENDER]
    return ReactDOM.createPortal(
        <div className={styles.toastContainer}>
            {toastList.map((toast) => (
                <div
                    key={toast.id}
                    className={toast.classList}
                    style={{
                        color: toast.color,
                        animation: toast.animation,
                        '--toast-bg': toast.background,
                        '--timeline-countdown': `${delay}ms`,
                    }}
                >
                    <div className={styles.toastIcon}>{toast.statusIcon}</div>
                    <div className={styles.toastBody}>
                        <h3 className={styles.toastStatus}>{toast.status}</h3>
                        <p className={styles.toastMessage}>{toast.message}</p>
                    </div>
                    <div
                        className={styles.toastClose}
                        onClick={() => {
                            handleCloseToast(toast.id);
                        }}
                    >
                        <Close />
                    </div>
                </div>
            ))}
        </div>,
        document.body,
    );
}

export default forwardRef(Toast);
