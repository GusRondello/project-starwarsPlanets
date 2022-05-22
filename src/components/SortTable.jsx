import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import { filterOptions } from './Filters';

function SortTable() {
  const { setOrder } = useContext(Context);

  const [sorterColumn, setSorterColumn] = useState('population');
  const [sortOrder, setSortOrder] = useState('ASC');

  const handleSortOrder = ({ target: { value } }) => {
    setSortOrder(value);
  };

  const handleSorterColumn = ({ target: { value } }) => {
    setSorterColumn(value);
  };

  const handleButtonClick = () => {
    setOrder({
      column: sorterColumn,
      sort: sortOrder,
    });
  };
  return (
    <form>
      <select
        value={ sorterColumn }
        data-testid="column-sort"
        onChange={ handleSorterColumn }
      >
        {filterOptions.map((filterOption) => (
          <option key={ `sort-${filterOption}` }>{filterOption}</option>
        ))}
      </select>
      <div>
        <label htmlFor="sort-asc">
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            id="sort-asc"
            name="sort-asc"
            value="ASC"
            checked={ sortOrder === 'ASC' }
            onChange={ handleSortOrder }
          />
          Ascendente
        </label>
      </div>
      <div>
        <label htmlFor="sort-desc">
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            id="sort-desc"
            name="sort-desc"
            value="DESC"
            checked={ sortOrder === 'DESC' }
            onChange={ handleSortOrder }
          />
          Descendente
        </label>
      </div>
      <button
        type="button"
        onClick={ handleButtonClick }
        data-testid="column-sort-button"
      >
        SORT
      </button>
    </form>
  );
}
export default SortTable;
