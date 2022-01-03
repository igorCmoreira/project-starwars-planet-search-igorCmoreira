import React from 'react';
import Table from './Components/Table';
import PlanetsProvider from './Context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Table />
    </PlanetsProvider>

  );
}

export default App;
