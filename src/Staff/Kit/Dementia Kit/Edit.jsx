import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import '../KitQR/KitQR.css'
import { useNavigate, useParams } from 'react-router-dom'

import { db, storage } from '../../../Database/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Random unique id 
// import { v4 } from 'uuid'
import 
{ 
  doc, 
  updateDoc, 
  collection,
  getDoc  
} from 'firebase/firestore'

function Edit() {
  
  const { id } = useParams();
  // create and stored the data into the firestore
  const QRCollection = doc(db, "Kit", id)
  const naviagte = useNavigate();

  // retrieve the data from the user input and stored into variable.
  const [Name, setText] = useState("");
  const [Description, setDescription] = useState("");
  const [Quantity, setQuantity] = useState("");
  // eslint-disable-next-lin
  const [ImageUpload,setImageUpload] = useState("");
  
  //
  const [kit,setKit] = useState([]);
  const kitCollectionRef = collection(db, "Kit");

  //
  useEffect(() => {
    const getKit = async () => {
      const docRef = doc(db, "Kit", id);
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
        
        setKit.state ={
          Name: data.Name,
          Description: data.Description,
          Quantity: data.Quantity,
          CreatedAt: data.CreatedAt,
          PhotoUrl: data.PhotoUrl
          
        }
        // reterive the data and stored into a setkit
        setKit(setKit.state)
       
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
      let date = new Date();
      e.preventDefault();
     
        // set the specific path of where the photo is stored thru variable
        const imageRef = ref(storage, `Staff/Kit/${ImageUpload.name}`)
        // upload directly to storage database
        uploadBytes(imageRef, ImageUpload).then((snapshot) =>{
          // check the condition if there is no photo uploaded to server
     
          getDownloadURL(snapshot.ref).then((url) => {
            if(ImageUpload === null)return true;
            updateDoc(QRCollection, 
              { 
                id: id,
                Name: Name, 
                Description: Description,
                Quantity: Quantity,
                CreatedAt: date.toDateString(),
                CreatedDate: date.toDateString()
              });
            alert("Records has been updated successfully, Returning to Kit page.")
          })
        });
      naviagte("/Staff/Kit")
    }
    catch(e){
      // console.log(e.message)
    }
  }
  NewData()

  return (
    <div className='edit-body'>
      <div className='header'>
        <h2>Edit Dementia Kit </h2>
        <p>You can make changes to the kit once created</p>
        <hr />
      </div>
      <div className='form-details'>
        <Form onSubmit={NewData} className="form-create">
        <label htmlFor='KitName'>Name </label>
          <input type="text" defaultValue ={kit.Name} onChange={(event) => {
          setText(event.target.value);
        }} 
        className="form-control" 
        id="KitName" 
        placeholder="Dementia Kit xx - example"
        />

        <label htmlFor='Number of Kits'>Quantity </label>
          <input type="number" defaultValue={kit.Quantity} onChange={(event) => {
          setQuantity(event.target.value) ;
        }} 
        className="form-control" 
        id="KitName" 
        placeholder="2"
        />

        <label className='Description'>Description </label>
          <textarea type="text" defaultValue={kit.Description} onChange={(event) => {
          setDescription(event.target.value);
        }} 
        className="form-control" 
        id="KitStartDate" 
        />

        <Button className= "Submit-Action" type="submit"> Submit </Button>
        <Button className= "Back-Action" href="/Staff/Kit">Back</Button>
        <br />
       
        </Form>
      </div>
    </div>
  )
}

export default Edit
