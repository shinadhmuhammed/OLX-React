import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FireBaseContext, AuthContext } from "../../Store/FirebaseContext";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  Firestore,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { Firebase } from "../../Firebase/Config";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const { firebase } = useContext(FireBaseContext);
  const [imageUrl, setImageUrl] = useState("");
  const { user } = useContext(AuthContext);
  const firestore = getFirestore(Firebase);
  const navigate = useNavigate();
  const date = new Date().toDateString();

  const handleSubmit = async () => {
    if (!image) {
      console.error("Please select an image");
      return;
    }

    try {
      const storage = getStorage(firebase);
      const storageRef = ref(storage, `/images/${image.name}`);

      const snapshot = await uploadBytes(storageRef, image);

      const imageURL = await getDownloadURL(snapshot.ref);
      setImageUrl(imageURL);
      const productsCollection = collection(firestore, "products");
      await setDoc(doc(productsCollection), {
        name,
        category,
        price,
        userId: user.uid,
        createdAt: date.toString(),
        imageURL: imageURL,
      });
      navigate("/");
    } catch (error) {
      console.error("Error uploading image or saving product:", error);
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="fname"
              name="Name"
              required
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="fname"
              name="category"
              required
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              id="fname"
              name="Price"
              required
            />
            <br />
          </form>
          <br />

          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>
          <br />

          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
