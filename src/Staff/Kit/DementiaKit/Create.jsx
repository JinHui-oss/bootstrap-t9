// CSS 
import '../DementiaKit/Kit.css'

// React
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'

// Firebase initial config
import { db, storage } from '../../../Database/firebase';

// Firebase features 
import { ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

// Random unique id 
import { v4 } from 'uuid'


function AddKit() {
  // create and stored the data into the firebase
  const kitCollectionRef = collection(db, "Kit");
  
  // retrieve the data from the user input and stored into variable
  const [newKit, setKit] = useState();
  const [newdesc, setDesc] = useState();
  const [newamt, setAmt] = useState();
  const [ImageUpload, setImageUpload] = useState(null);
  const navigate = useNavigate();

  const createKit = async (e) =>{
    // prevent the button from being spammed when there is no data
    e.preventDefault();
    
    //
    try{
      // check the condition if there is no photo uploaded to server
      if(ImageUpload == null)return;
      // set the specific path of where the photo is stored thru variable
      const imageRef = ref(storage, `Staff/Kit/${ImageUpload.name + v4()}`)
      // upload directly to storage database
      uploadBytes(imageRef, ImageUpload).then(() =>{
          alert("image upload")
      })
      // upload directly to cloud firestore database & return back to kit page
      await addDoc(kitCollectionRef, 
        {
          Name: newKit, 
          Description: newdesc,
          Quantity: newamt,
          //PhotoUrl: ImageUpload 
        });
      navigate("Kit")
      }  
    
    // catch error messages and displayed to the users
    catch(e){
      console.log(e.message);
    }
  }

  // display the form for the user to input for dementia kit
  return (
    <div className="content">
      <h2>Kit Infomation</h2>
      <hr />
      
      <form onSubmit={createKit} className='input'> 
        <div className="form-group">
          <label htmlFor='KitName'>Name </label>
          <input type="text" onChange={(event) => {
          setKit(event.target.value);
        }} 
        className="form-control" 
        id="KitName" 
        placeholder="Dementia Kit xx - example"
        required />
        </div>

        <div className="form-group">
          <label htmlFor="KitQuantity">Quantity </label>
          <input type="number" onChange={(event) => {
          setAmt(event.target.value);
          }} 
          className="form-control" 
          id="KitQuantity" 
          placeholder="1" 
          required />
        </div>
        
        <div className="form-group">
          <label htmlFor="KitDescription">Description</label>
          <textarea className="form-control"onChange={(event) => {
            setDesc(event.target.value)
          }}  
          id="KitDescription" 
          rows="3" 
          placeholder='Kit Content' 
          required >
          </textarea>
        </div>
       
        <div className ="form-pic">
          <label htmlFor="KitPictures">Kit Pictures</label>
          <br />
          <input type="file" onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }} className="form-control-file"  />
        </div>
        
        {/* Submit form when user completed the form */}
        <Button className='submit' type='submit' >Submit</Button>
        
        {/* Return back to the kit page */}
        <Button className= 'back-action' href='/Kit'>Back</Button>
        <br />
        
      </form>
    </div>
  )
}

export default AddKit
