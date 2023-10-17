import React from "react";
import PayPalButton from "./PayPalButton";
import CodButton from "./CodButton";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getUserId } from "../../redux/selectors";
import { useNavigate } from "react-router-dom";
import { makeOrderService } from "../../services/order.service";

export default function CheckoutButton({
    method = "cod",
    productList,
    address,
    receiver,
}) {
    const userId = useSelector(getUserId);
    const cart = useSelector(getCart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleCheckout(method) {
        try {
            const result = await makeOrderService(
                userId,
                {
                    product_list: cart.product_list,
                    address: address,
                    receiver: receiver,
                    method: method,
                },
                dispatch,
            );
            if (result) navigate("/success");
        } catch (error) {
            console.log(error.message);
        }
    }
    if (method === "paypal")
        return (
            <PayPalButton
                productList={productList}
                address={address}
                receiver={receiver}
                onMakeOrder={() => handleCheckout("paypal")}
            />
        );
    return <CodButton onMakeOrder={() => handleCheckout("cod")} />;
}
