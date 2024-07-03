import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveSubmit = async (e) => {

    e.preventDefault();
    console.log(e, "hi");
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button variant="secondary" onClick={handleShow}>Save Segment</Button>{' '}
        <Offcanvas show={show} onHide={handleClose} placement='end' backdropClassName='true'>
          <Offcanvas.Header closeButton className='titleColor'>
            <Offcanvas.Title >Saving Segment</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>

{/* Form Started */}
            <form>
              <label>Enter the name of the segment</label>
              <input type='text' className='form-control' placeholder='Name of the Segment'></input>
            </form>
{/* Form End */}
            <h6 class="mt-4">To save your segment, you need to add the schemas to build the query.</h6>

            <DropdownButton id="dropdown-item-button" title="Dropdown button">
              <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
              <Dropdown.Item as="button">Action</Dropdown.Item>
              <Dropdown.Item as="button">Another action</Dropdown.Item>
              <Dropdown.Item as="button">Something else</Dropdown.Item>
            </DropdownButton>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              + Add new schema
            </a>
            <div className="offcanvas-footer">
              <Button variant="success" onClick={saveSubmit}>Save the Segment</Button>{' '}
              <Button variant="danger" onClick={handleClose}>Cancel</Button>{' '}
            </div>

          </Offcanvas.Body>
        </Offcanvas>

      </header>
    </div>
  );
}

export default App;
