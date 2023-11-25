import React, { useState, useEffect } from 'react';

import './error_popup.css';

const ErrorPopup = ({ errorMessage }) => {
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (errorMessage) {
            setErrors((prevErrors) => [...prevErrors, errorMessage[0]]);

            setTimeout(() => {
                setErrors((prevErrors) => prevErrors.slice(1));
            }, 5000);
        }
    }, [errorMessage]);

    return (
        <div class="error_box">
            {errors.map((error, index) => (
                <div key={index} className="error_item">
                    {error}
                </div>
            ))}
        </div>
    );
};

export default ErrorPopup;