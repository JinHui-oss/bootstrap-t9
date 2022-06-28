import React, {useState, useEffect} from 'react'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Form, Button } from 'react-bootstrap';
import { db, auth } from '../../../../Database/firebase'
import { useNavigate,useParams } from 'react-router-dom'
import {
  collection,
  getDoc,
  doc
}from 'firebase/firestore'
import { UserAuth } from '../../../../Scripts/authContext'


function Member2FAEdit() {
  const MemberCollectionRef = collection(db, "Member");
  const [Member, setMember] = useState([])
  const [PhoneText, setPhoneText] = useState("");
  const [OTP, setOTP] = useState("")
  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const { id } = useParams()

  useEffect(() => {
    const getdata = async () => {
      // Reference 
      //const docRef = doc(db, "Member", "Jz1FaPxDJdE1574728hf");
      
      //
      const docRef = doc(db, "Member", id);
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
        //console.log(setMember.state)
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


  // Verification code tutorial that is needed for accessing the web application
  // source code from: https://www.youtube.com/watch?v=Kw04a1Vw4Kg&ab_channel=BornToCode
  
  // To apply the default browser preference instead of explicitly setting it.
  auth.useDeviceLanguage();
  
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recapthca-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log(response)
      }
    }, auth);
    window.recaptchaVerifier.render();
  
  }
  
  const test = async (e) => {
    e.preventDefault();
    if(PhoneText.length >= 10){
      generateRecaptcha();
      let appverifer = window.recaptchaVerifier;
      signInWithPhoneNumber(auth,PhoneText,appverifer)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult
     
      }).catch((error) => {
        console.log(error)
      });
    }
  }
  

  const verifyOTP = async (e) => {
    let otp = e.target.value;
    setOTP(otp);

    if(otp.length === 6){
     let confirmationResult = window.confirmationResult
     confirmationResult.confirm(otp).then((result) => {
      // User signed in successfully.
      const { user } = signIn(auth.Email,Member.password);
      console.log(user)
      navigate("/Member/Kit")
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      console.log(error)
     
    });
    
    }
    else{
      console.log('code is invalid. Please refresh the page')
    }
  }
  
  return (
    <div className='member2fa-edit'>
      <div className= 'member2fa-input'>
      <div
      id="recaptcha-container"
      className="justify-center flex"
       ></div>    
        <Form className='form-create' onSubmit={test}>
          <label>Test</label>
          <br />
          <input type="text" onChange={(event) => {
          setPhoneText(event.target.value);
          }} 
          className="form-control" 
          id="KitName" 
          defaultValue = {Member.PhoneNumber}
          name = 'phone'
          placeholder = {Member.PhoneNumber}
        
          />
         
          <label>Code</label>
          <input type='number' className='form-control' id='otpInput' value={OTP} 
          onChange={verifyOTP} />

          <br />
          <div id ="recapthca-container"></div>
          <Button type='submit'>Submit</Button>
       
        </Form>
      </div>
      
    </div>
  )
}

export default Member2FAEdit
