import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Loader from './Loader';
import Slider from './Slider';
import axios from 'axios';

const corousel = [
  { corouselImg: 'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/e241ff89ba654f6f.jpg?q=20' },

  { corouselImg: 'https://themewagon.com/wp-content/uploads/2021/12/famms-1.png' },

  { corouselImg: 'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/89c73e9f2b02fdae.jpg?q=20' },

  { corouselImg: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Toys/HTL2023/GW/Homepage_DesktopHeroTemplate_3000x1200_Unrec._CB570906581_.jpg' },

  { corouselImg: 'https://i.pinimg.com/736x/b6/89/96/b68996b0aeb13339740f961ada455a77.jpg' },

  { corouselImg: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww' }
];


function Home() {
  const [productData, setProductData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const length = corousel.length;

  useEffect(() => {
    setLoading(true)
    axios.get("https://ecom-backend-t7c9.onrender.com/").then((res) => {
      setProductData(res.data);
      setLoading(false)
    });
  }, []);

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

 const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  useEffect(() => {
    const slideInterval = setInterval(() => {
      current === length - 1 ? setCurrent(0) : setCurrent(current + 1);
    }, 3000)
    return () => clearInterval(slideInterval)
  }, [current, length])

  return (
    <section>
      <h1 className='affer-day'>Big Billion Day</h1>
      <div className="SliderContainer">
        <i className="fa-solid fa-arrow-left arrow LeftArrow" onClick={prevSlide}></i>
        <i className="fa-solid fa-arrow-right arrow RightArrow" onClick={nextSlide}></i>
        {
          corousel.map((data, index) => {
            return <div className={index === current ? "SliderImg-Box active" : "SliderImg-Box"} key={index}>
              <img src={data.corouselImg} alt="SliderPostereImg" className='SliderPoster' />
            </div>
          })
        }
      </div>
      <div className="bestSellerContainer">
        <h1 className='containerHeading'>Best Seller</h1>
        {
          Loading ? <h3>Loading...</h3> : <div className="productContainer">
            <div className='productBox'>
              <img src={productData[0]?.images[0]} alt="" className={`${productData[0]?.category}Image CommonImage`} />
              <span className='productRatingLabel'>{productData[0]?.rating}<i className="fa-solid fa-star"></i></span>
              <div className="productDetailsContainer">
                <p className="productTitle">{productData[0]?.title.slice(0, 20)}...</p>

                <div className="productPriceBox">
                  <span className="Dprice">₹{productData[0]?.Dprice}</span>
                  <span className="Aprice">₹{productData[0]?.Aprice}</span>
                  <span className="DiscountPercentage">{productData[0]?.discountPercentage}%off</span>
                </div>

                <Link to={`/product/${productData[0]?.title.slice(0, 18)}-${productData[0]?.id}`} className='viewProductDetailsLink'>See</Link>
              </div>
            </div>

            <div className='productBox'>
              <img src={productData[5]?.images[0]} alt="" className={`${productData[0]?.category}Image CommonImage`} />
              <span className='productRatingLabel'>{productData[5]?.rating}<i className="fa-solid fa-star"></i></span>
              <div className="productDetailsContainer">
                <p className="productTitle">{productData[5]?.title.slice(0, 20)}...</p>

                <div className="productPriceBox">
                  <span className="Dprice">₹{productData[5]?.Dprice}</span>
                  <span className="Aprice">₹{productData[5]?.Aprice}</span>
                  <span className="DiscountPercentage">{productData[5]?.discountPercentage}%off</span>
                </div>

                <Link to={`/product/${productData[5]?.title.slice(0, 18)}-${productData[5]?.id}`} className='viewProductDetailsLink'>See</Link>
              </div>
            </div>
            <div className='productBox'>
              <img src={productData[11]?.images[0]} alt="" className={`${productData[11]?.category}Image CommonImage`} />
              <span className='productRatingLabel'>{productData[11]?.rating}<i className="fa-solid fa-star"></i></span>
              <div className="productDetailsContainer">
                <p className="productTitle">{productData[11]?.title.slice(0, 20)}...</p>
                <div className="productPriceBox">
                  <span className="Dprice">₹{productData[11]?.Dprice}</span>
                  <span className="Aprice">₹{productData[11]?.Aprice}</span>
                  <span className="DiscountPercentage">{productData[0]?.discountPercentage}%off</span>
                </div>

                <Link to={`/product/${productData[11]?.title.slice(0, 18)}-${productData[11]?.id}`} className='viewProductDetailsLink'>See</Link>
              </div>
            </div>

            <div className='productBox'>
              <img src={productData[15]?.images[0]} alt="" className={`${productData[15]?.category}Image CommonImage`} />
              <span className='productRatingLabel'>{productData[15]?.rating}<i className="fa-solid fa-star"></i></span>
              <div className="productDetailsContainer">
                <p className="productTitle">{productData[15]?.title.slice(0, 20)}...</p>

                <div className="productPriceBox">
                  <span className="Dprice">₹{productData[15]?.Dprice}</span>
                  <span className="Aprice">₹{productData[15]?.Aprice}</span>
                  <span className="DiscountPercentage">{productData[15]?.discountPercentage}%off</span>
                </div>

                <Link to={`/product/${productData[15]?.title.slice(0, 18)}-${productData[15]?.id}`} className='viewProductDetailsLink'>See</Link>
              </div>
            </div>

            <div className='productBox'>
              <img src={productData[16]?.images[0]} alt="" className={`${productData[16]?.category}Image CommonImage`} />
              <span className='productRatingLabel'>{productData[16]?.rating}<i className="fa-solid fa-star"></i></span>
              <div className="productDetailsContainer">
                <p className="productTitle">{productData[16]?.title.slice(0, 20)}...</p>

                <div className="productPriceBox">
                  <span className="Dprice">₹{productData[16]?.Dprice}</span>
                  <span className="Aprice">₹{productData[16]?.Aprice}</span>
                  <span className="DiscountPercentage">{productData[16]?.discountPercentage}%off</span>
                </div>

                <Link to={`/product/${productData[16]?.title.slice(0, 18)}-${productData[16]?.id}`} className='viewProductDetailsLink'>See</Link>
              </div>
            </div>

            <div className='productBox'>
              <img src={productData[21]?.images[0]} alt="" className={`${productData[21]?.category}Image CommonImage`} />
              <span className='productRatingLabel'>{productData[21]?.rating}<i className="fa-solid fa-star"></i></span>
              <div className="productDetailsContainer">
                <p className="productTitle">{productData[21]?.title.slice(0, 20)}...</p>

                <div className="productPriceBox">
                  <span className="Dprice">₹{productData[21]?.Dprice}</span>
                  <span className="Aprice">₹{productData[21]?.Aprice}</span>
                  <span className="DiscountPercentage">{productData[21]?.discountPercentage}%off</span>
                </div>
                <Link to={`/product/${productData[21]?.title.slice(0, 18)}-${productData[21]?.id}`} className='viewProductDetailsLink'>See</Link>
              </div>
            </div>

            <div className='productBox'>
              <img src={productData[29]?.images[0]} alt="" className={`${productData[29]?.category}Image CommonImage`} />
              <span className='productRatingLabel'>{productData[29]?.rating}<i className="fa-solid fa-star"></i></span>
              <div className="productDetailsContainer">
                <p className="productTitle">{productData[29]?.title.slice(0, 20)}...</p>

                <div className="productPriceBox">
                  <span className="Dprice">₹{productData[29]?.Dprice}</span>
                  <span className="Aprice">₹{productData[29]?.Aprice}</span>
                  <span className="DiscountPercentage">{productData[29]?.discountPercentage}%off</span>
                </div>
                <Link to={`/product/${productData[29]?.title.slice(0, 18)}-${productData[29]?.id}`} className='viewProductDetailsLink'>See</Link>
              </div>
            </div>

            <div className='productBox'>
              <img src={productData[31]?.images[0]} alt="" className={`${productData[31]?.category}Image CommonImage`} />
              <span className='productRatingLabel'>{productData[31]?.rating}<i className="fa-solid fa-star"></i></span>
              <div className="productDetailsContainer">
                <p className="productTitle">{productData[31]?.title.slice(0, 20)}...</p>

                <div className="productPriceBox">
                  <span className="Dprice">₹{productData[31]?.Dprice}</span>
                  <span className="Aprice">₹{productData[31]?.Aprice}</span>
                  <span className="DiscountPercentage">{productData[31]?.discountPercentage}%off</span>
                </div>
                <Link to={`/product/${productData[31]?.title.slice(0, 18)}-${productData[31]?.id}`} className='viewProductDetailsLink'>See</Link>
              </div>
            </div>

            <div className='productBox'>
              <img src={productData[36]?.images[0]} alt="" className={`${productData[36]?.category}Image CommonImage`} />
              <span className='productRatingLabel'>{productData[36]?.rating}<i className="fa-solid fa-star"></i></span>
              <div className="productDetailsContainer">
                <p className="productTitle">{productData[36]?.title.slice(0, 20)}...</p>

                <div className="productPriceBox">
                  <span className="Dprice">₹{productData[36]?.Dprice}</span>
                  <span className="Aprice">₹{productData[36]?.Aprice}</span>
                  <span className="DiscountPercentage">{productData[29]?.discountPercentage}%off</span>
                </div>
                <Link to={`/product/${productData[36]?.title.slice(0, 18)}-${productData[36]?.id}`} className='viewProductDetailsLink'>See</Link>
              </div>
            </div>

            <div className='productBox'>
              <img src={productData[43]?.images[0]} alt="" className={`${productData[43]?.category}Image CommonImage`} />
              <span className='productRatingLabel'>{productData[43]?.rating}<i className="fa-solid fa-star"></i></span>
              <div className="productDetailsContainer">
                <p className="productTitle">{productData[43]?.title.slice(0, 20)}...</p>

                <div className="productPriceBox">
                  <span className="Dprice">₹{productData[43]?.Dprice}</span>
                  <span className="Aprice">₹{productData[43]?.Aprice}</span>
                  <span className="DiscountPercentage">{productData[43]?.discountPercentage}%off</span>
                </div>
                
                <Link to={`/product/${productData[43]?.title.slice(0, 18)}-${productData[43]?.id}`} className='viewProductDetailsLink'>See</Link>
              </div>
            </div>
          </div>
        }
      </div>
      <div className="posterContainer">
        <img src="https://www.slideteam.net/media/catalog/product/cache/1280x720/b/u/business_advertising_powerpoint_presentation_slides_Slide01.jpg" alt="homePoster" className='homePoster' />
        <button className='showNowButton' onClick={() => navigate('products/All')}>Shop Now</button>
      </div>

      <div className="serviceCardContainer">

        <div className="serviceCard">
          <i className="fa-solid fa-truck-fast serviceIcon"></i>
          <h3 className='serviceTitle'>FREE SHIPPING</h3>
          <p className='serviceDes'>free shopping for customers focuses on creating a consumer-friendly environment, removing barriers to entry, and providing added value through promotions and transparent pricing. It encourages customers to explore products without financial constraints, fostering a positive relationship between the customer and the online shopping platform.</p>
        </div>

        <div className="serviceCard">
          <i class="fa-solid fa-ear-listen serviceIcon"></i>
          <h3 className='serviceTitle'>SUPPORT 24/7</h3>
          <p className='serviceDes'>customer support in online shopping goes beyond addressing issues; it aims to enhance the overall customer experience by providing information, guidance, and assistance at every step of the shopping journey. An effective customer support team contributes significantly to building trust and loyalty among online shoppers.</p>
        </div>

        <div className="serviceCard">
          <i class="fa-solid fa-jet-fighter serviceIcon"></i>
          <h3 className='serviceTitle'>100% REFUND</h3>
          <p className='serviceDes'>Retailers with a 100% refund policy often use customer feedback gathered through returns to improve their products or services. This feedback loop contributes to the ongoing enhancement of the overall shopping experience.</p>
        </div>

        {/* <div className="serviceCard">
          <i className="fa-solid fa-user-lock serviceIcon"></i>
          <h3 className='serviceTitle'>Secure Payment</h3>
          <p className='serviceDes'>Rest easy knowing that your sensitive payment information is safeguarded by state-of-the-art encryption technology. Our Secure Payment Gateway employs the highest security standards to protect your data from unauthorized access.</p>
        </div> */}
      </div>
      <div className="featuredProductContainer">
        <h1 className='containerHeading'>BRAND SELLER</h1>
        {
          Loading ? <h3>Loading...</h3> : <Slider />
        }
      </div>
    </section>
  )
}
export default Home;
