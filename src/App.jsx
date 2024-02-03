import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import DataEntryPlayer from "./Components/DataEntryPlayer";

const App = () => {
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(null);

  const handleFileChange = (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                  className="form-control mb-2"
                />
                <Button onClick={() => setShow(file)}>Play</Button>
              </Form.Group>
            </div>
          </div>
        </div>
      </div>
      {show && <DataEntryPlayer file={file} />}
    </div>
  );
};

export default App;
