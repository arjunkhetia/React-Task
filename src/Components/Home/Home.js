import React, { Component } from 'react'
import UserForm from '../User/UserForm'
import UserList from '../User/UserList'

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <UserForm></UserForm>
                <UserList></UserList>
            </React.Fragment>
        )
    }
}

export default Home
