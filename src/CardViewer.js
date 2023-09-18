import React from 'react';
import './CardViewer.css';

import { Link, withRouter} from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';


// Bootcamp Week 4: Cardviewer video 

class CardViewer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      displayFront: true,
    };
  }

  nextCard = () => {
    if (this.state.currentIndex < this.props.cards.length - 1) {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
        displayFront: true,
      });
    }
  };

  prevCard = () => {
    if (this.state.currentIndex > 0) {
      this.setState({
        currentIndex: this.state.currentIndex - 1,
        displayFront: true,
      });
    }
  };


  //when a user clicks the card, call flipCard to display opposite side
  flipCard = () => this.setState({ displayFront: !this.state.displayFront });
  
  render() {

    if (!isLoaded(this.props.cards)){
      return <div>Loading...</div>
    }
    
    const card = this.props.cards[this.state.currentIndex][
      //for the current card, if evaluates true, displays front, else displays back
      //tried to make a seperate function to evaluate the following if..else but 
      //wouldn't return correct output
      this.state.displayFront ? 'front' : 'back'];

    return (

      <div>
        <h2>{this.props.name}</h2>
        <p className='center'>
        Card {this.state.currentIndex + 1} out of {this.props.cards.length}.
        </p>

        <div className="center">
        <div className="card" onClick={this.flipCard}>
          <div className="center">
            {card}
          </div>
        </div>

        <br />
        <button disabled={this.state.currentIndex === 0} onClick={this.prevCard}>
          Prev card
        </button>

        <button disabled={this.state.currentIndex === this.props.cards.length - 1} onClick={this.nextCard} >
          Next card
        </button>

        </div>
        <hr />
        <button>
        <Link to="/editor">Go to card editor</Link>
        </button>
        
      </div>
      
    );
  }
}


const mapStateToProps = (state, props) => {
  const deck = state.firebase.data[props.match.params.deckId];
  
  //logical and operator allows us to say if deck is undefined, 
  //make entire statement, return undefined 
  const name = deck && deck.name;
  const cards = deck && deck.cards;
  return { cards: cards, name: name };
};

export default compose(
  withRouter,
  firebaseConnect(props => {
    const deckId = props.match.params.deckId;
    return [{ path: `/flashcards/${deckId}`, storeAs: deckId }];
  }),
  connect(mapStateToProps),
)(CardViewer);
