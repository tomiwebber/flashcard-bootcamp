import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import Homepage from './Homepage';

import { Switch, Route } from 'react-router-dom';
import { Router } from 'react-router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { front: 'front1', back: 'back1' },
        { front: 'front2', back: 'back2' },
      ],
    };
  }

  addCard = card => {
    const cards = this.state.cards.slice().concat(card);
    this.setState({ cards });
  };

  deleteCard = index => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({ cards });
  };


  render() {
    return (

      //defining paths to card editor and card viewer
      //lowkey this doesnt work but if i submit the link with /editor
      //or /viewer after the firebase link, it seems to work fine

  
      <Switch>

      
        <Route path="/editor">
          <CardEditor addCard={this.addCard} cards={this.state.cards} deleteCard={this.deleteCard}/>
        </Route>

        <Route  path="/viewer">
          <CardViewer cards={this.state.cards} />
        </Route>

        <Route  path="/">
          <Homepage/>
        </Route>

       </Switch>
      
        
        /*
        <Switch>
        <Route exact path="/editor">
          <CardEditor addCard={this.addCard} cards={this.state.cards} deleteCard={this.deleteCard}/>
        </Route>
        
        <Route exact path="/viewer">
          <CardViewer cards={this.state.cards} />
        </Route>
        </Switch>
        */
        
      
      
    );
  }
}

export default App;