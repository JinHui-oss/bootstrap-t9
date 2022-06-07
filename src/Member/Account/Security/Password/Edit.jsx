import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { UserAuth } from '../../../../Scripts/authContext'
import { db, storage } from '../../../../Database/firebase'
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
  updatePassword,
  updateEmail
}from 'firebase/auth';


function MemberSecurityEdit() {
  
  const [Member, setMember] = useState([]);
  
  // eslint-disable-next-line
  const [Role, setRole] = useState("");
  // eslint-disable-next-line
  const {auth} = UserAuth();
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
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
           return;
          }
          getDownloadURL(snapshot.ref).then((url) => {
            const auth = getAuth();
            const user = auth.currentUser;
            //console.log(user)
            
            updateProfile(user, {
              displayName : Name,
              photoURL: url,
            })

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
                naviagte(`/Member/Profile/${Member.uid}`)
              }).catch((error) => {
                // An error ocurred
                console.log(error.message)
              });
            }
            else{
              console.log("bullshit")
              naviagte(`/Member/Kit`)
            }
               
            alert("image upload") 
          })
        });
      //naviagte(`/Member/Profile/${Member.uid}`)
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
      <input type="password" defaultValue={Member.Password} onChange={(event) => {
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
      <Button className= "Back-Action" href={`/Member/Profile/${id}`}>Back</Button>
      
      </Form>
    </div>
  </div>
)
}


export default MemberSecurityEdit
