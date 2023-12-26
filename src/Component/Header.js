import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogOut } from '../ReduxSlice/UserSlice';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
// import { FaRegUser } from "react-icons/fa";

function Header() {
  const [search, setSearch] = useState("")
  const [findProduct, setfindProduct] = useState([])
  const [SearchVisible, setSearchVisible] = useState(false);
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const { CurrentUser, isLoggedIn } = useSelector((state) => state.User);
  const dispatch = useDispatch();

  const handleOnInput = (e) => {
    setSearch(e.target.value);
  }
  const handleEnterKey = (e) => {
    if (e.keyCode === 13) {
      if (search === "") {
        toast.error("Search Box Can't Be Empty", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setSearchVisible(true);
        axios(`https://ecom-backend-t7c9.onrender.com/search/${search}`).then((response) => {
          setfindProduct(response.data)
        });
      }
    }

  }
  const handleClick = () => {
    const navBar = document.querySelector(".sideNavbar");
    const hamMenuBtn = document.querySelector(".hamNavButton");
    navBar.classList.toggle("hideTabMobileNavBar");
    hamMenuBtn.classList.toggle("fa-xmark");
  }
  const handleLogOut = () => {
    dispatch(userLogOut(false));
    toast.info('Sign Out!', {
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
  return (
    <>
      <header className='App--Header'>
        <h2 className='head'>Alibaba.com</h2>
        <div className="searchContainer">
          <input type="text" name='SearctProduct' id='SearchProduct' placeholder='Search Here' onChange={handleOnInput} onKeyDown={handleEnterKey} value={search} />
        </div>
        <div className="userContainer">
          <div className="userBox">
            {/* <i className="fa-solid fa-user-tie userIcon"></i> */}
            {/* <FaRegUser /> */}
            <h2 className='UserName'>{CurrentUser?.User[0] ? CurrentUser.User[0].userName.slice(0, 1) : <i className="fa-solid fa-user-tie userIcon"></i>}</h2>
            <span className='itemCountLabel'>{isLoggedIn ? cartTotalQuantity : 0}</span>
          </div>
          <ul className="userDropDown">
            {
              isLoggedIn ?
                <>
                  <Link className="dropDownItem" to="/cart"><i className="fa-solid fa-cart-shopping dropDownnitemIcon"></i> <span className='itemLabel'>Cart</span> </Link>

                  <li className="dropDownItem" onClick={handleLogOut} ><i className="fa-solid fa-right-from-bracket dropDownnitemIcon"></i> <span className='itemLabel'>LogOut</span> </li>
                </>
                :
                <>
                  <Link className="dropDownItem" to="/user/register"><i className="fa-solid fa-user-plus dropDownnitemIcon"></i><span className='itemLabel'>Register</span></Link>
                  <Link className="dropDownItem" to="/user/login"><i class="fa-solid fa-arrow-right-to-bracket dropDownnitemIcon"></i><span className='itemLabel'>LogIn</span></Link>
                </>
            }
          </ul>
        </div>
        <i className="fa-solid fa-bars hamNavButton" onClick={handleClick}></i>
      </header>
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
        SearchVisible && <div className="serachResultContainer">
          <div className='closeSearchResultContainer'>  <i className="fa-solid fa-xmark closeSearchContainerButton" onClick={() => {
            setSearchVisible(false);
            setSearch("");
          }}></i></div>
          {
            findProduct.length > 0 ? <>
              {
                findProduct.map((products) => {
                  return <div className='searchResultBox' key={products.id}>
                    <img src={products.images[0]} alt="productImage" className={`SearchProductImage`} />
                    <p className="SearchedProdcut--price">
                      <span className="Dprice">₹{products.Dprice}</span>
                      <span className="DiscountPercentage">{products.discountPercentage}%off</span>
                    </p>
                    <p className="searchedProductRating">{products.rating}<i className="fa-solid fa-star"></i></p>
                    <Link to={`/product/${products.title.slice(0, 18)}-${products.id}`} className='searchProductViewLink' onClick={() => {
                      setSearchVisible(false); setSearch("")
                    }}>Details </Link>
                  </div>
                })
              }
            </> 
            : 
            <p className='outOfStockMessage'> Product not Found</p>
          }
        </div>
      }
    </>
  )
}
export default Header;
