import React, { useContext } from 'react';
import PlanetsContext from '../Context/PlanetsContext';

const OrderFilter = () => {
  const { handleClickOrdenation,
    handleClickOrder, handleChangeOrder } = useContext(PlanetsContext);

  const columnFilterOrder = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surfece_water'];

  return (
    <div>
      <form>
        <select
          data-testid="column-sort"
          onChange={ (event) => handleChangeOrder(event) }
        >
          {
            columnFilterOrder.map((element) => (
              <option key={ element } value={ element }>{ element }</option>
            ))
          }
        </select>
        <label htmlFor="acsendente">
          ASCENDENTE
          <input
            id="acsendente"
            type="radio"
            data-testid="column-sort-input-asc"
            value="ASC"
            onClick={ (event) => handleClickOrder(event) }
          />
        </label>
        <label htmlFor="decrescente">
          DECRESCENTE
          <input
            id="decrescente"
            type="radio"
            data-testid="column-sort-input-desc"
            value="DESC"
            onClick={ (event) => handleClickOrder(event) }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => handleClickOrdenation() }
        >
          Ordenar
        </button>
      </form>
    </div>
  );
};

export default OrderFilter;
