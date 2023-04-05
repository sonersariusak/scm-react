import React, { useState } from 'react';

function ControlFileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContents, setFileContents] = useState(null);

  function handleFileInput(event) {
    setSelectedFile(event.target.files[0]);
  }

  function handleReadAndCheck() {
    const reader = new FileReader();
    reader.onload = function(event) {
      setFileContents(event.target.result);
    };
  }

  return (
    <div>
      <input type="file" className='loadSchematronFile' onChange={handleFileInput} />
      <br></br>
      <br></br>
      <button onClick={handleReadAndCheck} className='loadCheckButton'>Check</button>
      {fileContents && <pre>{fileContents}</pre>}
    </div>
  );
}

export default ControlFileUpload;