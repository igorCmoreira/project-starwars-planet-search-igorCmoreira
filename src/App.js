import React from 'react';
import Table from './Components/Table';
import PlanetsProvider from './Context/PlanetsProvider';
import SearchBar from './Components/SearchBar';
import NumberFilter from './Components/NumberFilters';
import OrderFilter from './Components/OrderFilter';

function App() {
  return (
    <PlanetsProvider>
      <SearchBar />
      <OrderFilter />
      <NumberFilter />
      <Table />
    </PlanetsProvider>

  );
}

export default App;
