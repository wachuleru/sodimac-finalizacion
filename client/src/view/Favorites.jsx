import React from 'react';
import HeaderSection from '../components/HeaderSection'
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

        {/* </MyContext.Consumer>  */}
        </> 
    )

}

export default Favorites; 



