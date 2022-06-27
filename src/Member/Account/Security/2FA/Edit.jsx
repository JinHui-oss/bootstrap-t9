import React, {useState} from 'react'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Form, Button } from 'react-bootstrap';
import { auth } from '../../../../Database/firebase'
import { useNavigate,useParams } from 'react-router-dom'


function Member2FAEdit() {

  const [PhoneText, setPhoneText] = useState("");
  const [OTP, setOTP] = useState("")
  const navigate = useNavigate();
  const { id } = useParams()

  // Verification code tutorial that is needed for accessing the web application
  // source code from: https://www.youtube.com/watch?v=Kw04a1Vw4Kg&ab_channel=BornToCode
  
  // To apply the default browser preference instead of explicitly setting it.
  auth.useDeviceLanguage();
  
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recapthca-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, auth);
  
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
  

  const verifyOTP = (e) => {
    let otp = e.target.value;
    setOTP(otp);

    if(otp.length === 6){
      console.log(OTP)
     let confirmationResult = window.confirmationResult
     confirmationResult.confirm(otp).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(user)
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      console.log(error)
    });
    
    }
    else{
      console.log('f')
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
          placeholder= ''
          defaultValue = ''
          
          required />
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
