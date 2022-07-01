import React from "react";
import { Component } from "react";
import HookMqtt from "../../components/Hook/PublisherReceiver";

class TestPublisherReceiver extends Component{
    render(){
        return(
            <div>
                <HookMqtt/>
            </div>
        )
    }
}
export default TestPublisherReceiver;