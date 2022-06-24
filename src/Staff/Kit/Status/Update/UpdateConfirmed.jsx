// react
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import moment from 'moment'
import { UserAuth } from "../../../../Scripts/authContext" 

// firebase
import { db } from '../../../../Database/firebase';

import 
{ 
  collection, 
  updateDoc,doc, getDoc
} from 'firebase/firestore'
import "../../../../Staff/Kit/Status/Status.css"

import emailjs from '@emailjs/browser';

function StaffUpdateConfirmed() {
  // eslint-disable-next-line
  const [Kit, setKit] = useState([]);
  const [setLoanName] = useState('');
  const [setKitName] = useState('');
  const [setPhoneNumber] = useState('');
  const [setEmail] = useState('');
  const [setQuantity] = useState('');
  const [setStartDate] = useState('');
  const [setEndDate] = useState('');
  const [KitStatus, setKitStatus] = useState('');
  const { id } = useParams();
  
  const kitCollectionRef = collection(db, "KitBorrowed");
  const kitCollectionRef1 = doc(db, "KitBorrowed", id)
  // eslint-disable-next-line
  const {} = UserAuth();
 
  const navigate = useNavigate();
 
  useEffect(() => {
     const getKit = async () => {
       const docRef = doc(db, "KitBorrowed", id);
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
         const time1 = data.StartDate.toDate()
         let time2 = data.EndDate.toDate()
         
         setKit.state ={
           id : data.id,
           KitName: data.KitName,
           loanname: data.loanname,
           Quantity: data.Quantity,
           Email: data.Email,
           PhoneNumber: data.PhoneNumber,
           StartDate: time1,
           EndDate: time2,
           Status: data.KitStatus
         }
         // reterive the data and stored into a setkit
         setKit(setKit.state)
        
         // check for the display output
          //console.log(setKit.state) 
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

 
  const NewData = async(event) =>{
   try{
     event.preventDefault();
     // upload directly to cloud firestore database & return back to kit page
   
       updateDoc(kitCollectionRef1,{
           id : Kit.id,
           KitName: Kit.KitName,
           loanname: Kit.loanname,
           Quantity: Kit.Quantity,
           Email: Kit.Email,
           PhoneNumber: Kit.PhoneNumber,
           StartDate: Kit.StartDate,
           EndDate: Kit.EndDate,
           Status: KitStatus
       })        
       
       // Email Notfication sent to member using EmailJS API
       emailjs.sendForm('service_6gtz4td', 'template_2kshjof',event.target,'wrPdaYsbP50QkbgHU')
       .then((result) => {
         console.log(result.text);
       }, (error) => {
         console.log(error.text);
       });
       alert('documents have been updated successfully returning back to Confirmed page')
       navigate('/Staff/Confirmed')
     
   }
   catch(e){
     // Error Message Display Check
     console.log(e)
   }
 }    
 NewData()
 
 return (
   <div className='content'>
     <div className='content-header'>
       <h2>Update Dementia Kit </h2>
       <p>View and update the dementia kit status</p>
       <hr/>
     </div>

    <div className='staffverifydetails'>
      <Form onSubmit={NewData} className="form-create">
        
          <div>
            <label htmlFor='BorrowerName'>Borrower Name </label>
            <input type="text" onChange={(event) => {
            setLoanName(event.target.value);
            }} 
            className="form-control" 
            defaultValue={Kit.loanname}
            id="LoanName" 
            placeholder={Kit.loanname}
            name="loanname"
            readOnly
            />

          <label htmlFor='BorrowerEmail'>Borrower Email </label>
          <input type="text" onChange={(event) => {setEmail(event.target.value)}} 
          className="form-control" 
          defaultValue ={Kit.Email} 
          id="LoanEmail" 
          placeholder="abc@gmail.com"
          name="Email"
          readOnly
          />

          <label htmlFor='BorrowerContact'>Contact Number </label>
          <input type="text" onChange={(event) => {setPhoneNumber(event.target.value)}} 
          className="form-control" 
          defaultValue ={Kit.PhoneNumber} 
          id="LoanContact" 
          placeholder={Kit.PhoneNumber}
          name='Phone'
          readOnly
          />

          <label htmlFor='KitName'>Kit Name </label>
          <input type="text" onChange={(event) => {setKitName(event.target.value)}} 
          className="form-control" 
          defaultValue ={Kit.KitName}
          id="KitName" 
          placeholder={Kit.KitName}
          name='KitName'
          readOnly
          />

          <label htmlFor='KitQuantity'>Kit Quantity </label>
          <input type="text" onChange={(event) => {
          setQuantity(event.target.value);
          }} 
          className="form-control"
          defaultValue ={Kit.Quantity} 
          id="KitQuantity"
          name ='Quantity' 
          placeholder={Kit.Quantity}
          readOnly
          />
  
          <label htmlFor='KitStartDate'>Start Date </label>
          <input type="text" onChange={(event) => {setStartDate(event.target.value)}} 
          className="form-control"
          id="StartDate" 
          defaultValue={
            
          Kit.StartDate}
          name= 'startdate'
          placeholder= {moment(Kit.StartDate).format("L")}
          readOnly
          />
       
          <label htmlFor='KitEndDate'>End Date </label>
          <input type="text" onChange={(event) => {
            setEndDate(event.target.value);
          }} 
          className="form-control" 
          id="EndDate" 
          defaultValue={
            Kit.EndDate}
          name='enddate'
          placeholder={moment(Kit.EndDate).format("L")}
          readOnly
          />
          
          <Form.Group className="mb-3" controlId="formstatus" onChange={(e) => setKitStatus(e.target.value)}>
          <Form.Label className="label">Status</Form.Label>
            <Form.Select className='options' name='status'>
              <option onChange={(e) => setKitStatus(e.target.value)}>Select an option </option>
              <option onChange={(e) => setKitStatus(e.target.value)}>Confirmed</option>
              <option onChange={(e) => setKitStatus(e.target.value)}>Ready For Collection</option>
              <option onChange={(e) => setKitStatus(e.target.value)}>Borrowed</option>
              <option onChange={(e) => setKitStatus(e.target.value)}>Returned</option>
              <option onChange={(e) => setKitStatus(e.target.value)}>Cancellation</option>
            </Form.Select>
          </Form.Group>
          
          <div className='both-buttons'>
            <Button className= "Submit-Action" type="submit"> Submit </Button>
            <Button className= "Back-Action" href="/Staff/Confirmed">Back</Button>
          </div>
          <br />
        </div>
        
    </Form>
  </div>
</div>
)}
export default StaffUpdateConfirmed
