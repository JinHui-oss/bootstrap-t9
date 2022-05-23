import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { QRCodeCanvas } from 'qrcode.react'
import '../KitQR/KitQR.css'
import { useNavigate } from 'react-router-dom'

import { db, storage } from '../../../Database/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, } from 'firebase/firestore'

// Random unique id 
import { v4 } from 'uuid'


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
  const [ImageUpload, setImageUpload] = useState();
  
  // add records directly to the firestore
  const NewData = async(e) =>{
    e.preventDefault();
    //
    let date = new Date();

    try{
      if(ImageUpload == null)return;
      // set the specific path of where the photo is stored thru variable
      const imageRef = ref(storage, `Staff/KitQR/${ImageUpload.name + v4()}`)
      // upload directly to storage database
      uploadBytes(imageRef, ImageUpload).then((snapshot) =>{
       
        getDownloadURL(snapshot.ref).then((url) => {
         // upload directly to cloud firestore database & return back to kit page
        addDoc(QRCollection, 
        { 
            KitName: name, 
            Quantity: amount,
            StartDate: startdate,
            EndDate: enddate,
            PhoneNumber:phone,
            Email: email,
            PhotoUrl: url,
            CreatedAt: date.toDateString()
        });
        alert("image upload")
        })
      });
      naviagte("/QRIndex")
    }
    catch(e){
      console.log(e.message)
    }
  }
  const downloadQR = () => {
    const canvas = document.getElementById("Dementia Kit");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "Dementia Kit.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
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
          <QRCodeCanvas value=
          {
            "Name:" + name + "\n" +
            "Amount Of Kit Loaned:"+ amount  + " " +
            "Start Date:"+ startdate + " " + 
            "End Date: "+ enddate + " " +
            "Phone Number:"+ phone + " " +
            "Email:" + email
          } size={250} className="qr" id="Dementia Kit" />
        </div>
        <br />
        <div className ="form-pic">
          <label className="KitPictures">Kit Pictures</label>
          <br />
          <input type="file" onChange={(event) => {
           setImageUpload(event.target.files[0]);
          }} className="form-control-file"  />
        </div>
        <br />
        <br />
        <Button className= "Action" type="submit"> Submit </Button>
        <Button className= "Back-Action" href="/QRIndex">Back</Button>
        <Button className= "Download-Action" onClick={downloadQR}>Download QR</Button>
        </Form>
      </div>
    </div>
  )
}

export default QRCreate
