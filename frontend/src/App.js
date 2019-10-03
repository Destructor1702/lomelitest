import React from 'react';
import './App.css';
import Form from './Form';
import UserTable from './UserTable';


function App() {
    let session = undefined; //todo use sessionstorage and api to store token
    return (
        <div className="App">

            {!session
                ? <div><Form/> <UserTable/></div>
                : <UserTable/>
            }


        </div>
    );
}


export default App;
