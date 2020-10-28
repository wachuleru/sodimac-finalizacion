import React, { useState, useEffect } from "react";
import { fetchFavorites } from "../services/favorites.js";
import {isActiveSession} from "../utils/helpers.js";
import { Row } from 'react-bootstrap';
import PokemonF from './Pokemon';
const FavoritesList = () =>{

    const [pokemonList, setpokemonList] = useState([]);
    const ses=isActiveSession();
    console.log("-------session----------",ses);
    
    useEffect(() => {
        let body ="5f8ae44c1ed6e803d872a95b";
        if(ses){
            fetchFavorites(body).then((res) => {
                setpokemonList([...res.data]);
                console.log([...res.data]);
                //console.log(pokemonList);
                console.log("------------------response favorites:------------- ",res);
            });
        }
        

    }, []);

    return(
        
        <Row>
            {pokemonList.map(({ pokeName }) => (
                <PokemonF key={pokeName} find={pokeName} />
            ))}
        </Row>

    )

}

export default FavoritesList