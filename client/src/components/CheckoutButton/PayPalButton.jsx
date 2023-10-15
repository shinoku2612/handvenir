import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { getCart } from "../../redux/selectors";

export default function PayPalButton({ productList }) {
    const cart = useSelector(getCart);
    console.log(productList);
    return (
        <PayPalButtons
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                currency_code: "USD",
                                value: cart.total,
                                breakdown: {
                                    item_total: {
                                        currency_code: "USD",
                                        value: cart.total,
                                    },
                                },
                            },
                            items: productList.map((product) => {
                                return {
                                    name: product.title,
                                    unit_amount: {
                                        currency_code: "USD",
                                        value: product.price,
                                    },
                                    quantity: cart.product_list.find(
                                        (p) => p.product === product._id,
                                    ).quantity,
                                };
                            }),
                        },
                    ],
                });
            }}
        />
    );
}
