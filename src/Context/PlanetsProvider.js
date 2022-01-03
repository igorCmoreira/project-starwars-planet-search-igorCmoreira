import React, { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';

const PlanetsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  useEffect(() => {
    async function API() {
      const { results } = await fetch(url).then((response) => response.json());
      setData(results);
    }
    API();
  }, []);

  return (
    <PlanetsContext.Provider value={ data }>
      { children }
    </PlanetsContext.Provider>
  );
};

export default PlanetsProvider;
