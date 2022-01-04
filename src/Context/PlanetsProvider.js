import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const PlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilter] = useState({ name: '' });
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  useEffect(() => {
    async function API() {
      const { results } = await fetch(url).then((response) => response.json());
      setPlanets(results);
    }
    API();
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilter({ [name]: value });
  };

  const data = {
    planets,
    handleChange,
    filterByName,
  };

  return (
    <PlanetsContext.Provider value={ data }>
      {children}
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.func).isRequired,
};

export default PlanetsProvider;
