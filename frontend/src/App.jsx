import React, { useEffect } from 'react'
import axios from 'axios';
import SearchEditPage from './searchPage';
const App = () => {

    axios.get('http://localhost:8081/users')
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error('Error updating database:', error);
        });

  return (
    <div>
      <SearchEditPage/>
    </div>
  )
}

export default App

