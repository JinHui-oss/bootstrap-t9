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

// Random unique id 
// import { v4 } from 'uuid'

function MemberEdit() {
  const [Member, setMember] = useState([]);
  
  // eslint-disable-next-line
  const [Role, setRole] = useState("")
  // eslint-disable-next-line
  const {auth} = UserAuth();
  const [password, setPassword] = useState("")
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
          
            updateDoc(QRCollection, 
              { 
                uid : id,
                Name: Name,
                PhotoUrl : url,
                Email: email,
                Password: password,
                Role: rolem,
                UpdatedAt: date.toDateString()
              })
               
            alert("image upload") 
          })
        });
      naviagte(`/Member/Account/${Member.uid}`)
    }
    catch(e){
      console.log(e.message)
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

      <label className='Password'>Password </label>
      <input type="password"  defaultValue={Member.Password} checked ={Member.Password} onChange={(event) => {
          setPassword(event.target.value);
        }} 
      className="form-control" 
      id="KitStartDate" 
      />

      <label className='Role'>Assigned Role: </label>
      <input type="text" defaultValue={Member.Role} onChange={(event) => {
          setRole(event.target.value);
        }} 
      className="form-control" 
      id="ProfileRole" 
      readOnly
      />
      <div className ="form-pic">
        <label htmlFor="ProfilePictures">Kit Pictures</label>
        <br />
        {/* eslint-disable-next-line */}
        <img src={Member.PhotoUrl} />
          
        <input type="file" defaultValue={Member.PhotoUrl} onChange={(event) => {
            setImageUpload(event.target.files[0]);
        }} className="form-control-file"  />
      </div>
      
      <Button className= "Submit-Action" type="submit"> Submit </Button>
      <Button className= "Back-Action" href="/Kit">Back</Button>
      <br />
      <hr className='line'/>
      <footer>Test</footer>
      </Form>
    </div>
  </div>
)
}



export default MemberEdit
