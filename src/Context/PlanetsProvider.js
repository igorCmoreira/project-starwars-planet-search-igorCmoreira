import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const PlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [intermediario, setIntermediario] = useState([]);
  const [filterByName, setFilter] = useState({ name: '' });
  const [numberFilter, setNumberFilter] = useState({});
  const [initialValue, setInitialValue] = useState(0);
  const [filterByNumber, setParameters] = useState({ filterByNumericValues: [] });
  const [contador, setContador] = useState(0);
  const [columnOrder, setColumnOrder] = useState('');
  const [sorted, setSort] = useState('');

  const [ordenation, setOrder] = useState({ order: { sort: 'ASC' } });

  const MENOS_UM = -1;
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

  useEffect(() => {
    async function API() {
      const { results } = await fetch(url).then((response) => response.json());

      // Para fazer a ordenação consultei o seguinte site:
      // https://ricardo-reis.medium.com/o-m%C3%A9todo-sort-do-array-javascript-482576734e0a#:~:text=Por%20padr%C3%A3o%2C%20o%20m%C3%A9todo%20sort,para%20determinar%20as%20suas%20ordens

      results.sort((x, y) => {
        const a = x.name.toUpperCase();
        const b = y.name.toUpperCase();
        // return a == b ? 0 : a > b ? 1 : -1
        if (a === b) {
          return 0;
        } if (a > b) {
          return 1;
        }
        return MENOS_UM;
      });

      setPlanets(results);
      setIntermediario(results);
    }
    API();
  }, []);

  useEffect(() => {
    if (filterByNumber.filterByNumericValues.length !== 0) {
      setPlanets(intermediario);
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
    } else {
      setPlanets(intermediario);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByNumber]);

  useEffect(() => {
    const interOrder = planets;

    // Para fazer a ordenação consultei o seguinte site:
    // https://ricardo-reis.medium.com/o-m%C3%A9todo-sort-do-array-javascript-482576734e0a#:~:text=Por%20padr%C3%A3o%2C%20o%20m%C3%A9todo%20sort,para%20determinar%20as%20suas%20ordens

    if (ordenation.order.sort === 'ASC') {
      interOrder.sort((x, y) => x[ordenation.order.column] - y[ordenation.order.column]);
      setPlanets(interOrder);
    } else if (ordenation.order.sort === 'DESC') {
      interOrder.sort((x, y) => y[ordenation.order.column] - x[ordenation.order.column]);
      setPlanets(interOrder);
    } else {
      setPlanets(interOrder);
    }
  }, [ordenation]);

  const handleChangeOrder = ({ target }) => {
    const { value } = target;
    setColumnOrder(value);
  };

  const handleClickOrder = ({ target }) => {
    const { value } = target;
    setSort(value);
  };

  const handleClickOrdenation = () => {
    setOrder({ order: { column: columnOrder, sort: sorted } });
  };

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
    setPlanets,
    handleChange,
    handleClick,
    handleChangeSelect,
    filterByName,
    initialValue,
    filterByNumber,
    setParameters,
    handleChangeOrder,
    handleClickOrder,
    handleClickOrdenation,
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
