import React from 'react';
import Table from './Components/Table';
import PlanetsProvider from './Context/PlanetsProvider';
import SearchBar from './Components/SearchBar';
import NumberFilter from './Components/NumberFilters';

function App() {
  return (
    <PlanetsProvider>
      <SearchBar />
      <NumberFilter />
      <Table />
    </PlanetsProvider>

  );
}

export default App;
