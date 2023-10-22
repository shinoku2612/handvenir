import React, { useEffect, useRef } from "react";
import Toast from "./components/Toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import { getToast, getUserId } from "./redux/selectors";
import Router from "./config/router.config";
import { useQuery } from "react-query";
import { getUserService } from "./services/user.service";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { publicRequest } from "./config/axios.config";
import Loader from "./components/Loader/Loader";

function App() {
    // [STATES]
    const userId = useSelector(getUserId);
    const toast = useSelector(getToast);
    const toastRef = useRef();
    const dispatch = useDispatch();

    // [API QUERIES]
    const { isLoading } = useQuery("get-ready", () => publicRequest.get("/"));
    useQuery(
        ["user", userId],
        () => {
            if (userId) {
                getUserService(userId, dispatch);
            }
        },
        { enabled: !isLoading },
    );

    // [SIDE EFFECTS]
    useEffect(() => {
        if (toast.show) {
            toastRef.current.showToast(toast.type, toast.message);
        }
    }, [toast]);

    // [RENDER]
    if (isLoading) return <Loader />;
    return (
        <PayPalScriptProvider
            options={{
                clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
                intent: "capture",
                currency: "USD",
                locale: "en_VN",
            }}
        >
            <Router />
            <Toast
                ref={toastRef}
                variant="fill"
            />
        </PayPalScriptProvider>
    );
}

export default App;
