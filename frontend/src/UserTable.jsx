import React from 'react'
import './App.css'

class UserTable extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        //let users = this.props.users;
        let users = new Array(10).fill(1).map((e, i) => ({name: "testUser" + i, id: i}));
        return <div className="columns">
            <div className=" column is-offset-3 card is-6 " style={{marginTop: "5em", backgroundColor: "#f0f0f0"}}>
                <h1> USERS: </h1>
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>OPTIONS</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users && users.map && users.map(user => <tr>
                                <th>{user.id}</th>
                                <td>{user.name}</td>
                                <td>
                                    <button className="button is-primary"
                                            onClick={() => console.log("NOT IMPLEMENTED YET")}
                                    >edit</button>
                                    &nbsp;&nbsp;
                                    <button className="button is-danger"
                                            onClick={() => console.log("NOT IMPLEMENTED YET")}
                                    >Destroy
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    }
}

export default UserTable