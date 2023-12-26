import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import "./Responsive.css";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PayPalScriptProvider} from "@paypal/react-paypal-js";
import myStore from './RudexCompo/Store';
import 'react-toastify/dist/ReactToastify.css';

const initialOptions = {
  clientId: "AcsN_3p_B8j8EiVwAUfvLV3cbJcNXgMPJEd45fxbPpyIB6dbKHdNKTLZDXUKucOHyrPuV6tA0SUhPnNT",
  currency: "USD",
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={myStore}>
        <PayPalScriptProvider options={initialOptions}>
        <App />
        </PayPalScriptProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
