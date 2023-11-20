import React, { useState, useRef, useEffect } from "react";
import "./customizeRequestForm.css";

const Form = ({ progressCustomizeRequest, onRightClickItem }) => {
  const [requestURL, setRequestURL] = useState(
    onRightClickItem?.content?.customizeRequest?.requestURL
      ? onRightClickItem?.content?.customizeRequest?.requestURL
      : ""
  );
  const [requestMethod, setRequestMethod] = useState(
    onRightClickItem?.content?.customizeRequest?.requestMethod
      ? onRightClickItem?.content?.customizeRequest?.requestMethod
      : "POST"
  );
  const [inputFormat, setInputFormat] = useState(
    onRightClickItem?.content?.customizeRequest?.inputFormat
      ? onRightClickItem?.content?.customizeRequest?.inputFormat
      : "onSelect"
  );
  const [outputFormat, setOutputFormat] = useState(
    onRightClickItem?.content?.customizeRequest?.outputFormat
      ? onRightClickItem?.content?.customizeRequest?.outputFormat
      : "console"
  );

  const onFormSubmit = () => {
    progressCustomizeRequest("customizeRequest", {
      requestURL: requestURL,
      requestMethod: requestMethod,
      inputFormat: inputFormat,
      outputFormat: outputFormat,
    });
  };

  return (
    <div className="customizeRequestForm_component_container1120">
      <link
        href="https://fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
      ></link>
      <span id="ustomizeRequestForm_component_title1120">
        Customize Request
      </span>
      <div>
        <div className="customizeRequestForm_component_subcontainer1120">
          <label>Request URL</label>
          <input
            className="customizeRequestForm_component_input1120"
            type="text"
            value={requestURL}
            onChange={(e) => setRequestURL(e.target.value)}
          />
        </div>
        <div className="customizeRequestForm_component_subcontainer1120">
          <label>Request Method</label>
          <select
            className="customizeRequestForm_component_select1120"
            value={requestMethod}
            onChange={(e) => setRequestMethod(e.target.value)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>
        </div>
        <div className="customizeRequestForm_component_subcontainer1120">
          <label>Input Format</label>
          <select
            className="customizeRequestForm_component_select1120"
            value={inputFormat}
            onChange={(e) => setInputFormat(e.target.value)}
          >
            <option value="onSelect">On Select</option>
            <option value="entireFile">Entire File</option>
          </select>
        </div>
        <div className="customizeRequestForm_component_subcontainer1120">
          <label>Output Format</label>
          <select
            className="customizeRequestForm_component_select1120"
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
          >
            <option value="console">Console</option>
            <option value="apendToEnd">Apend To End</option>
            <option value="replace">Replace Current</option>
          </select>
        </div>
      </div>
      <button
        className="customizeRequestForm_component_button1120"
        onClick={onFormSubmit}
      >
        Send Request
      </button>
    </div>
  );
};

export default Form;
