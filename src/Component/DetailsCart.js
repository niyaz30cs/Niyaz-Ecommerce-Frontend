import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
// import Loader from './Loader';
import axios from 'axios';
import { addToCart } from '../ReduxSlice/CartSlice';

function DetailsCart() {
  const { LoggedIn} = useSelector((state) => state.User);
  const [currentData, setCurrentData] = useState("");
  const ProductID = useParams().title.split("-")[1];
  const [currentProduct, setCurrentProduct] = useState([]);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true)
    axios.get(`https://ecom-backend-t7c9.onrender.com/product/${ProductID}`).then((res) => {
      setCurrentProduct(res.data);
      setCurrentData(res.data[0].images[0])
      setLoading(false);
    })

  }, [ProductID]);

  const handleAddToCartFun = (product) => {
    if (LoggedIn) {
      toast.success('Item Added Successfully', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(addToCart(product))
    } else {
      toast.error('Permission Denied! First Sign In', {
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

  const handleClick = (e) => {
    setCurrentData(e.target.src)
  }
  return (
    <>
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
      <section className='ProductFullDetailsContainer'>
        {
          Loading ? <h3>Loading...</h3> : <>
            <div className="Product--pictureContainer">
              <img src={currentData} alt="ProductPoster" className={`${currentProduct[0]?.category}currentImage currentImage`} />
              <div className="MoreImageContainer">
                {
                  currentProduct[0]?.images.map((images, index) => {
                    return <div className='imageBox' key={index}>
                      <img src={images} alt="MoreImages" className='MoreImage' onClick={handleClick} />
                    </div>
                  })
                }
              </div>
            </div>

            <div className="Product--DetailsContainer">
              <h2 className='currentProduct--title'>{currentProduct[0]?.title}</h2>
              <p className="currentProduct--rating">{currentProduct[0]?.rating}<i className="fa-solid fa-star"></i></p>

              <p className="currentPrduct--price">
                <span className="Dprice">₹{currentProduct[0]?.Dprice}</span>
                <span className="Aprice">₹{currentProduct[0]?.Aprice}</span>
                <span className="DiscountPercentage">{currentProduct[0]?.discountPercentage}%off</span>
              </p>

              <div className="itemCountContainer">
                <button className='addToCartButton' onClick={() => handleAddToCartFun(currentProduct[0])}>Add To Cart</button>
              </div>

              <p className='currentPrduct--discription'>
                Description : {currentProduct[0]?.description}
              </p>
            </div>
          </>
        }
      </section>
    </>
  )
}

export default DetailsCart;
