import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import '../KitQR/KitQR.css'
import { useNavigate, useParams } from 'react-router-dom'

import { db } from '../../../Database/firebase'
import { doc, updateDoc } from 'firebase/firestore'

function Edit() {
  
  const { id } = useParams();
  // create and stored the data into the firestore
  const QRCollection = doc(db, "Kit", id)
  const naviagte = useNavigate();

  // retrieve the data from the user input and stored into variable.
  const [Name, setText] = useState("");
  const [Description, setDescription] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [CreatedAt, setCreatedAt] = useState("");

  
  // add records directly to the firestore
  const NewData = async(e) =>{
    try{
      e.preventDefault();
      await updateDoc(QRCollection, 
        { 
          Name: Name, 
          Description: Description,
          Quantity: Quantity,
          CreatedAt: CreatedAt

        });
      naviagte("/Kit")
    }
    catch(e){
      console.log(e.message)
    }
  }
  NewData()

  return (
    <div className='create-body'>
      <div className='header'>
        <h2>Edit Dementia Kit </h2>
        <p>You can make changes to the kit once created</p>
        <hr />
      </div>
      <div>
        <Form onSubmit={NewData} className="form-create">
        <label htmlFor='KitName'>Name </label>
          <input type="text" onChange={(event) => {
          setText(event.target.value);
        }} 
        className="form-control" 
        id="KitName" 
        placeholder="Dementia Kit xx - example"
        required />

        <label htmlFor='Number of Kits'>Quantity </label>
          <input type="number" onChange={(event) => {
          setQuantity(event.target.value);
        }} 
        className="form-control" 
        id="KitName" 
        placeholder="2"
        required />

        <label className='Start Date'>Description </label>
          <textarea type="text" onChange={(event) => {
          setDescription(event.target.value);
        }} 
        className="form-control" 
        id="KitStartDate" 
        required />

        <label htmlFor='End Date'>Created Date </label>
          <input type="Date" onChange={(event) => {
          setCreatedAt(event.target.value);
        }} 
        className="form-control" 
        id="KitStartDate" 
        required />
      
        <br />
        <br />
        <Button className= "Action" type="submit"> Submit </Button>
        <Button className= "Back-Action" href="/Kit">Back</Button>
        </Form>
      </div>
    </div>
  )
}

export default Edit
