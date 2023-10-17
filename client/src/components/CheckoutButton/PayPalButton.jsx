import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { getCart, getIsLoading } from "../../redux/selectors";
import Loader from "../Loader/Loader";

export default function PayPalButton({
    productList,
    address,
    receiver,
    onMakeOrder,
}) {
    const cart = useSelector(getCart);
    const isLoading = useSelector(getIsLoading);

    if (isLoading) return <Loader variant="overlay" />;

    return (
        <PayPalButtons
            key={address + receiver.name + receiver.phone}
            style={{ layout: "horizontal", tagline: false }}
            createOrder={(data, actions) => {
                const addressGroup = address.split(", ");
                const addressLineList = [
                    "address_line_1",
                    "address_line_2",
                    "admin_area_2",
                    "admin_area_1",
                ];
                const shippingAddress = addressLineList.reduce(
                    (address, line, index) => {
                        address[line] = addressGroup[index];
                        return address;
                    },
                    {},
                );
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
                            shipping: {
                                name: {
                                    full_name: receiver.name,
                                },
                                address: {
                                    ...shippingAddress,
                                    country_code: "VN",
                                },
                                phone_number: {
                                    national_number: receiver.phone,
                                },
                            },
                        },
                    ],
                });
            }}
            onApprove={async (data, actions) => {
                const order = await actions.order.capture();
                console.log(order);
                await onMakeOrder();
            }}
            onError={(error) => {
                console.log(error.message);
            }}
        />
    );
}
