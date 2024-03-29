import {
    Favorite,
    HeadsetMic,
    Logout,
    Person,
    ShoppingCart,
    VolunteerActivism,
    Info,
    FacebookOutlined,
} from "@mui/icons-material";
import { PATH } from "./constant.config";
import userPNG from "../assets/images/user.png";
import addressPNG from "../assets/images/address.png";
import shoppingHistoryPNG from "../assets/images/shopping.png";

const { index, address, history } = PATH.profile;

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
            id: "shopping-history",
            title: "Shopping history",
            path: `./${history}`,
            image: shoppingHistoryPNG,
        },
    ],
    extendedHeader: [
        {
            id: "information",
            path: "/information",
            title: "About us",
            icon: <Info />,
        },
        {
            id: "donate",
            path: "/donate",
            title: "Donate",
            icon: <VolunteerActivism />,
        },
        {
            id: "fanpage",
            path: "https://www.facebook.com/kynangspk",
            title: "Fanpage",
            source: "external",
            icon: <FacebookOutlined />,
        },
    ],
};

export default MENU;
