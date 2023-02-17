import React, { useEffect, useRef } from 'react';
import Toast from './components/Toast/Toast';
import { useSelector } from 'react-redux';
import { getToast } from './redux/selectors';
import Router from './config/router.config';

function App() {
    const toastRef = useRef();

    const toast = useSelector(getToast);
    useEffect(() => {
        if (toast.show) {
            toastRef.current.showToast(toast.type, toast.message);
        }
    }, [toast]);
    return (
        <React.Fragment>
            <Router />
            <Toast ref={toastRef} variant="fill" autoClose timeline />
        </React.Fragment>
    );
}

export default App;
