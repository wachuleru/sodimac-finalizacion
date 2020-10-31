import React, { useState, useEffect } from "react";
import { Col } from 'react-bootstrap';
import { fetchPokemonDetail } from "../../services/pokemons";
import { sendFavorites,delFavorite } from "../../services/favorites";
import { setNumberPokemon, getType,isActiveSession } from "../../utils/helpers";
import { IMAGE_ENDPOINT } from "../../utils/constants";
import {
  PokemonContent,
  PokemonThumbnail,
  PokemonFigure,
  PokemonInfo,
  PokemonImage,
  PokemonMeta,
  PokemonName,
  PokemonNumber,
  PokemonPosition,
  PokemonTypes,
  PokemonType,
} from "./styled";


export default function Pokemon({ find }) {
  
  const [pokemon, setPokemon] = useState({});
  const ses=isActiveSession();
  
  const deleteFavorite = (name)=>{
    let  p =window.confirm("Desea Eliminar a este "+name+" de sus favoritos?");
    console.log("borrando :",name);
    /* if(p){ */
      const body={
        "pokeName":name
      }
      delFavorite(body).then((res,error)=>{
        if(error){
          console.log(error);
        }
      });
      /* deleteFavorite(body).then((res,error)=>{
        console.log(res);
        if(error){
          console.log(error);
        }
      }); */

    /* } */
    
  }
  const addFavorite = (number,name)=>{
    let  p =window.confirm("Desea agregar a este "+name+" a sus favoritos?");
    if(p){
      const body={
        "pokeName":name,
        "idPokemon":number
      }
      sendFavorites(body).then((res,error)=>{
        console.log(res);
        if(error){
          console.log(error);
        }
      });
    }
    
  }

  
  useEffect(() => {
    fetchPokemonDetail(find).then((res) => {
      setPokemon({
        ...res.data,
      });
    });
  }, [find]);

  const { name, id, types } = pokemon;

  //let ses=isActiveSession();
  //let token= ses? JSON.parse(localStorage.getItem("session_token")):"";
  /* 
  pensar en como hacer la peticion para agregar favoritos
  */
  

  if (Object.keys(pokemon).length === 0) {
    return (
      <Col>
        <PokemonContent >
          <PokemonThumbnail/>
          <PokemonInfo/>
        </PokemonContent>
      </Col>
    );
  }
  return (
    <Col>
      <PokemonContent color={getType(types)}>
        <PokemonThumbnail className="thumbnail" onClick={ () =>{ses?(window.location.pathname==='/favoritos' ? deleteFavorite(name) : addFavorite( setNumberPokemon(id),name)):console.log("no tiene sesion");; }}>
          <PokemonFigure>
            <PokemonImage
              src={`${IMAGE_ENDPOINT}${setNumberPokemon(id)}.png`}
              alt="Charmander"
            />
          </PokemonFigure>
        </PokemonThumbnail>
        <PokemonInfo>
          <PokemonMeta>
            <PokemonName>{name}</PokemonName>
            <PokemonNumber>
              Número
              <PokemonPosition color={getType(types)}>
                #{setNumberPokemon(id)}
              </PokemonPosition>
            </PokemonNumber>
          </PokemonMeta>
          <PokemonTypes>
            {types.map(({ slot, type }) => {
              const { name } = type;
              return <PokemonType key={slot} type={name} />;
            })}
          </PokemonTypes>
        </PokemonInfo>
      </PokemonContent>
    </Col>
  );
}
