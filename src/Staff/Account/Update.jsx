import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { UserAuth } from '../../Scripts/authContext'
import { db, storage } from '../../Database/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import 
{ 
  doc, 
  updateDoc, 
  collection,
  getDoc  
} from 'firebase/firestore'
import 
{ 
  getAuth,  
  updateProfile,
}from 'firebase/auth';


function StaffProfileUpdate() {
    const [Staff, setStaff] = useState([]);

  // eslint-disable-next-line
  const {} = UserAuth();
  const [ImageUpload,setImageUpload] = useState("");
  const StaffCollectionRef = collection(db, "Staff");

  const { id } = useParams()
 
  // create and stored the data into the firestore
  const QRCollection = doc(db, "Staff", id)
  const naviagte = useNavigate();

  useEffect(() => {
    const getdata = async () => {
      // Reference 
      //const docRef = doc(db, "Staff", "Jz1FaPxDJdE1574728hf");
      
      //
      const docRef = doc(db, "Staff", id);
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
        
        setStaff.state = {
          uid : data.uid,
          Name: data.Name,
          PhotoUrl : data.PhotoUrl,
          PhoneNumber: data.PhoneNumber,
          Email: data.Email,
          Password: data.Password,
          Role: data.Role,
          CreatedAt: data.CreatedAt
        }
        
        // reterive the data and stored into a setkit
        setStaff(setStaff.state)
       
        // check for the display output
        //console.log(setStaff.state)
      } 
      else 
      {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getdata();

  // eslint-disable-next-line 
  }, [StaffCollectionRef])

  // add records directly to the firestore
  const EditData = async(e) =>{
    try{
      e.preventDefault();
      let date = new Date();
      let rolem = "Staff";
  
        // check the condition if there is no photo uploaded to server
        if(ImageUpload == null)return;
        // set the specific path of where the photo is stored thru variable
        const imageRef = ref(storage, `Staff/Account/${ImageUpload.name}`)
        // upload directly to storage database
        uploadBytes(imageRef, ImageUpload).then((snapshot) =>{
          // check the condition if there is no photo uploaded to server
          //if(ImageUpload == null)return;
          if(ImageUpload === null){
           console.log('y')
           return true;
          }
          getDownloadURL(snapshot.ref).then((url) => {
            const auth = getAuth();
            const user = auth.currentUser;
            //console.log(user)
            
            updateProfile(user, {
              photoURL: url
            })
          
            updateDoc(QRCollection, 
            { 
                uid : id,
                PhotoUrl : url,
                Role: rolem,
                UpdatedAt: date.toDateString()
            })
            alert("image upload") 
          })
        });
        naviagte(`/Staff/Account/${Staff.uid}`)
    }
    catch(e){
      // Catch error message if the data is invalid
    }
  }
  EditData()

  return (
    <div className='edit-body'>
    <div className='header'>
      <h2>Update Profile Pictures </h2>
      <p>You can add or update to the profile picture for your account.</p>
      <hr />
    </div>
    <div className='form-details'>
      <Form onSubmit={EditData} className="form-create">
      <div className ="form-pic">
        <label htmlFor="ProfilePictures">Kit Pictures</label>
        <br />
        {/* eslint-disable-next-line */}
        <img src={Staff.PhotoUrl} />
    </div>
    <div className='edit-picture'>
        <label htmlFor='PhoneNumber'>Contact Number:</label>
        <br />
        <input type="file" defaultValue={Staff.PhotoUrl} onChange={(event) => {
        setImageUpload(event.target.files[0]);
        }} className="form-control-file" required />    
    </div>  
    <Button className= "Submit-Action" type="submit"> Submit </Button>
    <Button className= "Back-Action" href={`/Staff/Account/${Staff.uid}`}>Back</Button>
    </Form>
    </div>
  </div>
)
}

export default StaffProfileUpdate
