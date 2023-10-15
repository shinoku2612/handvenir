import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getCart,
    getIsLoading,
    getUser,
    getUserId,
} from "../../redux/selectors";
import { makeOrderService } from "../../services/order.service";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

export default function CodButton() {
    const user = useSelector(getUser);
    const userId = useSelector(getUserId);
    const cart = useSelector(getCart);
    const isLoading = useSelector(getIsLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleCheckout() {
        try {
            const result = await makeOrderService(
                userId,
                {
                    product_list: cart.product_list,
                    address: user.mainAddress,
                    receiver: user.name,
                    method: "cod",
                },
                dispatch,
            );
            if (result) navigate("/success");
        } catch (error) {
            console.log(error.message);
        }
    }
    if (isLoading) return <Loader variant="overlay" />;
    return (
        <div
            className="btn btn-dark width-full"
            onClick={handleCheckout}
        >
            Place order
        </div>
    );
}
