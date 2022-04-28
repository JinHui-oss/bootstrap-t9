// react
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';


// bootstrap
import { Button } from 'react-bootstrap';

// firebase inital setup
import { db } from '../../../Database/firebase';

// firebase import function from firestore
import { 
  collection,
  // getDocs,
  getDoc,
  doc
} from 'firebase/firestore'

export default function Detail() {
  
  //const [setKit] = useState([]);
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
        let data =  docSnap.data();
        console.log(data);
        console.log(data.Name);
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
    <div className='details-content'>
       <div className='header'>
          <h2>Kit Details </h2>
          <p>View all content inside the kit</p>
          <hr />
        </div>
        <p>User Id: <br/>{id}</p>
      
      {/* Button */}
      <Button href="/Kit">Back</Button>
      <br /> 
      <br />
      <Button href="#">Update</Button>
      </div>
  )
}

