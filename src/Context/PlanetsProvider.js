import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const PlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilter] = useState({ name: '' });
  const [numberFilter, setNumberFilter] = useState({});
  const [initialValue, setInitialValue] = useState(0);
  const [filterByNumber, setParameters] = useState({ filterByNumericValues: [] });
  const [contador, setContador] = useState(0);
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  useEffect(() => {
    async function API() {
      const { results } = await fetch(url).then((response) => response.json());
      setPlanets(results);
    }
    API();
  }, []);

  useEffect(() => {
    if (filterByNumber.filterByNumericValues.length !== 0) {
      filterByNumber.filterByNumericValues.map((param) => {
        const { comparison, value, column } = param;
        switch (comparison) {
        case ('igual a'):
          setPlanets(planets.filter((planet) => (
            parseInt(planet[column], 10) === parseInt(value, 10))));
          return 0;

        case ('menor que'):
          setPlanets(planets.filter((planet) => (
            parseInt(value, 10) > parseInt(planet[column], 10))));
          return 0;

        case ('maior que'):
          setPlanets(planets.filter((planet) => (
            parseInt(value, 10) < parseInt(planet[column], 10))));
          return 0;

        default:
          setPlanets(planets);
          return 0;
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByNumber]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilter({ [name]: value });
  };

  const handleChangeSelect = ({ target }) => {
    const { name, value } = target;
    setContador(1);
    setNumberFilter({ ...numberFilter, [name]: value });
    if (name === 'value') {
      setInitialValue(value);
    }
  };

  const firstSearch = () => {
    setPlanets(planets.filter((planet) => parseInt(planet.population, 10) > 0));
  };

  const handleClick = () => {
    if (contador === 0) {
      firstSearch();
      setContador(1);
    } else {
      setParameters({
        filterByNumericValues: [...filterByNumber.filterByNumericValues, numberFilter] });
    }
  };

  const data = {
    planets,
    handleChange,
    handleClick,
    handleChangeSelect,
    filterByName,
    initialValue,
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
