import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function Filters() {
  const { fillterByName } = useContext(Context);
  const [name, setName] = useState('');

  const handleNameChange = ({ target: { value } }) => {
    setName(value);
    fillterByName(value);
  };
  return (
    <form>
      <input
        data-testid="name-filter"
        onChange={ handleNameChange }
        value={ name }
      />
    </form>
  );
}

export default Filters;
