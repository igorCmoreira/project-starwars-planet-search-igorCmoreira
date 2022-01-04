import React from 'react';
import Table from './Components/Table';
import PlanetsProvider from './Context/PlanetsProvider';
import SearchBar from './Components/SearchBar';

function App() {
  return (
    <PlanetsProvider>
      <SearchBar />
      <Table />
    </PlanetsProvider>

  );
}

export default App;
