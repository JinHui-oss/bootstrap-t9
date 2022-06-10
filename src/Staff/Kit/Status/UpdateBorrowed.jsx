// react
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import moment from 'moment'
import { UserAuth } from "../../../Scripts/authContext" 

// firebase
import { db } from '../../../Database/firebase';

import 
{ 
  collection, 
  getDocs,
  query,
  where,
  updateDoc,doc
} from 'firebase/firestore'

import { getAuth } from 'firebase/auth';

function StaffUpdateBorrowed() {
   // eslint-disable-next-line
   const [Kit, setKit] = useState([]);
   const [LoanName, setLoanName] = useState('');
   const [KitName, setKitName] = useState('');
   const [PhoneNumber, setPhoneNumber] = useState('');
   const [Email, setEmail] = useState('');
   const [Quantity, setQuantity] = useState('');
   const [StartDate, setStartDate] = useState('');
   const [EndDate, setEndDate] = useState('');
   const [KitStatus, setKitStatus] = useState('');
   const { id } = useParams();
   
   const kitCollectionRef = collection(db, "KitBorrowed");
   const kitCollectionRef1 = doc(db, "KitBorrowed", id)
   const { } = UserAuth();
  
   const navigate = useNavigate();
  
   useEffect(() => {
     const getKit = async () => {
       // check if the user id that retrieve from the database 
       // matches with both firebase auth and firestore.
      
       const auth = getAuth();
       const user = auth.currentUser;
       // console.log(user)
       
       if(user){
      
         // Display check
         // console.log(id)
         
         // Composite Query 
         const q1 = query(kitCollectionRef, where("Status", "==", "Borrowed"), where("id", "==", id))
         const data1 = await getDocs(q1)
         setKit(data1.docs.map((doc) =>({...doc.data(), id: doc.id})));
         // console.log(kit)
       }
     };
     getKit();
     
   }, [kitCollectionRef])

   const NewData = async(e) =>{
    let date = new Date();

    try{
      e.preventDefault();
      // upload directly to cloud firestore database & return back to kit page
      
      Kit.map((user) => {
        updateDoc(kitCollectionRef1,{
            id : user.id,
            KitName: user.KitName,
            loanname: user.loanname,
            Quantity: user.Quantity,
            Email: user.Email,
            PhoneNumber: user.PhoneNumber,
            StartDate: user.StartDate,
            EndDate: user.EndDate,
            Status: KitStatus
        })
        alert('documents have been updated successfully returning back to staff page')
        navigate('/Staff/Borrowed')
      })
    }
    catch(e){
      // Error Message Display Check
      // console.log(e)
    }
  }
      
  NewData()
   
 
   return (
     <div className='content'>
       <div className='content-header'>
         <h2>Loan Dementia Kit </h2>
         <p>View and Loan the dementia Kits</p>
         <hr/>
       </div>

      <div className='staffverifydetails'>
        <Form onSubmit={NewData} className="form-create">
          {Kit.map((user) => {
            let time1 = user.StartDate.toDate()
            let time2 = user.EndDate.toDate()
        
 
          // format
          // {moment.unix(time).format("MM/DD/YYYY")}
           return(   
            <div>
              <label htmlFor='BorrowerName'>Borrower Name </label>
              <input type="text" onChange={(event) => {
              setLoanName(event.target.value);
              }} 
              className="form-control" 
              defaultValue={user.loanname}
              id="LoanName" 
              placeholder={user.loanname}
              readOnly
              />
            <label htmlFor='BorrowerEmail'>Borrower Email </label>
            <input type="text" onChange={(event) => {setEmail(event.target.value)}} 
            className="form-control" 
            defaultValue ={user.Email} 
            id="LoanEmail" 
            placeholder="LoanName"
            readOnly
            />

            <label htmlFor='BorrowerContact'>Contact Number </label>
            <input type="text" onChange={(event) => {setPhoneNumber(event.target.value)}} 
            className="form-control" 
            defaultValue ={user.PhoneNumber} 
            id="LoanContact" 
            placeholder="LoanName"
            readOnly
            />

            <label htmlFor='KitName'>Kit Name </label>
            <input type="text" onChange={(event) => {setKitName(event.target.value)}} 
            className="form-control" 
            defaultValue ={user.KitName}
            id="KitName" 
            placeholder={user.KitName}
            readOnly
            />

            <label htmlFor='KitQuantity'>Kit Quantity </label>
            <input type="text" onChange={(event) => {
            setQuantity(event.target.value);
            }} 
            className="form-control"
            defaultValue ={user.Quantity} 
            id="KitQuantity" 
            placeholder="LoanName"
            readOnly
            />
    
            <label htmlFor='KitStartDate'>Start Date </label>
            <input type="text" onChange={(event) => {setStartDate(event.target.value)}} 
            className="form-control"
            defaultValue={
              moment(time1).format("L")}
            id="startdate" 
            placeholder="LoanName"
            readOnly
            />

            <label htmlFor='KitEndDate'>End Date </label>
            <input type="text" onChange={(event) => {
              setEndDate(event.target.value);
            }} 
            className="form-control" 
            id="enddate" 
            defaultValue={
              moment(time2).format("L")}
            placeholder="LoanName"
            readOnly
            />
            
            <Form.Group className="mb-3" controlId="formstatus" onChange={(e) => setKitStatus(e.target.value)}>
            <Form.Label>Status</Form.Label>
              <Form.Select>
                <option onChange={(e) => setKitStatus(e.target.value)}>Select an option </option>
                <option onChange={(e) => setKitStatus(e.target.value)}>Confirmed</option>
                <option onChange={(e) => setKitStatus(e.target.value)}>Borrowed</option>
                <option onChange={(e) => setKitStatus(e.target.value)}>Returned</option>
              </Form.Select>
            </Form.Group>
            
            <Button className= "Submit-Action" type="submit"> Submit </Button>
            <Button className= "Back-Action" href="/Staff/Borrowed">Back</Button>
            <br />
          </div>
          )
        })}         
      </Form>
    </div>
  </div>
 )}
 

export default StaffUpdateBorrowed



//StaffUpdateBorrowed