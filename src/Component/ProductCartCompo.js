import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { TotalAmmount, decreaseItem, increaseItem, removeItem,} from '../ReduxSlice/CartSlice';
import Button from '../PaymentGateway/Button';

function ProductCartCompo() {
  const navigate = useNavigate()
  const [Checkout, setCheckout] = useState(false)
  const { isLoggedIn } = useSelector((state) => state.User);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  let totalCartRate = 0;
  let totalProducts = 0;

  const handleIncrement = (id) => {
    dispatch(increaseItem({ "id": id }))
  }

  const handleDecrement= (id) => {
    dispatch(decreaseItem({ "id": id }))
  }

  const handleRemoveClick = (id) => {
    dispatch(removeItem(id));
    toast.success('Item Deleted Successfully', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  useEffect(() => {
    dispatch(TotalAmmount({ totalCartRate, totalProducts }))
  });

  const handleCheckout = () => {
    setCheckout(true);
  }

  return (
    < >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {
        <div className='cartItems--Container'>
          {
            Checkout ? <Button /> : <>
              {
                isLoggedIn ? <>
                  {
                    cartItems.length <= 0 ? <p className='emptyCartMessage'>Cart is Empty</p> : <>

                      <div className='cartItemBox'>
                        {cartItems.map((items) => {
                          totalCartRate += items.Dprice * items.cartQuantity;
                          totalProducts += items.cartQuantity;
                          return <div key={items.id}>
                            <div className="itemBox">

                              <div className="itemPictureContainer">
                                <img src={items.images && items.images[0]} alt="productImage" className='itemPicture' />
                              </div>

                              <div className="itemDetailsContainer">

                                <p className="itemBox--itemPrice">₹ {items.Dprice}</p>

                                <div className="ItemquantityContainer">
                                  <button className='quantityButton' onClick={() => handleDecrement(items.id)}>-</button>
                                  <span className='itemQuantity'>{items.cartQuantity}</span>
                                  <button className='quantityButton' onClick={() => handleIncrement(items.id)}>+</button>
                                </div>

                                <p className="itemToalPrice">Item Price <span className='ToalPrice'>₹{items.Dprice * items.cartQuantity}</span></p>
                                <button className='removeFromCartButton' onClick={() => handleRemoveClick(items.id)}>Delete</button>
                              </div>

                            </div>
                            <hr className='hrLine' />
                          </div>
                        })}
                      </div>

                      <div className='cartItem-PriceBox'>
                        <h3 className='PriceBox--heading'>Price Details</h3>
                        <p className="PriceBox-Items">Total Items <span className="PriceBox-Items-Label">{totalProducts}</span></p>
                        <p className="PriceBox-Items">SubTotal <span className="PriceBox-Items-Label">₹ {totalCartRate}</span></p>
                        <p className="PriceBox-Items">Shipping Fee <span className="PriceBox-Items-Label">₹ 0</span></p>
                        <p className="PriceBox-Items">Tax <span className="PriceBox-Items-Label">₹ 0</span></p>
                        <p className="PriceBox-Items">Total Ammount <span className="PriceBox-Items-Label">₹ {totalCartRate}</span></p>
                        <button className='checkOutButton' onClick={handleCheckout}>Check Out</button>
                      </div>
                    </>
                  }
                </>
                  :
                  <>
                    <button className='checkOutButton' onClick={() => navigate("/user/login")}>LogIn</button>
                  </>
              }
            </>
          }
        </div>
      }
    </>
  )
}

export default ProductCartCompo;
