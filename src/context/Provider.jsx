import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import getPlanets from '../services/getplanets';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [numericalFilter, setNumericalFilter] = useState([]);

  useEffect(() => {
    const requestApi = async () => {
      const results = await getPlanets();
      setData(results);
      setPlanets(results);
    };
    requestApi();
  }, []);

  useEffect(() => {
    const lowerCasePlanet = filterByName.toLowerCase();
    const filterPlanetName = () => {
      const planetFiltered = planets
        .filter(({ name }) => name.toLowerCase().includes(lowerCasePlanet));
      setData(planetFiltered);
    };
    filterPlanetName();
  }, [filterByName, planets]);

  const newNumericFilter = (newFilter) => {
    setNumericalFilter([...numericalFilter, newFilter]);
  };

  const removeNumericFilter = (filterRemoved) => {
    const updateFilters = numericalFilter
      .filter(({ column }) => column !== filterRemoved);
    setNumericalFilter(updateFilters);
  };

  useEffect(() => {
    const filterNumPlanet = () => {
      const reduceCallback = (acc, { column, comparison, value }, index) => {
        const filterCallback = (planet) => {
          const comparisonValue = Number(planet[column]);
          if (comparison === 'maior que') return comparisonValue > value;
          if (comparison === 'menor que') return comparisonValue < value;
          return comparisonValue === Number(value);
        };
        if (index === 0) {
          acc = planets.filter(filterCallback);
          return acc;
        }
        return acc.filter(filterCallback);
      };
      if (numericalFilter.length !== 0) {
        const newData = numericalFilter.reduce(reduceCallback, []);
        setData(newData);
      } else {
        setData(planets);
      }
    };
    filterNumPlanet();
  }, [numericalFilter, planets]);

  const ContextValue = {
    data,
    setFilterByName,
    newNumericFilter,
    numericalFilter,
    removeNumericFilter,
    setNumericalFilter,
  };

  return (
    <Context.Provider value={ ContextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
