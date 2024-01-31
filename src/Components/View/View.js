import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../Store/ViewPostContext';
import { collection, getDocs,  getFirestore,  query, where } from 'firebase/firestore';
import { Firebase } from '../../Firebase/Config';


function View() {
  const [userDetails, setUserDetails] = useState({});
  const { postDetails } = useContext(PostContext);

  

  useEffect(() => {
  const fetchData = async () => {
    try {
      const firestore = getFirestore(Firebase);
      const q = query(
        collection(firestore, 'users'),
        where('userId', '==', postDetails.userId) 
      );

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => doc.data());

      if (data.length > 0) {
        setUserDetails(data[0]);
      } 
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  fetchData();
}, [postDetails.userId]);




  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.imageURL} alt="Product" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>

        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.userDisplay}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}

export default View;
