import React from "react";
import { Component } from "react";
import HookMqtt from "../../components/Hook/ConnectionSubcription";

class TestConnectionSubcription extends Component{
    render(){
        return(
            <div>
                <HookMqtt/>
            </div>
        )
    }
}
export default TestConnectionSubcription;