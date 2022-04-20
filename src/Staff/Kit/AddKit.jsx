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
        <div class="form-group">
          <label for="KitName">Name </label>
          <input type="text" class="form-control" id="KitName" placeholder="Dementia Kit xx - example" required />
        </div>
        <div class="form-group">
          <label for="KitQuantity">Quantity </label>
          <input type="number" class="form-control" id="KitQuantity" placeholder="1" required />
        </div>
        <div class="form-group">
          <label for="KitDescription">Description</label>
          <textarea class="form-control" id="KitDescription" rows="3" placeholder='Kit Content' required ></textarea>
        </div>
        <form>
        <div class="form-group">
          <label for="KitPictures">Kit Pictures</label>
          <br />
          <input type="file" class="form-control-file" id="KitPictures" />
        </div>
        <Button onclick={handlesubmit} className='submit'>Submit</Button>
        <br />
        <Button href='/kit' className='submit'>Back</Button>
        </form>
      </form>
    </div>
  )
}

export default AddKit
