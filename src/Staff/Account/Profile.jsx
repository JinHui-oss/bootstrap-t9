import React from 'react'

import { UserAuth } from "../../Scripts/authContext" 

function Profile() {
  const { user } = UserAuth();
  
  return (
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4'>Account</h1>
      <p>User Email:
        <br />{user && user.email}</p>
      <p>User Id: <br/>{user.uid}</p>
      <p>Profile Pictures
        <br /> {user.profile}
      </p>
      <p> Account Created </p>
     

    </div>
  )
}

export default Profile
