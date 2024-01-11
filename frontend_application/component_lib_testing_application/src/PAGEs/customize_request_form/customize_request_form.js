import React, { useState } from 'react';
import './customize_request_form.css';


const CustomizeRequestForm = () => {
  // State variables for form inputs
  const [requestUrl, setRequestUrl] = useState('');
  const [requestMethod, setRequestMethod] = useState('GET');
  const [inputFormat, setInputFormat] = useState('JSON');
  const [outputFormat, setOutputFormat] = useState('JSON');

  // Handler function for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for handling the form submission, e.g., making an API request
    console.log('Form submitted:', { requestUrl, requestMethod, inputFormat, outputFormat });
  };

  return (
    <div className="customize-form-container">
      <h2 style={{ color: '#fff' }}>Customize Request Form</h2>
      <form onSubmit={handleSubmit}>
        <label className="customize-form-label">
          Request URL:
          <input
            type="text"
            className="customize-form-input"
            value={requestUrl}
            onChange={(e) => setRequestUrl(e.target.value)}
            required
          />
        </label>
        <br />

        <label className="customize-form-label">
          Request Method:
          <select
            className="customize-form-select"
            value={requestMethod}
            onChange={(e) => setRequestMethod(e.target.value)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
        <br />

        <label className="customize-form-label">
          Input Format:
          <select
            className="customize-form-select"
            value={inputFormat}
            onChange={(e) => setInputFormat(e.target.value)}
          >
            <option value="JSON">JSON</option>
            <option value="XML">XML</option>
            <option value="Form Data">Form Data</option>
          </select>
        </label>
        <br />

        <label className="customize-form-label">
          Output Format:
          <select
            className="customize-form-select"
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
          >
            <option value="JSON">JSON</option>
            <option value="XML">XML</option>
            <option value="Plain Text">Plain Text</option>
          </select>
        </label>
        <br />

        <button type="submit" className="customize-form-button">
          Send Request
        </button>
      </form>
    </div>
  );
};


export default CustomizeRequestForm;
