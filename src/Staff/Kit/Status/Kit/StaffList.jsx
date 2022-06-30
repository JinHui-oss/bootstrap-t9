import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import '../../../Member/Member.css'

// firebase
import { db } from '../../../../Database/firebase';
import { collection, getDocs } from 'firebase/firestore'

function StaffList() {
    const [KitQR, setKitQR] = useState([]);
    const [search, setSearch] = useState('');
    // eslint-disable-next-line 
    const KitQRCollectionRef = collection (db, "Staff")
  
    useEffect(() => {
      const getKitQR = async () => {
        const data = await getDocs(KitQRCollectionRef)
        //console.log(data);
        setKitQR(data.docs.map((doc) =>({...doc.data(), id: doc.id})));
      };
      getKitQR();
  
     
    }, [KitQRCollectionRef])

    
  
    return (
      // the content of the webpage
      <div className='QR-view'>
        <div className='header'>
          <h2>Member List</h2>
          <p>View all the public member who created an account with Yong En Care Centre.</p>
          <hr></hr>
        </div>
        
        <form className='input-words'>
         <input type="text" onChange={(event) => {
          setSearch(event.target.value);
          }} 
          className="form-control" 
          id="KitQuantity" 
          placeholder="Enter Member Name" 
          required />
        </form>
      
      
        {/* table infomation */}
        <div className='table'>
        <Table responsive= "md" hover>
            <thead>
              <tr className='table-header'>
                <th>Profile</th>
                <th>Id</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            
            {/* display table content */}
               {/* eslint-disable-next-line*/}
            {KitQR.filter((val) => {
                if(search === ""){
                    return val;
                }
                else if(val.Name.toLowerCase().includes(search.toLocaleLowerCase())){
                    return val;
                }
            }).map((user) => {
            return( 
              <tbody>
                {""}
                <tr>
                  {/* eslint-disable-next-line */}
                  <td><img src={user.PhotoUrl}/></td>
                  <td>{user.id}</td>
                  <td>{user.Name}</td>
                  <td><Link to ={`/Staff/StaffList/Detail/${user.id}`}>View</Link></td>
                </tr>
              </tbody>
              );
            })}
          </Table>
          </div>
        </div>
    )
  }


export default StaffList
