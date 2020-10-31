import React,{useState} from 'react';
import GlobarContext from './context';
import {isActiveSession} from "./utils/helpers.js";

class ThemeProvider extends React.Component{
    constructor(){
        super();
        //const ses=isActiveSession();
        //const [ses, setSes]=useState(isActiveSession());

        /* const favs=[];
        const body="";
        if(ses){
            fetchFavorites(body).then((res) => {
                favs.concat([...res.data]);
                console.log("res fetch favorites them:",res.data);
                
            });
        }
        console.log("favoritos desde themprovider",favs); */
        this.state={
            ses:isActiveSession(),
            actSes: ()=>this.setState({ses: isActiveSession()})
        }

       
    }
    render(){
        return(
            <GlobarContext.Provider value={this.state} >
                {this.props.children}
            </GlobarContext.Provider>
        )
    }
}

export default ThemeProvider;