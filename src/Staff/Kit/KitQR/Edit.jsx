import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { QRCodeCanvas } from 'qrcode.react'
 // import { QRCodeCanvas } from 'qrcode.react'
import '../KitQR/KitQR.css'
import { useNavigate, useParams } from 'react-router-dom'

import { db, storage } from '../../../Database/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, collection, getDoc } from 'firebase/firestore'

// Random unique id 
import { v4 } from 'uuid'

function QREdit() {
  
  const { id } = useParams();
  // create and stored the data into the firestore
  const QRCollection = doc(db, "KitQR", id)
  const naviagte = useNavigate();

  // retrieve the data from the user input and stored into variable.
  const [name, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [ImageUpload, setImageUpload] = useState();

   //
   const [kitqr,setKitqr] = useState([]);
   const kitCollectionRef = collection(db, "KitQR");
 
   //
   useEffect(() => {
     const getKit = async () => {
       const docRef = doc(db, "KitQR", id);
       const docSnap = await getDoc(docRef);
       
       // check for display output
       // console.log(docSnap);
       
       // check condition
       if (docSnap.exists()) 
       {
         // display the output if the record exist 
         // create a variable to store the data output.
         let data =  docSnap.data();
         // console.log(data)
         
         setKitqr.state ={
          KitName: data.KitName,
          Quantity: data.Quantity,
          StartDate: data.StartDate,
          EndDate: data.EndDate,
          PhotoUrl: data.PhotoUrl,
          PhoneNumber: data.PhoneNumber,
          Email: data.Email
           
         }
         // reterive the data and stored into a setkit
         setKitqr(setKitqr.state)
        
         // check for the display output
         // console.log(setKit.state)
         
       } 
       else 
       {
         // doc.data() will be undefined in this case
         console.log("No such document!");
       }
 
     };
     getKit();
 
   // eslint-disable-next-line 
   }, [kitCollectionRef])
    
  
  // add records directly to the firestore
  const NewData = async(e) =>{
    try{
      e.preventDefault();
      let date = new Date();
      if(ImageUpload == null)return;
      // set the specific path of where the photo is stored thru variable
      const imageRef = ref(storage, `Staff/KitQR/${ImageUpload.name + v4()}`)
      // upload directly to storage database
      uploadBytes(imageRef, ImageUpload).then((snapshot) =>{
       
        getDownloadURL(snapshot.ref).then((url) => {
         // upload directly to cloud firestore database & return back to kit page
        updateDoc(QRCollection, 
        { 
            id: id,
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
    <div className='edit-body'>
      <div className='header'>
        <h2>Edit Kit QR</h2>
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
        required defaultValue={kitqr.KitName}/>

        <label htmlFor='Number of Kits'>Amount of Kit Loaned </label>
          <input type="number" onChange={(event) => {
          setAmount(event.target.value);
        }} 
        className="form-control" 
        id="KitName" 
        placeholder="2"
        required defaultValue={kitqr.Quantity}/>

        <label htmlFor='Start Date'>Start Date </label>
          <input type="Date" onChange={(event) => {
          setStartDate(event.target.value);
        }} 
        className="form-control" 
        id="KitStartDate" 
        defaultValue={kitqr.StartDate}
        required />

        <label htmlFor='End Date'>End Date </label>
          <input type="Date" onChange={(event) => {
          setEndDate(event.target.value);
        }} 
        className="form-control" 
        id="KitStartDate"
        defaultValue={kitqr.EndDate} 
        required />

        <label htmlFor='Phone Number'>Phone Number </label>
          <input type="number" onChange={(event) => {
          setPhone(event.target.value);
        }} 
        className="form-control" 
        id="KitPhone"
        defaultValue={kitqr.PhoneNumber} defaultChecked={kitqr.PhoneNumber}
        placeholder='82109871' 
        required />
        
        <label htmlFor='Email'>Email </label>
          <input type="email" onChange={(event) => {
          setEmail(event.target.value);
        }} 
        className="form-control" 
        id="KitEmail"
        defaultValue={kitqr.Email}
        placeholder='abc@gmail.com' 
        required />
  
        <div className ="form-pic">
          <label className="KitPictures">Kit Pictures</label>
          <br />
          <input type="file" onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }} className="form-control-file"  />
        </div>
       
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
        <br />
        <Button className= "Action" type="submit"> Submit </Button>
        <Button className= "Back-Action" href="/QRIndex">Back</Button>
        <Button className= "Download-Action" onClick={downloadQR}>Download QR</Button>
        </Form>
      </div>
    </div>
  )
}

export default QREdit
