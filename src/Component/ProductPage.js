import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
// import Loader from './Loader';

function ProductPage() {
    const [productAll, setproductAll] = useState([]);
    const [productData, setProductData] = useState([]);
    const [Loading, setLoading] = useState(false);
    const currentCategory = useParams().category;
    const brandName = [];

    useEffect(() => {
        setLoading(true);
        axios.get("https://ecom-backend-t7c9.onrender.com/").then((res) => {
            setproductAll(res.data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        setProductData(productAll.filter((product) => currentCategory === 'All' ? product : product.category === currentCategory))
    }, [currentCategory, productAll]);

    productAll.filter((item) => currentCategory === 'All' ? item.brand : item.category === currentCategory).forEach((item) => {
        if (currentCategory === 'All') {
            if (!brandName.includes(item.category)) {
                brandName.push(item.category)
            }
        } else {
            if (!brandName.includes(item.brand)) {
                brandName.push(item.brand)
            }

        }
    });

    const handleFliterClick = (event) => {
        const filterContainer = document.querySelector('.filterContainer');
        const filterIcon = document.querySelector('.filterIcon');
        filterContainer.classList.remove("activeFilterContainer");
        filterIcon.classList.remove("fa-xmark");

        if (event.target.textContent === "All") {
            setProductData(productAll.filter((product) => currentCategory === 'All' ? product : product.category === currentCategory))
        } else {
            if (currentCategory === 'All') {
                setProductData(productAll.filter((product) => product.category === event.target.textContent))
            } else {
                setProductData(productAll.filter((product) => product.brand === event.target.textContent))
            }
        }
    }

    return (
        <section className='ProductPageContainer'>
            <aside className='filterContainer'>
                <h3 className="filterContainer--Heading">Category</h3>
                <p className="filterContainer--filterbrandName" onClick={handleFliterClick} >All</p>
                {
                    brandName.map((index) => {
                        return <p className="filterContainer--filterbrandName" key={index} onClick={handleFliterClick} >{index}</p>
                    })
                }

            </aside>
            <div className="productContainer  ShowProduct-ProductContainer">
                {
                    Loading ?<h3>Loading...</h3> : <ShowProduct product={productData} />
                }
            </div>
        </section>
    )
}

export default ProductPage;


function ShowProduct(props) {
    const productData = props.product;
    const handleFilterClick = () => {
        const filterContainer = document.querySelector('.filterContainer');
        const filterIcon = document.querySelector('.filterIcon');
        filterContainer.classList.toggle("activeFilterContainer");
        filterIcon.classList.toggle("fa-xmark")
    }
    return (

        <>
            <button className='filterProductButton' onClick={handleFilterClick}><i className="fa-solid fa-filter filterIcon"></i></button>
            {
                productData.length > 0 ? productData.map((product) => {
                    return <div className='productBox' key={product.id}>
                        <img src={product.images[0]} alt="" className={`${productData[0].category}Image CommonImage`} />
                        <span className='productRatingLabel'>{product.rating}<i className="fa-solid fa-star"></i></span>
                        <div className="productDetailsContainer">
                            <p className="productTitle">{product.title.slice(0, 20)}...</p>
                            <div className="productPriceBox">
                                <span className="Dprice">₹{product.Dprice}</span>
                                <span className="Aprice">₹{product.Aprice}</span>
                                <span className="DiscountPercentage">{product.discountPercentage}%off</span>
                            </div>
                            <Link to={`/product/${product.brand}-${product.id}`} className='viewProductDetailsLink'>See</Link>
                        </div>
                    </div>
                }) : <p className='outOfStockMessage'>Out-Of-Stock</p>
            }
        </>
    );
}