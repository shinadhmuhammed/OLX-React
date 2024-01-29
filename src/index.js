import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {FireBaseContext} from './Store/FirebaseContext'
import Context from './Store/FirebaseContext';
import {Firebase} from './Firebase/Config'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FireBaseContext.Provider value={{Firebase}}>
      <Context>
     <App />
    </Context>
    </FireBaseContext.Provider>
  </React.StrictMode>
);


