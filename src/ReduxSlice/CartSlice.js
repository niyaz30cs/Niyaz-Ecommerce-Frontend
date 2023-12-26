import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userID: localStorage.getItem("userID") ? localStorage.getItem("userID") : null,
    cartItems: localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}
const CartSlice = createSlice({
    name: 'shopping',
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
                state.cartTotalQuantity++;
            }
            localStorage.setItem("items", JSON.stringify(state.cartItems))    
        },

        increaseItem(state, action) {
            const currentIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            state.cartItems[currentIndex].cartQuantity += 1;

            localStorage.setItem("items", JSON.stringify(state.cartItems));
        },

        decreaseItem(state, action) {
            const currentIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (state.cartItems[currentIndex].cartQuantity > 1) {
                state.cartItems[currentIndex].cartQuantity -= 1;
            }
            localStorage.setItem("items", JSON.stringify(state.cartItems));
        },

        removeItem(state, action) {
            const filteredData = state.cartItems.filter((product) => product.id !== action.payload);
            state.cartTotalQuantity--;
            state.cartItems = filteredData;
            localStorage.setItem("items", JSON.stringify(state.cartItems));
        },

        checkoutItem(state, action) {
            state.cartItems = [];
            state.cartTotalQuantity = 0;
            localStorage.setItem("items", JSON.stringify(state.cartItems));
        },

        TotalAmmount(state, action) {
            state.cartTotalQuantity = action.payload.totalProducts;
            state.cartTotalAmount = action.payload.totalCartPrice;
        }
    }
});
export const { addToCart, increaseItem, decreaseItem, removeItem, TotalAmmount,checkoutItem } = CartSlice.actions;
export default CartSlice.reducer;