import { combineReducers, createStore, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
//Reducers
import notifyReducer from './reducers/notifyReducer';

const firebaseConfig = {
  apiKey: 'AIzaSyBtLL7BbGrq-15H01C3o0YwQsr3JgYywQs',
  authDomain: 'reactclientpanel-ae9bb.firebaseapp.com',
  databaseURL: 'https://reactclientpanel-ae9bb.firebaseio.com',
  projectId: 'reactclientpanel-ae9bb',
  storageBucket: 'reactclientpanel-ae9bb.appspot.com',
  messagingSenderId: '1055518245145'
};

//react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};
//Init firebase instance
firebase.initializeApp(firebaseConfig);
//Init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer
});

//Create initial state
const initialState = {};

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
