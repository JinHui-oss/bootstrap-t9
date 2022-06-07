// react
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment'

// firebase
import { db } from '../../Database/firebase';
import { collection, getDocs, Timestamp } from 'firebase/firestore'

function CurrentLoan() {
  //  eslint-disable-next-line
  const [kit, setKit] = useState([]);
  const kitCollectionRef = collection(db, "KitBorrowed");
   

  useEffect(() => {
    const getKit = async () => {
      const data = await getDocs(kitCollectionRef)
      setKit(data.docs.map((doc) =>({...doc.data(), id: doc.id})));
    };
    getKit();
    
  }, [kitCollectionRef])
  

  return (
    <div className='content'>
      <div className='content-header'>
        <h2>Loan Dementia Kit </h2>
        <p>View and Loan the dementia Kits</p>
        <hr/>
      </div>
    
      <div className='content-table'>
          <Table responsive="md" hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          
          {kit.map((user) => {
            let time1 = user.StartDate.toDate()
            let time2 = user.EndDate.toDate()

            //  {moment.unix(time).format("MM/DD/YYYY")}
          return( 
            <tbody>
              {""}
              <tr>
                <td>{user.id}</td>
                <td>{user.KitName}</td>
                <td> {moment(time1).format("DD/MM/YYYY")}</td>
                <td>
                
                {moment(time2).format("DD/MM/YYYY")}
             
                </td>
                <td>{user.Status}</td>
              </tr>
            </tbody>
            );
          })}         
        </Table>
      </div>
  </div>
)}

export default CurrentLoan