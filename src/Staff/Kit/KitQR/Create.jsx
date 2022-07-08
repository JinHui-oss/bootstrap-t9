import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { QRCodeCanvas } from 'qrcode.react'
import '../KitQR/KitQR.css'
import { useNavigate } from 'react-router-dom'

import { db, storage } from '../../../Database/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, } from 'firebase/firestore'

// Random unique id 
// import { v4 } from 'uuid'


function QRCreate() {
  // create and stored the data into the firestore
  const QRCollection = collection(db, "KitQR")
  const naviagte = useNavigate();

  // retrieve the data from the user input and stored into variable.
  const [kitName, setkitName] = useState("");
  const [LoanName, setLoanName] = useState("");
  const [ImageUpload, setImageUpload] = useState();
  const [Filename, setFilename] = useState("");
  
  // add records directly to the firestore
  const NewData = async(e) =>{
    //
    let date = new Date();

    try{
      e.preventDefault();
      if(ImageUpload == null)return;
      // set the specific path of where the photo is stored thru variable
      const imageRef = ref(storage, `Staff/KitQR/${ImageUpload.name}`)
      // upload directly to storage database
      uploadBytes(imageRef, ImageUpload).then((snapshot) =>{
       
        getDownloadURL(snapshot.ref).then((url) => {
         // upload directly to cloud firestore database & return back to kit page
        addDoc(QRCollection, 
        { 
            KitName: kitName,
            PhotoUrl: url,
            CreatedAt: date.toDateString(),
            Filename: Filename
        });
        alert("image upload")
        })
      });
      naviagte("/Staff/QRIndex")
    }
    catch(e){
      // console.log(e.message)
    }
  }
  const downloadQR = () => {
    const canvas = document.getElementById("Dementia Kit");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = kitName +".png";
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
        <label htmlFor='KitName'>Kit Name </label>
          <input type="text" onChange={(event) => {
          setkitName(event.target.value);
        }} 
        className="form-control" 
        id="KitName" 
        placeholder="Dementia Kit xx - example"
        />

        <div className='QR-Code'>
          <h1 className='head'>QR Code</h1>
          <hr />
          <br />
          <QRCodeCanvas value=
          {
            "Name:" + kitName + "\n" 
          } size={250} className="qr" id="Dementia Kit" />
        </div>
        <br />
        <div className ="form-pic">
          <label className="KitPictures">Kit Pictures</label>
          <br />
          <input type="file" onChange={(event) => {
           setImageUpload(event.target.files[0],
            
           setFilename(event.target.files[0].name));
          }} className="form-control-file"  />
        </div>
        <br />
        <br />
        <Button className= "Action" type="submit"> Submit </Button>
        <Button className= "Back-Action" href="/Staff/QRIndex">Back</Button>
        <Button className= "Download-Action" onClick={downloadQR}>Download QR</Button>
        </Form>
      </div>
    </div>
  )
}

export default QRCreate
