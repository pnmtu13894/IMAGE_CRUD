import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';
import {BrowserRouter} from 'react-router-dom';

const config = {
    apiKey: "AIzaSyAjAtPmW4q4FvYUC2pN-KYLWitmVsFPBTE",
    authDomain: "crud-123-15d97.firebaseapp.com",
    databaseURL: "https://crud-123-15d97.firebaseio.com",
    projectId: "crud-123-15d97",
    storageBucket: "gs://crud-123-15d97.appspot.com",
    messagingSenderId: "576299955876"
};

firebase.initializeApp(config);


ReactDOM.render(

    <BrowserRouter>
        <App />
    </BrowserRouter>

, document.getElementById('root'));

registerServiceWorker();
