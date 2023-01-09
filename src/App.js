import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import Homepage from './Homepage';

import { Switch, Route } from 'react-router-dom';

const App = () => {
    return (

      //defining paths to card editor and card viewer
      //lowkey this doesnt work but if i submit the link with /editor
      //or /viewer after the firebase link, it seems to work fine
  
      <Switch>
        
        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/editor">
          <CardEditor />
        </Route>

        <Route exact path="/viewer/:deckId">
          <CardViewer />
        </Route>

        <Route>
          <div>Page not found!</div>
        </Route>

       </Switch>

      
    );
  };

export default App;