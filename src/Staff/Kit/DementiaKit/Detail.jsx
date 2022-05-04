// react
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// bootstrap
import { Button } from 'react-bootstrap';

// firebase inital setup
import { db } from '../../../Database/firebase';

// firebase import function from firestore
import { 
  collection,
  getDoc,
  doc
} from 'firebase/firestore'

function Detail() {
  
  const [kit,setKit] = useState([]);
  const kitCollectionRef = collection(db, "Kit");
  
  const { id } = useParams()

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
          CreatedAt: data.CreatedAt.toDate().toString()
          
        }

        setKit(setKit.state)
       
        // check for the display output
        // console.log(setKit.state)
        
      } 
      else 
      {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      // let data = await getDocs(kitCollectionRef)
      // setKit(data.docs.map((doc) =>({...doc.data(), id: doc.id})));
      // console.log(setKit())
    };
    getKit();

  // eslint-disable-next-line 
  }, [kitCollectionRef])
   
   return (
    // Kit infomation details for specific page
    <div className='details-content'>
       {/* header of the website */}
       <div className='header'>
          <h2>Kit Details </h2>
          <p>View all content inside the kit</p>
          <hr />
        </div>

        {/* body content of the details */}
        <div className='content-body'>
          <p>User Id: <br /> {id}</p>
          <p>Kit Name: <br /> {kit.Name}</p>
          <p>About the Kit: <br /> {kit.Description}</p>
          <p>Total amount of Kit <br /> {kit.Quantity}</p>
          <p>Created At: <br />{kit.CreatedAt}</p>
          <br />
        </div>
      
        {/* Button */}
        <Button href="/Kit">Back</Button>
        <br /> 
        <br />
        <Button href="#">Update</Button>
      </div>
    )
  }
  export default Detail;

