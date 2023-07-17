import React, { useEffect, useRef } from "react";
import Toast from "./components/Toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import { getToast, getUserId } from "./redux/selectors";
import Router from "./config/router.config";
import { useQuery } from "react-query";
import { getUserService } from "./services/user.service";
import { syncLocalCartService } from "./services/cart.service";
import { syncLocalWishListService } from "./services/wish-list.service";

function App() {
    // [STATES]
    const userId = useSelector(getUserId);
    const toast = useSelector(getToast);
    const toastRef = useRef();
    const dispatch = useDispatch();

    // [API QUERIES]
    useQuery(["user", userId], () => {
        if (userId) {
            getUserService(userId, dispatch);
            syncLocalCartService(userId, dispatch);
            syncLocalWishListService(userId);
        }
    });

    // [SIDE EFFECTS]
    useEffect(() => {
        if (toast.show) {
            toastRef.current.showToast(toast.type, toast.message);
        }
    }, [toast]);

    // [RENDER]
    return (
        <React.Fragment>
            <Router />
            <Toast
                ref={toastRef}
                variant="fill"
            />
        </React.Fragment>
    );
}

export default App;
