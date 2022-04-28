import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import { db } from '../../../Database/firebase';
import { addDoc,collection } from 'firebase/firestore';
import '../DementiaKit/Kit.css'

function AddKit() {
  
  const kitCollectionRef = collection(db, "Kit");
  const [newKit, setKit] = useState();
  const [newdesc, setDesc] = useState();
  const [newamt, setAmt] = useState();
  const naviagte = useNavigate();

  const createKit = async (e) =>{
    e.preventDefault();
    try{
      await addDoc(kitCollectionRef, {Name: newKit, Description: newdesc, Quantity: newamt });
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
          <input type="file" className="form-control-file" id="KitPictures" />
        </div>
        
        <Button className='submit' type='submit' >Submit</Button>
        <Button className= 'back-action' href='/Kit'>Back</Button>
        <br />
        
      </form>
    </div>
  )
}

export default AddKit
