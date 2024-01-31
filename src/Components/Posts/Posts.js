import React, { useContext, useEffect, useState } from "react";
import Heart from "../../assets/Heart";
import "../../Components/Posts/Posts.css";
import { FireBaseContext } from "../../Store/FirebaseContext";
import {PostContext} from '../../Store/ViewPostContext'
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Posts() {
  const { firebase } = useContext(FireBaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const Navigate = useNavigate();


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const firestore = getFirestore(firebase);
        const productsCollection = collection(firestore, "products");

        const querySnapshot = await getDocs(productsCollection);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [firebase]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product, index) => {
            return (
              <div
                className="card"
                onClick={() => {
                  setPostDetails(product)
                  Navigate("/view");
                }}
              >

                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.imageURL} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name"> {product.name}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="hello" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
