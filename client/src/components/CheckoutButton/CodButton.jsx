import React from "react";
import { useSelector } from "react-redux";
import { getIsLoading } from "../../redux/selectors";
import Loader from "../Loader/Loader";

export default function CodButton({ onMakeOrder }) {
    const isLoading = useSelector(getIsLoading);

    if (isLoading) return <Loader variant="overlay" />;
    return (
        <div
            className="btn btn-dark width-full"
            onClick={onMakeOrder}
        >
            Place order
        </div>
    );
}
