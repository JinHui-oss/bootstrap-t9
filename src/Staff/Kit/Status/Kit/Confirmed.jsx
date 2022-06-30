// react
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { UserAuth } from "../../../../Scripts/authContext" 
import { Link } from 'react-router-dom';

// firebase
import { db } from '../../../../Database/firebase';
import { getAuth } from 'firebase/auth';
import 
{ 
  collection, 
  getDocs,
  query,
  where 
} from 'firebase/firestore'


import "../../../../Staff/Kit/Status/Status.css"

function StaffConfirmed() {
  // eslint-disable-next-line
 const [kit, setKit] = useState([]);
 const [search, setSearch] = useState('');
 const kitCollectionRef = collection(db, "KitBorrowed");
  // eslint-disable-next-line
 const { } = UserAuth();

 useEffect(() => {
   const getKit = async () => {
     
    try{
      // check if the user id that retrieve from the database 
      // matches with both firebase auth and firestore.
    
      const auth = getAuth();
      const user = auth.currentUser;
      // console.log(user)
     
      if(user){
   
        // Composite Query 
        const q1 = query(kitCollectionRef, where("Status", "==", "Confirmed"))
        const data1 = await getDocs(q1)
        setKit(data1.docs.map((doc) =>({...doc.data(), id: doc.id})));
        
        // Display Output
        // console.log(kit)
     }
    }
    catch(e){
        // Display Error Messages
        // console.log(e.message)
    }
   };
   getKit();
   
 }, [kitCollectionRef])
 

 return (
   <div className='content'>
     <div className='content-header'>
       <h2>Confirmed Dementia Kit </h2>
       <p>View and checked borrower details first before updating the member next step.</p>
       <hr/>
     </div>

     <div className='content-search'>
     
     <form className='input-words'>
     <input type="text" onChange={(event) => {
       setSearch(event.target.value);
       }} 
       className="form-control" 
       id="KitQuantity" 
       placeholder="Enter Dementia Kit Name" 
       required />
       </form>
     </div>

     <div className='content-table'>
         <Table  hover>
         <thead>
           <tr>
             <th>Borrower Name</th>
             <th>Kit Name</th>
             <th>Status</th>
             <th>Action</th>
           
           </tr>
         </thead>
    
         {/* eslint-disable-next-line*/}
         {kit.filter((value) => {
           if(search === ""){
             return value;
           }
           else if(value.KitName.toLowerCase().includes(search.toLocaleLowerCase())){
             return value;
           }
         }).map((user) => {
         return( 
           <tbody>
             {""}
             <tr>
               <td>{user.loanname}</td>
               <td>{user.KitName}</td>
               <td>{user.Status}</td>
               <td><Link to ={`/Staff/Confirmed/Update/${user.id}`}>Edit</Link></td> 
             
             </tr>
           </tbody>
           );
         })}         
       </Table>
     </div>
 </div>
)}

export default StaffConfirmed
