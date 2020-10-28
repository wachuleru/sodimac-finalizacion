import React from 'react';
import HeaderSection from '../components/HeaderSection';
import FavoritesList from '../components/FavoritesList';
/* import MyContext from '../context'; */ 

const Favorites = () =>{

    return(
        <>
        {/* <MyContext.Consumer> */}
            <HeaderSection 
                title='Favoritos' 
                description='Listado de pokemones favoritos'
                view='favorites'
            />
            <FavoritesList />

        {/* </MyContext.Consumer>  */}
        </> 
    )

}

export default Favorites; 



