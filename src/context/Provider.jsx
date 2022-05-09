import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import getPlanets from '../services/getplanets';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [numericalFilter, setNumericalFilter] = useState(
    { column: '',
      comparison: '',
      value: '' },
  );

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

  useEffect(() => {
    const filterNumPlanet = () => {
      if (numericalFilter.value === '') {
        return planets;
      }
      const planetFiltered = planets.filter((planet) => {
        const { column, comparison, value } = numericalFilter;
        const compareNumber = Number(planet[column]);
        if (Number.isNaN(compareNumber)) return false;
        if (comparison === 'maior que') return compareNumber > Number(value);
        if (comparison === 'menor que') return compareNumber < Number(value);
        return compareNumber === Number(value);
      });
      setData(planetFiltered);
    };
    filterNumPlanet();
  }, [numericalFilter, planets]);

  const myContext = {
    data,
    setData,
    planets,
    setPlanets,
    filterByName,
    setFilterByName,
    numericalFilter,
    setNumericalFilter,
  };

  return (
    <Context.Provider value={ myContext }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
