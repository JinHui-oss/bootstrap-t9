import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
// import '../KitQR/KitQR.css'
import { useNavigate, useParams } from 'react-router-dom'

import { db } from '../../Database/firebase'
import { collection, addDoc, getDoc,
  doc } from 'firebase/firestore'
  import { getAuth } from 'firebase/auth';


function LoanCreate() {
  // create and stored the data into the firestore
  const QRCollection = collection(db, "KitBorrowed")
 
  const { id } = useParams();
  const naviagte = useNavigate();

  // retrieve the data from the user input and stored into variable.
  const [name, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Member,setMember] = useState([]);
  const [kit,setKit] = useState([]);
  const MemberCollectionRef = collection(db, "Member");
  const kitCollectionRef = collection(db, "Kit");

  // add records directly to the firestore
 
  useEffect(() => {
    const getdata = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if(user !== null){
      
      const t = user.uid;
        
      const docRef = doc(db, "Member", t);
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
        // console.log(setMember.state)
        
      } 
      else 
      {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  };
  getdata();

  // eslint-disable-next-line 
  }, [MemberCollectionRef])

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

  const NewData = async(e) =>{

    // create a variable to store start date values
    let date = new Date();
    var numberOfDayToAdd = 14;
    var currentDate = new Date(startdate);
    const hell = currentDate.setDate(currentDate.getDate() + numberOfDayToAdd)  
    const hell1 = new Date(hell);

    //setEndDate(currentDate + numberOfDayToAdd );

    const auth = getAuth();
    const user = auth.currentUser;

    try{
      e.preventDefault();
      // upload directly to cloud firestore database & return back to kit page
      await addDoc(QRCollection, 
      { 
        id : user.uid,
        KitName: kit.Name, 
        Quantity: amount,
        StartDate: new Date(startdate),
        EndDate: hell1,
        PhoneNumber:Member.PhoneNumber,
        Email: Member.Email,
        CreatedAt: date.toDateString(),
        Status: "Borrowed"
      });
      naviagte("/Member/Kit")
    }
    catch(e){
      //console.log(e.message)
    }
  }
  NewData()
  

  return (
    <div className='create-body'>
      <div className='header'>
        <h2>Reserve Dementia Kit </h2>
        <p>Enter your contact information of the dementia Kits needed to reserve the kit. </p>
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
        placeholder={kit.Name}
        defaultValue = {kit.Name}
        readOnly
        required />

        <label htmlFor='Number of Kits'>Amount of Kit Loaned </label>
          <input type="number" onChange={(event) => {
          setAmount(event.target.value);
        }} 
        className="form-control" 
        id="KitName" 
        placeholder="2"
        required />

        <label htmlFor='Start Date'>Start Date </label>
          <input type="Date" onChange={(event) => {
          setStartDate(event.target.value);
        }} 
        className="form-control" 
        id="KitStartDate" 
        required />

        <label htmlFor='Phone Number'>Phone Number </label>
          <input type="number" onChange={(event) => {
          setPhone(event.target.value);
        }} 
        className="form-control" 
        id="KitPhone"
        placeholder={Member.PhoneNumber}
        defaultValue={Member.PhoneNumber}
        readOnly 
        required />
        
        <label htmlFor='Email'>Email </label>
          <input type="email" 
        className="form-control" 
        id="KitEmail"
        defaultValue={Member.Email} 
        placeholder={Member.Email} 
        readOnly
        required />
       
        <br />
        <br />
        <Button className= "Action" type="submit"> Submit </Button>
        <Button className= "Back-Action" href="/Member/Kit">Back</Button>
        </Form>
      </div>
    </div>
  )
}
export default LoanCreate
