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
  
  const schemaOptions = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ];

  const [availableOptions, setAvailableOptions] = useState(schemaOptions);
  const [selectedItems, setSelectedItems] = useState([]);
  const [schemaValues, setSchemaValues] = useState([]);
  const [currentSelection, setCurrentSelection] = useState('');
  const [segmentName, setSegmentName] = useState('');
  // const webhookUrl = 'https://webhook.site/aa134019-db03-44cb-b97b-83affd468832'; 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveSubmit = async (e) => {
    e.preventDefault();

    const data = {
      segmentName: segmentName,
      schema:schemaValues
    };
console.log(data);
    try {
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://webhook.site/aa134019-db03-44cb-b97b-83affd468832', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      // Optionally, reset the form
      setSegmentName('');
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const handleInputChange = (e) => {
    setSegmentName(e.target.value);
  };

  const onChange = () => {
    setSchemaValues(selectedItems)
  }

  const handleSelectionChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = availableOptions.find(option => option.value === selectedValue);

    if (selectedOption && !selectedItems.some(item => item.value === selectedValue)) {
      setSelectedItems([...selectedItems, selectedOption]);
    }
    setCurrentSelection(selectedValue);
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

            <form >
              <label>Enter the name of the segment</label>
              <input type='text' className='form-control' placeholder='Name of the Segment'   onChange={handleInputChange} value={segmentName}></input>
            </form>

            <h6 className="mt-4">To save your segment, you need to add the schemas to build the query.</h6>

            <ul>
              {schemaValues.map(item => (
                <li key={item.value}>{item.label}</li>
              ))}
            </ul>


            <select
              value={currentSelection}
              onChange={handleSelectionChange}
              className='form-select formPointer'
            >
              <option value="" disabled>Select schema to add</option>
              {availableOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <br />

            <a
              className="App-link"
              target="_blank"
              onClick={onChange}
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
