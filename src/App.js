import React from 'react';
import './App.css';
import Filters from './components/Filters';
import SortTable from './components/SortTable';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Filters />
      <SortTable />
      <Table />
    </Provider>
  );
}

export default App;
