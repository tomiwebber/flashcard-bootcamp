import React from 'react';
import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

const Homepage = props => {
  //while the page hasn't loaded, print "loading.."
  if (!isLoaded(props.homepage)) {
    return <div>Loading...</div>;
  }

  //bootcamp hints
  //similar structure to rendering card rows in CardEditor
  //since we can't map over an object, we map over the array of keys of the object

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
  //The Object.keys() static method returns an array of a given object's own 
  //enumerable string-keyed property names.
  const decks = Object.keys(props.homepage).map(deckId => {
    return (
      <div key={deckId}>
        
        {/*link to the flashcard application selected*/}
        <Link to={`/viewer/${deckId}`}>
            {/*display flashcard deck name*/}
            {props.homepage[deckId].name}
        </Link>

      </div>
    );
  });


  return (
    <div class = "center">
      <h2>Homepage</h2>
      <h3 class="center">Flashcards</h3>
      <button>
        <Link to="/editor">New deck</Link>
      </button>
      <br></br>
      <br></br>
      {decks}
    </div>
  );
};

//https://github.com/harvard-datamatch/bootcamp/wiki/Bootcamp-Part-4:-Firebase-Realtime-Database#connectmapstatetopropscomponent
//mapStateToProps is a function that takes state (that is Redux global state), 
//picks and chooses what part of the Redux state it wants, and returns an object 
//that is passed as a prop into the Component.
const mapStateToProps = (state) => {
  //return homepage data 
  return { homepage: state.firebase.data.homepage };
};

//firebaseConnect requests data from Firebase Realtime Database to be stored in the 
//Redux global store and provides the enhanced component with Firebase props 
//(like login, logout, createUser, update, etc)
export default compose(
  firebaseConnect(['/homepage']),
  connect(mapStateToProps),
)(Homepage);