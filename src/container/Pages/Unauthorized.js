import {Card, Typography} from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function Unauthorized(){
    const {Title} = Typography
    return(
        <Card style={{textAlign: 'center'}}>
            <Title>Unauthorized</Title>
            <p>You are not authotized for selected action</p>
            <Link to='/home'>Go to Home Page</Link>
        </Card>
    )
}
export default Unauthorized