import React, { useContext } from 'react';
import PlanetsContext from '../Context/PlanetsContext';

const NumberFilter = () => {
  const { handleClick, handleChangeSelect, initialValue } = useContext(PlanetsContext);
  const columFilter = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const valueFilter = ['maior que', 'igual a', 'menor que'];
  return (
    <form method="get">
      <label htmlFor="columFilter">
        <select
          onChange={ (event) => handleChangeSelect(event) }
          data-testid="column-filter"
          name="column"
        >
          {columFilter.map((opti) => (
            <option
              name="column"
              key={ opti }
              value={ opti }
            >
              {opti}
            </option>))}
        </select>
      </label>
      <label htmlFor="valueFilter">
        <select
          onChange={ (event) => handleChangeSelect(event) }
          name="comparison"
          data-testid="comparison-filter"
        >
          {
            valueFilter.map((opti) => (
              <option
                name="comparison"
                key={ opti }
                value={ opti }
              >
                { opti }
              </option>))
          }
        </select>
      </label>
      <label htmlFor="NumberFilter" name="value">
        <input
          type="number"
          name="value"
          data-testid="value-filter"
          value={ initialValue }
          onChange={ (event) => handleChangeSelect(event) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleClick() }
      >
        filtrar
      </button>
    </form>
  );
};

export default NumberFilter;
