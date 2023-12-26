import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../ReduxSlice/CartSlice";
import UserSlice from "../ReduxSlice/UserSlice";
const myStore = configureStore({
    reducer :{
       cart : CartSlice,
       User : UserSlice
    }
});

export default myStore;