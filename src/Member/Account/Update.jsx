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

// Random unique id 
// import { v4 } from 'uuid'

function MemberEdit() {
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
  
      const auth = getAuth();
      const user = auth.currentUser;
      //console.log(user)
            
      updateProfile(user, {
        displayName : Name
      })

      updateEmail(user, email).then(() => {
        // Email updated!
        // ...
        console.log('uploaded')
      }).catch((error) => {
        // An error occurred
        console.log(error.message)
      });
          
      updateDoc(QRCollection, 
      { 
        uid : id,
        Name: Name,
        PhoneNumber: phonenumber,
        Email: email,
        Role: rolem,
        UpdatedAt: date.toDateString()
      })
      //         
      alert("image upload") 
      //
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
        <h2>Update User Profile </h2>
        <p>You can make changes to the profile once created</p>
        <hr />
      </div>
      <div className='form-details'>
        <Form onSubmit={EditData} className="form-create">
          <label htmlFor='KitName'>Account Name: </label>
          <input type="text"  defaultValue ={Member.Name} onChange={(event) => {
          setName(event.target.value);
        }} 
        className="form-control" 
        id="AccountName" 
        placeholder={Member.Name}
        />

        <label htmlFor='Email'>Email:</label>
        <input type="Email" defaultValue={Member.Email} onChange={(event) => {
          setEmail(event.target.value);
        }} 
        className="form-control" 
        id="AccountEmail" 
        placeholder={Member.Email}
        />

        <label htmlFor='PhoneNumber'>Contact Number:</label>
        <input type="Number" defaultValue={Member.PhoneNumber} onChange={(event) => {
          setPhoneNumber(event.target.value);
        }} 
        className="form-control" 
        id="AccountEmail" 
        placeholder={Member.PhoneNumber}
        />

        <label className='Role'>Assigned Role: </label>
        <input type="text" defaultValue={Member.Role} onChange={(event) => {
          setRole(event.target.value);
        }} 
        className="form-control" 
        id="ProfileRole" 
        readOnly
        />
    
        <Button className= "Submit-Action" type="submit"> Submit </Button>
        <Button className= "Back-Action" href="/Kit">Back</Button>
      </Form>
    </div>
  </div>
  )
}



export default MemberEdit
