import react from 'react';
import axios from 'axios';

function UpdateButton() {
    const handleClick = () => {
        const emp_NUM = "101"; // Example value
        const job_Code = "509"; // Example value

        llamar(emp_NUM, job_Code);
    };

    const llamar = (emp_NUM, job_Code) => {
        axios.put(`http://localhost:8081/db/${emp_NUM}/${job_Code}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error updating database:', error);
            });
    };

    return (
        <button onClick={handleClick}>Update Database</button>
    );
}

export default UpdateButton;
