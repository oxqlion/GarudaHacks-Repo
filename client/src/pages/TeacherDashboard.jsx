import React from 'react'
import { useUser } from '../UserContext'

const TeacherDashboard = () => {

    const { user } = useUser()

    return (
        <div>
            <h1>Hello, {user.name}</h1>
        </div>
    )
}

export default TeacherDashboard