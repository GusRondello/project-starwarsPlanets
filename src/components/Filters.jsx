import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function Filters() {
  const { setFilterByName, setNumericalFilter } = useContext(Context);

  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [filterNumValue, setFilterNumValue] = useState(0);

  const handleInputChange = ({ target: { value, name } }) => {
    if (name === 'name-filter') setFilterByName(value);
    if (name === 'numerical-filter') setFilterNumValue(value);
  };

  const handleOptionChange = ({ target: { value, name } }) => {
    if (name === 'column') setColumnFilter(value);
    if (name === 'comparison') setComparisonFilter(value);
  };

  const handleButtonClick = () => {
    setNumericalFilter({
      column: columnFilter,
      comparison: comparisonFilter,
      value: filterNumValue,
    });
  };
  return (
    <form>
      <input
        data-testid="name-filter"
        onChange={ handleInputChange }
        name="name-filter"
      />
      <select
        value={ columnFilter }
        data-testid="column-filter"
        onChange={ handleOptionChange }
        name="column"
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ handleOptionChange }
        value={ comparisonFilter }
        name="comparison"
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        value={ filterNumValue }
        onChange={ handleInputChange }
        name="numerical-filter"
      />
      <button
        type="button"
        onClick={ handleButtonClick }
        data-testid="button-filter"
      >
        FILTER
      </button>
    </form>
  );
}

export default Filters;
