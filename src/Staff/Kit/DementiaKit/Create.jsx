import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import { db } from '../../../Database/firebase';
import { addDoc,collection } from 'firebase/firestore';

function AddKit() {
  
  const kitCollectionRef = collection(db, "Kit");
  const [newKit, setKit] = useState();
  const [newdesc, setDesc] = useState();
  const naviagte = useNavigate();

  const createKit = async (e) =>{
    e.preventDefault();
    try{
      await addDoc(kitCollectionRef, {Name: newKit, Description: newdesc });
      naviagte("/kit")
    }
    catch(e){
      console.log(e.message);
    }
  }

  return (
    <div className="content">
      <h2>Kit Infomation</h2>
      <hr />
      
      <form onSubmit={createKit}> 
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
          <input type="number" 
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
       
        <div className ="form-group">
          <label htmlFor="KitPictures">Kit Pictures</label>
          <br />
          <input type="file" className="form-control-file" id="KitPictures" />
        </div>
        
        <Button className='submit' type='submit' >Submit</Button>
        <br />
        
      </form>
    </div>
  )
}

export default AddKit
