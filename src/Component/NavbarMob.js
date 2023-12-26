import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { userLogOut } from '../ReduxSlice/UserSlice';
import { useSelector, useDispatch } from 'react-redux'
function NavbarMob() {
  const { CurrentUser, isLoggedIn } = useSelector((state) => state.User);
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSideNavClick = () => {
    const navBar = document.querySelector(".sideNavbar");
    const hamMenuBtn = document.querySelector(".hamNavButton");
    navBar.classList.add("hideTabMobileNavBar");
    hamMenuBtn.classList.remove("fa-xmark");
  }

  const handleSideNavCartItemClick = () => {
    if (isLoggedIn) {
      navigate("/cart");
      handleSideNavClick();
    } else {
      toast.warning('You Are Not Logged In', {
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
  const handleLogInclick = () => {
    handleSideNavClick();
  }
  return (

    <>
      <aside className='sideNavbar hideTabMobileNavBar'>
        <div className="sideNavbar--userContainer">
          <div onClick={handleSideNavCartItemClick} className="sideNavbar--cartItemBox"><i className="fa-solid fa-cart-shopping "></i> <span className='sideNavbar--ItmeCount'>{cartTotalQuantity}</span></div>

          <div className="sideNavbar--cartItemBox">
            <div className="cartItemBox--userBox">
              <i className="fa-solid fa-user-tie userIcon"></i>
              <h2 className='UserName'>{CurrentUser?.User[0] ? CurrentUser.User[0].userName.slice(0, 1) : "U"}</h2>
            </div>
          </div>

        </div>

        <NavLink onClick={handleSideNavClick} className='navItem' to={'/'}> Home</NavLink>
        <NavLink onClick={handleSideNavClick} className='navItem' to={`products/mobile`}> Phone</NavLink>
        <NavLink onClick={handleSideNavClick} className='navItem' to={`products/laptop`}> Computer</NavLink>
        <NavLink onClick={handleSideNavClick} className='navItem' to={`products/camera`}> Camera</NavLink>
        <NavLink onClick={handleSideNavClick} className='navItem' to={`products/headphone`}> Headphone</NavLink>
        {isLoggedIn ? <Link className='logButton' onClick={handleLogOut}>LogOut</Link> : <Link className='logButton' onClick={handleLogInclick} to={'/user/login'}>LogIn</Link>}
      </aside>
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
    </>
  )
}
export default NavbarMob;
