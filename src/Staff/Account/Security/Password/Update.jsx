import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

import { db } from '../../../../Database/firebase'

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
  updatePassword,
}from 'firebase/auth';


function StaffPasswordUpdate() {
    const [staff, setStaff] = useState([]);
    const [password, setPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const StaffCollectionRef = collection(db, "Staff");
  
    const { id } = useParams()
   
    // create and stored the data into the firestore
    const QRCollection = doc(db, "Staff", id)
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
          
          setStaff.state = {
            uid : data.uid,
            Name: data.Name,
            PhotoUrl : data.PhotoUrl,
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

        const auth = getAuth();
        const user = auth.currentUser;
        //console.log(user)
        

        if(password === newpassword){
          updateDoc(QRCollection, 
            { 
              uid : id,
              Password: newpassword,
              Role: rolem,
              UpdatedAt: date.toDateString()
            })
          updatePassword(user, newpassword).then(() => {
            // Update successful.
            console.log('uploaded')
            naviagte(`/Staff/Account/${staff.uid}`)
          }).catch((error) => {
            // An error ocurred
            console.log(error.message)
          });
        }
        else{
          console.log("An error has occured. Returning to signin page.")
          naviagte(`/Signin`)
        }
           
        alert("Password have been updated successfully.") 
      }
      catch(e){
        // catch error message but currently display none;
      }
    }
    EditData()
  
    return (
      <div className='edit-body'>
      
      <div className='header'>
        <h2>Update User Password </h2>
        <p>You can change password to your current account.</p>
        <hr />
      </div>
      
      <div className='form-details'>
        <Form onSubmit={EditData} className="form-create">
       
        <label className='Password'>Old Password </label>
        <input type="password" defaultValue={staff.Password} onChange={(event) => {
            setPassword(event.target.value);
          }} 
        className="form-control" 
        id="MemberOldPassword"
        readOnly 
        />
  
        <label className='Password'>New Password </label>
        <input type="password" onChange={(event) => {
            setPassword(event.target.value);
          }} 
        className="form-control" 
        id="MemberNewPassword" 
        placeholder='Please enter new password min 8 character'
        />
  
        <label className='Password'>Renter New Password </label>
        <input type="password"  onChange={(event) => {
            setNewPassword(event.target.value);
          }} 
        className="form-control" 
        id="MemberConfirmNewPassword" 
        placeholder='Please enter new password min 8 character'
        />
  
        <Button className= "Submit-Action" type="submit"> Submit </Button>
        <Button className= "Back-Action" href={`/Staff/Account/${id}`}>Back</Button>
        
        </Form>
      </div>
    </div>
  )
}
  

export default StaffPasswordUpdate
