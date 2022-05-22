import React, { useContext, useState } from 'react';
import Context from '../context/Context';

export const filterOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Filters() {
  const { filterByName,
    setFilterByName,
    newNumericFilter,
    numericalFilter,
    removeNumericFilter,
    setNumericalFilter } = useContext(Context);

  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [filterNumValue, setFilterNumValue] = useState(0);
  const [columnFilterOpt, setColumnFilterOpt] = useState(filterOptions);

  const handleInputChange = ({ target: { value, name } }) => {
    if (name === 'name-filter') setFilterByName(value);
    if (name === 'numerical-filter') setFilterNumValue(value);
  };

  const handleOptionChange = ({ target: { value, name } }) => {
    if (name === 'column') setColumnFilter(value);
    if (name === 'comparison') setComparisonFilter(value);
  };

  const handleButtonClick = () => {
    setColumnFilterOpt(columnFilterOpt.filter((opt) => opt !== columnFilter));
    newNumericFilter({
      column: columnFilter,
      comparison: comparisonFilter,
      value: Number(filterNumValue),
    });
  };

  const hadleRemoveFilter = ({ target: { name } }) => {
    setColumnFilterOpt([...columnFilterOpt, name]);
    removeNumericFilter(name);
  };

  const handleRemoveAllFilters = () => {
    setNumericalFilter([]);
  };
  return (
    <div>
      <form>
        <input
          data-testid="name-filter"
          onChange={ handleInputChange }
          name="name-filter"
          value={ filterByName }
        />
        <select
          value={ columnFilter }
          data-testid="column-filter"
          onChange={ handleOptionChange }
          name="column"
        >
          {columnFilterOpt.map((filterOption) => (
            <option key={ filterOption }>{filterOption}</option>
          ))}
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
        <button
          type="button"
          onClick={ handleRemoveAllFilters }
          data-testid="button-remove-filters"
        >
          Remove All Filters
        </button>
      </form>
      {numericalFilter.length > 0
      && numericalFilter.map(({ column, comparison, value }) => (
        <div
          data-testid="filter"
          key={ column }
        >
          <span>{`${column} ${comparison} ${value}`}</span>
          <button
            type="button"
            name={ column }
            onClick={ hadleRemoveFilter }
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default Filters;
