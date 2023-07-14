import {
    Favorite,
    HeadsetMic,
    Logout,
    Person,
    ShoppingCart,
} from "@mui/icons-material";
import { PATH } from "./constant.config";
import userPNG from "../assets/images/user.png";
import addressPNG from "../assets/images/address.png";
import creditPNG from "../assets/images/credit.png";
import shoppingHistoryPNG from "../assets/images/shopping.png";
import shopRegisterPNG from "../assets/images/shop-register.png";
import shopPNG from "../assets/images/shop.png";

const { index, address, credit, history, shopRegister, shop } = PATH.profile;

const MENU = {
    header: [
        {
            id: "sign-in",
            icon: <Person />,
            path: `/${PATH.auth}`,
            accessibility: "public",
            title: "Sign in / Sign up",
        },
        {
            id: "user",
            path: `/${index}`,
            accessibility: "private",
            title: "Profile",
        },
        {
            id: "cart",
            icon: <ShoppingCart />,
            path: `/${PATH.cart}`,
            accessibility: "all",
            title: "My cart",
        },
        {
            id: "wish-list",
            icon: <Favorite />,
            path: "/favorite",
            accessibility: "all",
            title: "My favourite",
        },
        {
            id: "user-service",
            icon: <HeadsetMic />,
            path: "/user-service",
            accessibility: "all",
            title: "Customer service",
        },
        {
            id: "sign-out",
            icon: <Logout />,
            path: `/${PATH.auth}`,
            accessibility: "private",
            title: "Log out",
        },
    ],
    sidebar: [
        {
            id: "personal",
            title: "Personal",
            path: "",
            image: userPNG,
        },
        {
            id: "shipping-address",
            title: "Shipping address",
            path: `./${address}`,
            image: addressPNG,
        },
        {
            id: "credit-card",
            title: "Credit cards",
            path: `./${credit}`,
            image: creditPNG,
        },
        {
            id: "shopping-history",
            title: "Shopping history",
            path: `./${history}`,
            image: shoppingHistoryPNG,
        },
        {
            id: "shop-register",
            title: "Shop register",
            path: `./${shopRegister}`,
            image: shopRegisterPNG,
        },
        {
            id: "my-shop",
            title: "My shop",
            path: `./${shop}`,
            image: shopPNG,
        },
    ],
};

export default MENU;
