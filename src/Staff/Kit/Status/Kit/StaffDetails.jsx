// react
import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

// bootstrap
import { Button, Card } from 'react-bootstrap';

// firebase inital setup
import { db } from '../../../../Database/firebase';

// firebase import function from firestore
import { 
  collection,
  getDoc,
  doc,
  deleteDoc
} from 'firebase/firestore'

import "../../../../Staff/Kit/Status/Status.css"

import { getStorage, ref, deleteObject } from "firebase/storage";


function StaffListProfile() {
  const [Member,setMember] = useState([]);
  const MemberCollectionRef = collection(db, "Staff");
  const navigate = useNavigate();
  const storage = getStorage();
  
  // create variable to reterive the specifc document id
  const { id } = useParams()
 
  useEffect(() => {
    const getdata = async () => {
      //const docRef = doc(db, "Member", "Jz1FaPxDJdE1574728hf");
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
         CreatedAt: data.CreatedAt,
         Email: data.Email,
         Gender: data.Gender,
         Name: data.Name,
         Password: data.Password,
         PhoneNumber: data.PhoneNumber,
         PhotoUrl: data.PhotoUrl,
         Role: data.Role,
         UpdatedAt: data.UpdatedAt,
         uid: data.uid,
         isverifed: data.isverifed
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
    };
    getdata();

  // eslint-disable-next-line 
  }, [MemberCollectionRef])
  
  // retrieve the status of the email and display to the user in profile page.
  // Source Code and have made modifications to the current code:
  // https://bobbyhadz.com/blog/javascript-cannot-read-property-tostring-of-undefined#:~:text=The%20%22Cannot%20read%20property%20'toString,data%20types%20that%20support%20it. 
  
  const data = Member.isverifed
  const data1 = data?.toString() || 'Not Verified'
  // console.log(data1)

  const deleteKit = async (e) => {
  
    const deletedocRef = doc(db, "Staff", id);
    await deleteDoc(deletedocRef);
    const desertRef = ref(storage, `/Staff/Account/`);

    deleteObject(desertRef).then(() => {
    
      // File deleted successfully
      alert('Staff Has been deleted successfully.')
      }).catch((error) => {
      // Uh-oh, an error occurred!
      // console.log(error.message)
    });
    navigate("/Staff/StaffList")

  }

  return (
    <div className='profilepage-content'>
      {/* header of the page */}
      <div className='header'>
        <h2>Staff Detail Page </h2>
        <p>View the document data ensure it is up to date.</p>
        <hr />
      </div>
        
      {/* body content of the kit pictures */}
      <div className='detailspage-pictures'>
        <div className="pic1">
          {/* eslint-disable-next-line */}
          <p><img src={Member.PhotoUrl}></img></p>
        </div>
      <br />
  
      </div>

       {/* product title and quantity information */} 
       <div className='detailspage-title'>
          <h2>Name: {Member.Name}</h2>
          <hr />
          <h2>Role: {Member.Role}</h2>
          <br />
        </div>

        {/* body content of the kit information */}
        <div className='memberprofilepage-information'>
        <Card className="profilepage-information-title">
            <Card.Title>
                <h3>Account Information</h3>
            </Card.Title>
          </Card>
          <Card className="profilepage-information-body">
            <Card.Body>
              <p>User Id: <br /> {Member.uid}</p>
              <p>Email: <br /> {Member.Email}</p>
              <p>Email Verifed: <br /> {data1}</p>
              <p>Phone Number: <br /> {Member.PhoneNumber}</p>
              <p>Gender: <br /> {Member.Gender}</p>
              <p>CreatedAt: <br />{Member.CreatedAt}</p> 
            </Card.Body>
          </Card>
        </div>
        <br/>
        <Button className ="Back-Button"href="/Staff/StaffList">Back</Button>
        <Button className ="Delete-Button" onClick={() => {deleteKit(id)}}>Delete</Button>
    </div>
  )
}

export default StaffListProfile
