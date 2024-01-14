import React, { useEffect, useState } from 'react';
import './style.css';

function App() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const bartimer = setInterval(() => {
      setWidth((prevWidth) => (prevWidth < 100 ? prevWidth + 1 : 100));
    }, 100);

    return () => {
      clearInterval(bartimer);
    };
  }, []);

  return (
    <div className="processcontainer">
      <div id="processbar" style={{ width: `${width}%` }}></div>
    </div>
  );
}

export default App;