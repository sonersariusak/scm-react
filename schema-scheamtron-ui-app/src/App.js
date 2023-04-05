import './App.css';
import ControlFileUpload from './Components/File/ControlFileUpload';
import React, { useState } from 'react';

function App() {

  const title = 'Schema Schematron Admin Console';


  const [selectedCheckProductValue, setSelectedCheckProductValue] = useState('EARCHIVE');

  const [selectedCheckValue, setSelectedCheckValue] = useState('SCHEMA');

  const [selectedProductValue, setSelectedProductValue] = useState('EARCHIVE');
  const [selectedValue, setSelectedValue] = useState('SCHEMATRON');

  const [responseText, setResponseText] = useState("API result here..");
  const [responseCheckText, setResponseCheckText] = useState("API result here..");

  const [file, setFile] = useState('');

  function reset(event){
    window.location.reload();
  }

  function handleCheckChange(event) {
    setSelectedCheckValue(event.target.value);
  }

  function handleCheckFileInputChange(event) {
    setFile(event.target.files[0]);
  }

  function handleCheckChangeProduction(event) {
    setSelectedCheckProductValue(event.target.value);
    console.log(selectedCheckProductValue);
  }

  function handleChange(event) {
    setSelectedValue(event.target.value);
  }

  function handleFileInputChange(event) {
    setFile(event.target.files[0]);
  }

  function handleChangeProduction(event) {
    setSelectedProductValue(event.target.value);
  }

  function handleReadAndUpdate(event) {
    event.preventDefault();
    const encr = btoa(file);

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    fetch('http://localhost:8080/api/v1/schema-schematron/schematron', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        application: selectedProductValue,
        data: encr,
        type: selectedValue
      })

    }).then((response) => response.text())
      .then((data) => setResponseText(data))
      .catch((error) => console.error(error));
  }

  function handleCheck(event) {
    event.preventDefault();
    const encr = btoa(file);

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    fetch('http://localhost:8080/api/v1/schema-schematron/control', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        application: selectedCheckProductValue,
        data: encr,
        type: selectedCheckValue
      })

    }).then((response) => response.text())
      .then((data) => setResponseCheckText(data))
      .catch((error) => console.error(error));
  }

  return (
    <div className="App">
      <div class="grid-container" className='grid-container--fill'>
        <div class="grid-item" className='title'><h1>{title}</h1></div>
        <div class="grid-item" className='forms'>
          <form className='form'>
            <select class="minimal" value={selectedProductValue} onChange={handleChangeProduction}>
              <option value="EARCHIVE">EARCHIVE</option>
              <option value="EARCHIVE_REPORT">EARCHIVE_REPORT</option>
              <option value="ELEDGER">ELEDGER</option>
            </select>

            <br></br>

            <select class="minimal" value={selectedValue} onClick={handleChange}>
              <option value="SCHEMATRON">SCHEMATRON</option>
            </select>
            <br></br>

            <div>
              <input type="file" className='loadSchematronFile' onChange={handleFileInputChange} />
            </div>
            <br></br>
            <div className='reset'>
              <br></br>
              <button onClick={handleReadAndUpdate} className='updateSchematronButton' >Update Schematron</button>
              <button onClick={reset} className='updateSchematronButton'>Reset</button>
            <br></br>
            </div>
            <div class="grid-container">
              <div class="grid-item" className='result'>
                <br></br>
                <div><textarea className='result' value={responseText} rows={10} cols={50} readOnly></textarea></div>
              </div>
            </div>
          </form>
          <form className='form'>
            <select class="minimal" value={selectedCheckProductValue} onChange={handleCheckChangeProduction}>
              <option value="EARCHIVE">EARCHIVE</option>
              <option value="EARCHIVE_REPORT">EARCHIVE_REPORT</option>
              <option value="ELEDGER">ELEDGER</option>
            </select>
            <br></br>

            <select class="minimal" value={selectedCheckValue} onChange={handleCheckChange}>
              <option value="SCHEMA">SCHEMA</option>
              <option value="SCHEMATRON">SCHEMATRON</option>
              <option value="SCHEMA">SCHEMA-SCHEMATRON</option>
            </select>
            <br></br>

            <div>
              <input type="file" className='loadSchematronFile' onChange={handleFileInputChange} />
            </div>
            <br></br>
            <div className='reset'>
              <br></br>
              <button onClick={handleCheck} className='checkButton' >Check</button>
              <button onClick={reset} className='updateSchematronButton'>Reset</button>
            <br></br>
            </div>
            <div class="grid-container">
              <div class="grid-item" className='result'>
                <br></br>
                <div><textarea className='result' value={responseCheckText} rows={10} cols={50} readOnly></textarea></div>
              </div>
            </div>
          </form>
        </div>
        <div class="grid-item" className='footer'>
          <img width="200" height="100" src="https://sovos.com/tr/wp-content/uploads/sites/10/2020/11/sovos-logo-tagline.svg" class="attachment-medium size-medium" alt="" decoding="async" loading="lazy" />
          <h6>Copyright (c) 2015 Sovos Foriba. All rights reserved.</h6></div>

      </div>


    </div>
  );
}

export default App;
