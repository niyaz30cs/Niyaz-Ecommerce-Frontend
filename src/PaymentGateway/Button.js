import React from "react";
import { useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector, useDispatch } from "react-redux";
import { checkoutItem } from "../ReduxSlice/CartSlice";
function Button() {
    const { userID, cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const createOrder = () => {
        return fetch("https://ecom-backend-t7c9.onrender.com/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cart: cartItems, userID: userID, cartTotalQuantity: cartTotalQuantity, cartTotalAmount: cartTotalAmount
            }),
        })
            .then((res) => res.json())
            .then((value) => value.id);
    };
    const Approve = (data) => {
        return fetch("https://ecom-backend-t7c9.onrender.com/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderID: data.orderID
            })
        })
            .then((res) => {
                dispatch(checkoutItem());
                navigate("/success");
                return res.json()
            });
    };
    return (
        <PayPalButtons className="paypalButtons"
            createOrder={(data, actions) => createOrder(data, actions)}
            Approve={(data, actions) => Approve(data, actions)}
        />
    );
}
export default Button;