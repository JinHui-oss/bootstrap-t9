import React from 'react';
import './Kit.css';

import { Table, Button } from 'react-bootstrap';

function Kit() {
  return (
    <div className='content'>
      <h2>xx Dementia Kit </h2>
      <p>View all the dementia Kits</p>
      <Button href="/kit/add">Add</Button>
      <hr></hr>
      <div className='table'>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#Id</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Kit1.jpg</td>
          <td>Dementia Kit 1 - Painting Kit</td>
          <td>view</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Kit2.jpg</td>
          <td>Dementia Kit 2 - Painting Kit</td>
          <td>view</td>
        </tr>
    </tbody>
  </Table>
  </div>
</div>
)
}

export default Kit;
