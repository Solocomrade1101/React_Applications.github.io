import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import './fonts/TTFirstNeue/TTFirsNeue-DemiBold.ttf'
import './fonts/TTFirstNeue/TTFirsNeue-Bold.ttf'
import './fonts/TTFirstNeue/TTFirsNeue-Light.ttf'
import './fonts/TTFirstNeue/TTFirsNeue-Medium.ttf'
import './fonts/TTFirstNeue/TTFirsNeue-Regular.ttf'
import { BrowserRouter } from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

document.onkeydown = function(e){
  let keyCode = e.keyCode || e.charCode;
  if (keyCode == 38 || keyCode == 40) e.preventDefault();
};   