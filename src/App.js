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

        <Route path="/editor">
          <CardEditor />
        </Route>

        <Route path="/viewer/deck1">
          <CardViewer />
        </Route>

        <Route path="/">
          <Homepage />
        </Route>
        
        <Route>
          <div>Page not found!</div>
        </Route>

       </Switch>

      
    );
  };

export default App;