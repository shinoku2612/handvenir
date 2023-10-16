import React from "react";
import PayPalButton from "./PayPalButton";
import CodButton from "./CodButton";

export default function CheckoutButton({
    method = "cod",
    productList,
    address,
    receiver,
}) {
    if (method === "paypal")
        return (
            <PayPalButton
                productList={productList}
                address={address}
                receiver={receiver}
            />
        );
    return (
        <CodButton
            productList={productList}
            address={address}
            receiver={receiver}
        />
    );
}
