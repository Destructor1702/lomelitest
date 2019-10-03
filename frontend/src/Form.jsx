import React from 'react'
import './App.css'

class Form extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="columns">

            <div className=" column is-offset-3 card is-6 has-shadow"
                 style={{marginTop: "7em", backgroundColor: "#f0f0f0"}}>
                <div className="card-content login">
                    <p className="title">
                        Login
                    </p>
                    <p className="subtitle">
                        necesitas autentificarte para continuar
                    </p>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Email address"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input" type="email" placeholder="My password"/>
                        </div>
                    </div>
                    <button className="button is-danger is-12"
                            onClick={()=>this.props.handler = true}
                    >Login
                    </button>
                </div>
            </div>

        </div>
    }
}

export default Form