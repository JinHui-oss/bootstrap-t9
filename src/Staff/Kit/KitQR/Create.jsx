import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { QRCodeSVG } from 'qrcode.react'
import '../KitQR/KitQR.css'
import { useNavigate } from 'react-router-dom'

import { db } from '../../../Database/firebase'
import { collection, addDoc } from 'firebase/firestore'

function QRCreate() {
  // create and stored the data into the firestore
  const QRCollection = collection(db, "KitQR")
  const naviagte = useNavigate();

  // retrieve the data from the user input and stored into variable.
  const [name, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  
  // add records directly to the firestore
  const NewData = async(e) =>{
    try{
      e.preventDefault();
      await addDoc(QRCollection, 
        { 
          KitName: name, 
          Quantity: amount,
          StartDate: startdate,
          EndDate: enddate,
          PhoneNumber:phone,
          Email: email,
        });
      naviagte("/kit")
    }
    catch(e){
      console.log(e.message)
    }
  }
  NewData()

  return (
    <div className='create-body'>
      <div className='header'>
        <h2>Create Kit QR</h2>
        <p>Create a QR Code for the dementia Kits tracking</p>
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

        <label htmlFor='Number of Kits'>Amount of Kit Loaned </label>
          <input type="number" onChange={(event) => {
          setAmount(event.target.value);
        }} 
        className="form-control" 
        id="KitName" 
        placeholder="2"
        required />

        <label htmlFor='Start Date'>Start Date </label>
          <input type="Date" onChange={(event) => {
          setStartDate(event.target.value);
        }} 
        className="form-control" 
        id="KitStartDate" 
        required />

        <label htmlFor='End Date'>End Date </label>
          <input type="Date" onChange={(event) => {
          setEndDate(event.target.value);
        }} 
        className="form-control" 
        id="KitStartDate" 
        required />

        <label htmlFor='Phone Number'>Phone Number </label>
          <input type="number" onChange={(event) => {
          setPhone(event.target.value);
        }} 
        className="form-control" 
        id="KitPhone"
        placeholder='82109871' 
        required />
        
        <label htmlFor='Email'>Email </label>
          <input type="email" onChange={(event) => {
          setEmail(event.target.value);
        }} 
        className="form-control" 
        id="KitEmail"
        placeholder='abc@gmail.com' 
        required />
        <div className='QR-Code'>
          <h1 className='head'>QR Code</h1>
          <hr />
          <br />
          <QRCodeSVG value=
          {
            "Name:" + name + "\n" +
            "Amount Of Kit Loaned:"+ amount  + " " +
            "Start Date:"+ startdate + " " + 
            "End Date: "+ enddate + " " +
            "Phone Number:"+ phone + " " +
            "Email:" + email
          } size={250} className="qr"/>
        </div>
        <br />
        <br />
        <Button className= "Action" type="submit"> Submit </Button>
        <Button className= "Back-Action" href="/QRIndex">Back</Button>
        </Form>
      </div>
    </div>
  )
}

export default QRCreate
