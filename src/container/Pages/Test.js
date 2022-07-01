import { Card, Divider } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import {Typography} from "antd";

const {Title} = Typography
const styleLink = { 
    margin: 20, 
    color: 'black', 
    fontSize: 20,
}

const Test = () => {
        return(
            <Card style={{textAlign : 'center'}}>
                <Title 
                    level={2}
                >
                    Test Page
                </Title>
                <Divider/>
                <Card className="TombolTest" style={{backgroundColor: 'lightgreen', cursor: "pointer"}}>
                    <Link to={'/testcs'} style={styleLink}>
                        Connection and Subcription
                    </Link>
                </Card>
                <Card className="TombolTest" style={{backgroundColor: 'lightgreen', cursor: "pointer"}}>
                    <Link to={'/testpr'} style={styleLink}>
                        Publisher and Receiver
                    </Link>
                </Card>
            </Card>
        )
    }
    
export default Test;