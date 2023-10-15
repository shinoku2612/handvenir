import React from "react";
import PayPalButton from "./PayPalButton";
import CodButton from "./CodButton";

export default function CheckoutButton({ method = "cod", productList }) {
    if (method === "paypal") return <PayPalButton productList={productList} />;
    return <CodButton />;
}
