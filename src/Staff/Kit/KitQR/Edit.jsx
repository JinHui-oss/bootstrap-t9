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
  const [ImageUpload, setImageUpload] = useState();
  const [Filename, setFilename] = useState("");

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
      const imageRef = ref(storage, `Staff/KitQR/${ImageUpload.name}`)
      // upload directly to storage database
      uploadBytes(imageRef, ImageUpload).then((snapshot) =>{
       
        getDownloadURL(snapshot.ref).then((url) => {
         // upload directly to cloud firestore database & return back to kit page
        updateDoc(QRCollection, 
        { 
            id: id,
            KitName: name, 
            Filename: Filename,
            PhotoUrl: url,
            CreatedAt: date.toDateString()
        });
        alert("image upload")
        })
      });
      naviagte("/Staff/QRIndex")
    }
    catch(e){
      // Catch Error Message
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
    downloadLink.download = name + ".png" ;
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
          <div className='editkitname-data'>
            <label htmlFor='KitName'>Name </label>
            <input type="text" onChange={(event) => {
            setText(event.target.value);
            }} 
            className="form-control" 
            id="KitName" 
            placeholder="Dementia Kit xx - example"
            required defaultValue={kitqr.KitName}/>

<label className="KitPictures">Kit Pictures</label>
          <br />
          <input type="file" onChange={(event) => {
            setImageUpload(event.target.files[0],
            setFilename(event.target.files[0].name));
          }} className="form-control-file"  />
          </div>
        
  
        <div className ="form-pic">
         
        </div>
       
        <div className='QR-Code'>
          <br />
          <QRCodeCanvas value=
          {
            "Name:" + name + "\n" 
          }  className="editkit-qr" id="Dementia Kit" />
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

export default QREdit
