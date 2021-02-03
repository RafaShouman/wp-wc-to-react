import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import reportWebVitals from './reportWebVitals';

const targets = document.querySelectorAll('.erw-root');
Array.prototype.forEach.call(targets, target => {
    ReactDOM.render(<App />, target)
});