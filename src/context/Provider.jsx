import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import getPlanets from '../services/getplanets';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const requestApi = async () => {
      const results = await getPlanets();
      setData(results);
      setPlanets(results);
    };
    requestApi();
  }, []);

  const fillterByName = (value) => {
    const planetName = planets.filter(({ name }) => name.includes(value));
    setData(planetName);
  };

  const myContext = {
    data,
    setData,
    planets,
    setPlanets,
    fillterByName,
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
