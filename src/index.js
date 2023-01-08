import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from 'react-router-dom';


import { Provider } from 'react-redux'
import firebase from 'firebase/compat/app'
import 'firebase/auth'
// import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers } from 'redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDPuZ4Sl2MS3UiCON2KNe_kvRSkYd3erqY",
  authDomain: "bootcamp-2f932.firebaseapp.com",
  databaseURL: "https://bootcamp-2f932-default-rtdb.firebaseio.com",
  projectId: "bootcamp-2f932",
  storageBucket: "bootcamp-2f932.appspot.com",
  messagingSenderId: "330008583983",
  appId: "1:330008583983:web:4f79f2561b057b00d20bda"
};

firebase.initializeApp(firebaseConfig);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer
  // firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const store = createStore(rootReducer)

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
};


ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'),
);
