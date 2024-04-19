
import React, { useState } from 'react';
import axios from 'axios';

// Define el componente de búsqueda y edición
function SearchEditPage() {
  // Estado para almacenar el ID de la persona y los datos recuperados
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);

  
  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  // Función para enviar la solicitud de búsqueda al backend
  const handleSearch = () => {
    axios.get(`http://localhost:8081/users/${userId}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error searching user:', error);
      });
  };

  // Función para manejar cambios en los datos de usuario
  const handleUserDataChange = (event) => {
    // Actualiza los datos de usuario en el estado
    const { name, value } = event.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value
    }));
  };

  // Función para enviar la solicitud de actualización al backend
  const handleUpdate = () => {
    axios.put(`http://localhost:8081/users/${userId}`, userData)
      .then(response => {
        console.log('User data updated successfully:', response.data);
        // Limpia el estado después de la actualización exitosa
        setUserId('');
        setUserData(null);
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <div>
      <h2>Search and Edit User Data</h2>
      <div>
        <label>ID:</label>
        <input type="text" value={userId} onChange={handleUserIdChange} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {userData && (
        <div>
          <h3>User Data:</h3>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={userData.name} onChange={handleUserDataChange} />
          </div>
          <div>
            <label>Phone:</label>
            <input type="text" name="phone" value={userData.phone} onChange={handleUserDataChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type="text" name="email" value={userData.email} onChange={handleUserDataChange} />
          </div>
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
}

export default SearchEditPage;
