import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../Context/PlanetsContext';

const NumberFilter = () => {
  const { handleClick,
    handleChangeSelect,
    initialValue,
    filterByNumber,
    setParameters } = useContext(PlanetsContext);
  const valueFilter = ['maior que', 'igual a', 'menor que'];
  const initialColumFilter = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const [columFilter, setColumFilter] = useState(initialColumFilter);
  useEffect(() => {
    if (filterByNumber.filterByNumericValues.length !== 0) {
      const arrayParameters = filterByNumber.filterByNumericValues
        .map((param) => columFilter.filter((fil) => fil !== param.column));
      setColumFilter(arrayParameters[0]);
    }
    console.log(filterByNumber);
  }, [filterByNumber]);

  const handleRemoveClick = ({ target }) => {
    const att = filterByNumber.filterByNumericValues
      .filter((element) => element.column !== target.value);
    setParameters({ filterByNumericValues: att });
  };

  return (
    <div>
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
      <section>
        {
          filterByNumber.filterByNumericValues.map((filters, i) => (
            <div key={ i }>
              <span
                key={ i }
              >
                {`${filters.column} ${filters.comparison} ${filters.value}`}
              </span>
              <button
                key={ i }
                value={ filters.column }
                data-testid="filter"
                type="button"
                onClick={ (event) => handleRemoveClick(event) }
              >
                X

              </button>
            </div>
          ))
        }
      </section>
    </div>
  );
};

export default NumberFilter;
