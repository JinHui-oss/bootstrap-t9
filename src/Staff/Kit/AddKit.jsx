import React from 'react'
import { Button } from 'react-bootstrap'

function AddKit() {
  
  function handlesubmit(){

  }

  return (
    <div className="content">
        <h2>Kit Infomation</h2>
        <hr />
      <form>
        <div className="form-group">
          <label htmlFor='KitName'>Name </label>
          <input type="text" className="form-control" id="KitName" placeholder="Dementia Kit xx - example" required />
        </div>
        <div className="form-group">
          <label htmlFor="KitQuantity">Quantity </label>
          <input type="number" className="form-control" id="KitQuantity" placeholder="1" required />
        </div>
        <div className="form-group">
          <label htmlFor="KitDescription">Description</label>
          <textarea className="form-control" id="KitDescription" rows="3" placeholder='Kit Content' required ></textarea>
        </div>
       
        <div className ="form-group">
          <label htmlFor="KitPictures">Kit Pictures</label>
          <br />
          <input type="file" className="form-control-file" id="KitPictures" />
        </div>
        <Button onClick={handlesubmit} className='submit'>Submit</Button>
        <br />
        <Button href='/kit' className='submit'>Back</Button>
        
      </form>
    </div>
  )
}

export default AddKit
