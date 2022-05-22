import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import getPlanets from '../services/getplanets';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [numericalFilter, setNumericalFilter] = useState([]);
  const [order, setOrder] = useState({});
  const [backupData, setBackupData] = useState([]);

  const nameSorter = (a, b) => {
    const minusOne = -1;

    if (a.name > b.name) {
      return 1;
    }

    if (a.name < b.name) {
      return minusOne;
    }

    return 0;
  };

  const ascSorter = (a, b) => {
    const minusOne = -1;

    if (+a.value > +b.value) {
      return 1;
    }

    if (+a.value < +b.value) {
      return minusOne;
    }

    return 0;
  };

  const descSorter = (a, b) => {
    const minusOne = -1;

    if (+a.value < +b.value) {
      return 1;
    }

    if (+a.value > +b.value) {
      return minusOne;
    }

    return 0;
  };

  useEffect(() => {
    const requestApi = async () => {
      const results = await getPlanets();
      results.sort(nameSorter);
      setData(results);
      setBackupData(results);
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
      setBackupData(planetFiltered);
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
        setBackupData(newData);
      } else {
        setData(planets);
        setBackupData(planets);
      }
    };
    filterNumPlanet();
  }, [numericalFilter, planets]);

  useEffect(() => {
    const arraySort = () => {
      const { column, sort } = order;
      const dataMap = backupData.map((planet, index) => ({
        value: planet[column],
        index,
      }));
      if (sort === 'ASC') dataMap.sort(ascSorter);
      if (sort === 'DESC') dataMap.sort(descSorter);
      const orderData = dataMap.map(({ index }) => backupData[index]);
      const dataKnown = orderData.filter((planet) => planet[column] !== 'unknown');
      const dataUnknown = orderData.filter((planet) => planet[column] === 'unknown');
      return [...dataKnown, ...dataUnknown];
    };
    setData(arraySort());
  }, [backupData, order]);

  const ContextValue = {
    data,
    setFilterByName,
    newNumericFilter,
    numericalFilter,
    removeNumericFilter,
    setNumericalFilter,
    setOrder,
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
