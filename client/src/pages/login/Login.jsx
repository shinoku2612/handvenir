import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { loginService } from "../../services/authentication.service";
import { useDispatch } from "react-redux";
// import styles from "./Login.module.css";

export default function Login() {
    const [searchParam] = useSearchParams();
    const userId = searchParam.get("i");
    const token = searchParam.get("t");
    const dispatch = useDispatch();
    const { isLoading, data } = useQuery(["login", userId, token], () =>
        loginService({ userId, token }, dispatch),
    );

    const [counter, setCounter] = useState(3);
    const navigate = useNavigate();
    useEffect(() => {
        let timerId;
        timerId = setInterval(() => {
            navigate("/me");
            return clearInterval(timerId);
        }, 3000);
    }, [navigate]);
    useEffect(() => {
        const timerTimeoutId = setTimeout(() => {
            setCounter(counter - 1);
        }, 1000);
        if (counter === 0) return clearTimeout(timerTimeoutId);
    }, [counter]);

    if (isLoading) return <h1>Please wait...</h1>;
    if (!data) return <h1>Something went wrong</h1>;

    return <h1>Redirect after {counter} seconds...</h1>;
}
