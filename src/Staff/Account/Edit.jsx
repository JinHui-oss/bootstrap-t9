import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../Database/firebase'

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
  updateEmail,
}from 'firebase/auth';

function ProfileEdit() {
  const [Member, setMember] = useState([]);
  
  const [Role, setRole] = useState("")
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const StaffCollectionRef = collection(db, "Staff");

  const { id } = useParams()
 
  // create and stored the data into the firestore
  const ProfileCollection = doc(db, "Staff", id)
  const naviagte = useNavigate();

  useEffect(() => {
    const getdata = async () => {
      // Reference 
      //const docRef = doc(db, "Member", "Jz1FaPxDJdE1574728hf");
      
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
        
        setMember.state = {
          uid : data.uid,
          Name: data.Name,
          PhotoUrl : data.PhotoUrl,
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
  }, [StaffCollectionRef])

 

  // add records directly to the firestore
  const EditData = async(e) =>{
    try{
      e.preventDefault();
      let date = new Date();
  
      const auth = getAuth();
      const user = auth.currentUser;
      //console.log(user)
            
      updateProfile(user, {
        displayName : Name,
      })

      updateEmail(user, email).then(() => {
        // Email updated!
        // ...
        console.log('uploaded')
        }).catch((error) => {
        // An error occurred
          console.log(error.message)
        });

        updateDoc(ProfileCollection, 
        { 
          uid : id,
          Name: Name,
          Email: email,
          Role: Role,
          UpdatedAt: date.toDateString()
        })
               
        alert("Contact Information has been updated successfully.") 
        
        naviagte(`/Staff/Account/${Member.uid}`)
      }
      catch(e){
        // console.log(e.message)
      }
    }
    EditData()

    return (
    <div className='edit-body'>
      <div className='header'>
        <h2>Update Contact Details </h2>
        <p>You can make changes to the account once created.</p>
        <hr />
      </div>
      <div className='form-details'>
        <Form onSubmit={EditData} className="form-create">
          <label htmlFor='KitName'>Account Name: </label>
          <input type="text"  defaultValue ={Member.Name} onChange={(event) => {
          setName(event.target.value);
        }} 
        className="form-control" 
        id="KitName" 
        placeholder={Member.Name}
        />

        <label htmlFor='Email'>Email:</label>
        <input type="Email" defaultValue={Member.Email} onChange={(event) => {
          setEmail(event.target.value);
        }} 
        className="form-control" 
        id="KitEmail" 
        placeholder={Member.Email}
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
        <Button className= "Back-Action" href={`/Staff/Account/${Member.uid}`}>Back</Button>
        <br />
      </Form>
    </div>
  </div>
)
}

export default ProfileEdit
