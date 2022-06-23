// react
import React, { useEffect, useState } from 'react';

// react-bootstrap
import { Card } from 'react-bootstrap';

// firebase inital setup
import { db } from '../Database/firebase';

// firebase import function from firestore
import { 
  collection,
  getDocs,
} from 'firebase/firestore'

// firebase import query, where from firestore
import { query, where } from "firebase/firestore";  

// external stylesheet css for staff interface
import "../Staff/Index.css"

function Index() {
 
  // Total Staff
  const [staff, setStaff] = useState([]);
  const [tstaff, setTStaff] = useState([]);
  const StaffCollectionRef = collection(db, "Staff"); 
  
  // Total Kit
  const kitCollectionRef = collection(db, "Kit");

  // Total Kitborrowed
  const [kit,setKit] = useState([]);
  const [kittotal,setKitTotal] = useState([]);
  
  // Total KitBorrowed
  // eslint-disable-next-line
  const [kitborrowed,setKitBorrowed] = useState([]);
  const [started, setstarted] = useState("")
  
  // Total KitReturned
  const [kitreturned,setKitReturned] = useState([]);
  const [startedreturned , setstartedreturned] = useState([])
  const kitCollectionRef1 = collection(db, "KitBorrowed");

  // Total Member
  const TMemberCollectionRef = collection(db, "Member")
  const [member, setMember] = useState([])
  const [membernumber, setMemberNumber] = useState([])

  // Total ReadyCollection
  const [ready, setReady] = useState([])
  const [tready, setTready] = useState([])

  // Total Confirmed
  const [confirmed, setConfirmed] = useState([])
  const [tconfirmed, setTconfirmed] = useState([])

  // Total Cancel
  const [cancel, setCancel] = useState([])
  const [tcancel, setTcancel] = useState([])

  //

  // Staff
  useEffect(() => {
    const getstaffdata = async () => {
      const data = await getDocs(StaffCollectionRef)
      setStaff(data.docs.map((doc) =>({...doc.data(), id: doc.id})));
      let i 
        for(i = 0; i <= staff.length; i++ ){
          // console.log(i)
          if(i == null){
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setTStaff({...data, Total: i})
          }
          else{
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setTStaff({...data, Total: i })
            
            // checked if the output displayed the correct values
            // console.log(started)
          }
        }
      }
    getstaffdata();

    // eslint-disable-next-line 
    }, [StaffCollectionRef])
  
  // KitBorrowed
  useEffect(() => {
    const getKitBorrowed = async () => {
    
      try{
        // Composite Query 
        const q1 = query(kitCollectionRef1, where("Status", "==", "Borrowed"))
        const data1 = await getDocs(q1)

        setKitBorrowed(data1.docs.map((doc) =>({...doc.data(), id: doc.id})));
        // console.log(kitborrowed)
        
        // Display check
        // console.log(kitborrowed)
        let i 
        for(i = 0; i <= kitborrowed.length; i++ ){
          // console.log(i)
          if(i == null){
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setstarted({...data1, Total: i})
          }
          else{
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setstarted({...data1, Total: i })
            
            // checked if the output displayed the correct values
            // console.log(started)
          }
        }
      }
      catch(e){
        // Display error message if needed
        // console.log(e.message)
      }
    };
    getKitBorrowed();
   // eslint-disable-next-line  
  }, [kitCollectionRef1])

  // Kit Total
  useEffect(() => {
    const getKitReturned = async () => {
      try{
        // Composite Query 
        const q1 = query(kitCollectionRef1, where("Status", "==", "Returned"))
        const data1 = await getDocs(q1)

        setKitReturned(data1.docs.map((doc) =>({...doc.data(), id: doc.id})));
        // console.log(kitborrowed)
        // Display check
        // console.log(id)
        
        // Composite Query 
      
        // console.log(kitborrowed)
        let i 
        for(i = 0; i <= kitreturned.length; i++ ){
          // console.log(i)
          if(i == null){
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setstartedreturned({...data1, Total: i})
          }
          else{
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setstartedreturned({...data1, Total: i })
            
            // checked if the output displayed the correct values
            // console.log(started)
          }
        }
      }
      catch(e){
        // Display error message if needed
        // console.log(e.message)
      }
    };
    getKitReturned();
  // eslint-disable-next-line
  }, [kitCollectionRef1])

  // 
  useEffect(() => {
    const getKit = async () => {
      const data = await getDocs(kitCollectionRef)
      setKit(data.docs.map((doc) =>({...doc.data(), id: doc.id})));
      let i 
        for(i = 0; i <= kit.length; i++ ){
          // console.log(i)
          if(i == null){
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setKitTotal({...data, Total: i})
          }
          else{
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setKitTotal({...data, Total: i })
            
            // checked if the output displayed the correct values
            // console.log(started)
          }
        }
    };
    getKit();
   // eslint-disable-next-line  
  }, [kitCollectionRef])

  useEffect(() => {
    const getTotalMembers = async () => {
      try{
        // Composite Query 
        const data2 = await getDocs(TMemberCollectionRef)
      
        setMember(data2.docs.map((doc) =>({...doc.data(), id: doc.id})));
       
        // Display check      
        // console.log(member)

        let i 
        for(i = 0; i <= member.length; i++){
          // console.log(i)
          if(i == null){
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setMemberNumber({...data2, Total: i })
          }
          else{
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setMemberNumber({...data2, Total: i })
            
            // checked if the output displayed the correct values
            // console.log(member)
          }
        }
      }
      catch(e){
        // Display error message if needed
        // console.log(e.message)
      }
     
    
    };
    getTotalMembers();
   // eslint-disable-next-line  
  }, [TMemberCollectionRef])

  // Total Ready Collection
  useEffect(() => {
    const getKitReady = async () => {
      try{
        // Composite Query 
        const q1 = query(kitCollectionRef1, where("Status", "==", "Confirmed"))
        const data1 = await getDocs(q1)

        setConfirmed(data1.docs.map((doc) =>({...doc.data(), id: doc.id})));
        // Display check
        // console.log(kitborrowed)

        let i 
        for(i = 0; i <= confirmed.length; i++ ){
          // console.log(i)
          if(i == null){
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setTconfirmed({...data1, Total: i})
          }
          else{
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setTconfirmed({...data1, Total: i })
            
            // checked if the output displayed the correct values
            // console.log(started)
          }
        }
      }
      catch(e){
        // Display error message if needed
        // console.log(e.message)
      }
    };
    getKitReady();
  // eslint-disable-next-line
  }, [kitCollectionRef1])

  useEffect(() => {
    const getKitReady = async () => {
      try{
        // Composite Query 
        const q1 = query(kitCollectionRef1, where("Status", "==", "Ready For Collection"))
        const data1 = await getDocs(q1)

        setReady(data1.docs.map((doc) =>({...doc.data(), id: doc.id})));
        
        // Display check
        // console.log(Ready)

        let i 
        for(i = 0; i <= ready.length; i++){
          // console.log(i)
          if(i == null){
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setTready({...data1, Total: i})
          }
          else{
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setTready({...data1, Total: i })
            
            // checked if the output displayed the correct values
            // console.log(tready)
          }
        }
      }
      catch(e){
        // Display error message if needed
        // console.log(e.message)
      }
     
    };
    getKitReady();
  // eslint-disable-next-line
  }, [kitCollectionRef1])

  /* Cancel */
  useEffect(() => {
    const getKitCancel = async () => {
      try{
        // Composite Query 
        const q1 = query(kitCollectionRef1, where("Status", "==", "Cancelled"))
        const data1 = await getDocs(q1)

        setCancel(data1.docs.map((doc) =>({...doc.data(), id: doc.id})));
        // console.log(kitborrowed)
        // Display check
        // console.log(id)
        
        // Composite Query 
      
        // console.log(kitborrowed)
        let i 
        for(i = 0; i <= cancel.length; i++ ){
          // console.log(i)
          if(i == null){
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setTcancel({...data1, Total: i})
          }
          else{
            // reference code from
            // https://stackoverflow.com/questions/61783095/react-warning-received-nan-for-the-children-attribute-when-using-usereduce
            setTcancel({...data1, Total: i })
            
            // checked if the output displayed the correct values
            // console.log(started)
          }
        }
      }
      catch(e){
        // Display error message if needed
        // console.log(e.message)
      }
    
    };
    getKitCancel();
  // eslint-disable-next-line
  }, [kitCollectionRef1])

  return(
  <div className='staff-index'>
    <div className='staff-title'>
      <div className='staff-kit'>
        <h2>Kit Status</h2>
        <hr />
      </div>
       
      <div className='kitborrowed-total'>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Total Borrowed</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Dementia Kit </Card.Subtitle>
          <Card.Text>
            Number: {started.Total}
          </Card.Text>
          <Card.Link href="/Staff/Borrowed">View</Card.Link>
          </Card.Body>
        </Card>
      </div>

      <br />
      <div className='kitreturned-total'>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Total Returned</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Dementia Kit </Card.Subtitle>
          <Card.Text>
            Number: {startedreturned.Total}
          </Card.Text>
          <Card.Link href="/Staff/Returned">View</Card.Link>
        </Card.Body>
      </Card>
      </div>
      <br />

      <div className='kit-total'>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Total</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Dementia Kit </Card.Subtitle>
          <Card.Text>
            Number: {kittotal.Total}
          </Card.Text>
          <Card.Link href="/Staff/Kit">View</Card.Link>
        </Card.Body>
        </Card>
      </div>

        <div className='member-total'>
          <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Total Canceled</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Dementia Kit </Card.Subtitle>
          <Card.Text>
            Number: {tcancel.Total}
          </Card.Text>
          <Card.Link href="/Staff/Cancellation">View</Card.Link>
        </Card.Body>
        </Card>
        </div>

        <br />

        <div className='Confirmed-total'>
          <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Total Confirmed</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Dementia Kit </Card.Subtitle>
          <Card.Text>
            Number: {tconfirmed.Total}
          </Card.Text>
          <Card.Link href="/Staff/Confirmed">View</Card.Link>
        </Card.Body>
        </Card>
        </div>

        <div className='ReadyC-total'>
          <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Total Ready Collection</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Dementia Kit </Card.Subtitle>
          <Card.Text>
            Number: {tready.Total}
          </Card.Text>
          <Card.Link href="/Staff/Collection">View</Card.Link>
        </Card.Body>
        </Card>
        </div>

        <hr className='down'/>
        <div className='Member-stafft'>
          <h2>Member and Staff</h2>
          <hr />
          </div>
          <div className='Member-total'>
          <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Total</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Staff</Card.Subtitle>
          <Card.Text>
            Number: {tstaff.Total}
          </Card.Text>
          <Card.Link href="/Staff/MemberList">View</Card.Link>
        </Card.Body>
        </Card>
        </div>

        <br />
        <div className='Staff-total'>
          <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Total </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Members </Card.Subtitle>
          <Card.Text>
            Number: {membernumber.Total}
          </Card.Text>
          <Card.Link href="/Staff/StaffList">View</Card.Link>
        </Card.Body>
        </Card>
        </div>
      </div>
    </div>
)
}

export default Index
