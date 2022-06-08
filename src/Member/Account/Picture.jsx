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
  updateEmail
}from 'firebase/auth';


function UpdateProfilePicture() {
    const [Member, setMember] = useState([]);
  
  // eslint-disable-next-line
  const [Role, setRole] = useState("")
  // eslint-disable-next-line
  const {} = UserAuth();
  const [phonenumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [ImageUpload,setImageUpload] = useState("");
  const MemberCollectionRef = collection(db, "Member");

  const { id } = useParams()
 
  // create and stored the data into the firestore
  const QRCollection = doc(db, "Member", id)
  const naviagte = useNavigate();

  useEffect(() => {
    const getdata = async () => {
      // Reference 
      //const docRef = doc(db, "Member", "Jz1FaPxDJdE1574728hf");
      
      //
      const docRef = doc(db, "Member", id);
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
        
        setMember.state = {
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
        setMember(setMember.state)
       
        // check for the display output
        //console.log(setMember.state)
      } 
      else 
      {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getdata();

  // eslint-disable-next-line 
  }, [MemberCollectionRef])

  // add records directly to the firestore
  const EditData = async(e) =>{
    try{
      e.preventDefault();
      let date = new Date();
      let rolem = "Member";
  
        // check the condition if there is no photo uploaded to server
        if(ImageUpload == null)return;
        // set the specific path of where the photo is stored thru variable
        const imageRef = ref(storage, `Member/Account/${ImageUpload.name}`)
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
        naviagte(`/Member/Profile/${Member.uid}`)
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
        <img src={Member.PhotoUrl} />
    </div>
    <div className='edit-picture'>
        <label htmlFor='PhoneNumber'>Contact Number:</label>
        <br />
        <input type="file" defaultValue={Member.PhotoUrl} onChange={(event) => {
        setImageUpload(event.target.files[0]);
        }} className="form-control-file" required />    
    </div>  
    <Button className= "Submit-Action" type="submit"> Submit </Button>
    <Button className= "Back-Action" href={`/Member/Profile/${Member.uid}`}>Back</Button>
    </Form>
    </div>
  </div>
)
}

export default UpdateProfilePicture
