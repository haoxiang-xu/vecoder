import React, { useState } from 'react';
import './selection_list.css'; // Make sure to import the CSS file
function SelectionList() {
    const [selectedFile, setSelectedFile] = useState('');

    const files = [
        { name: 'Development File 1 - Long names cut off...', type: 'js' },
        { name: 'Development File 2', type: 'php' },
        { name: 'Development File 3', type: 'php' },
        { name: 'Development File 4', type: 'php' },
        { name: 'Development File 5', type: 'php' },
        { name: 'Development File 6', type: 'php' },
    ];

    return (
        <div className="selection-list">
            <select
                className="file-selector"
                value={selectedFile}
                onChange={(e) => setSelectedFile(e.target.value)}
                style={{ width: '100%' }} // Set width to fill container
            >
                {files.map((file, index) => (
                    <option key={index} value={file.name}>
                        {file.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectionList;
