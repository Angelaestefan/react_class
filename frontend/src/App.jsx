import React, { useEffect } from 'react'
import axios from 'axios';
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

    </div>
  )
}

export default App

