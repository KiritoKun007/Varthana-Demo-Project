import React, { Fragment } from 'react';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Components

import Colors from './components/Colors/Colors';

function App() {
  return (
    <Fragment>
      <DndProvider backend={HTML5Backend}>
        <Colors />
      </DndProvider>
    </Fragment>
  );
}

export default App;
