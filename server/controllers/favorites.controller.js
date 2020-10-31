const mongoose = require('mongoose');
const User = require('../models/user.model');
const Favorites = require('../models/favorites.model');
//const { find } = require('../models/user.model');
//const { verifiedAuth } = require('../midlewares/authToken.midleware');
const ObjectId = mongoose.Types.ObjectId;
//const { createTokenAuth, verifiedToken } = require('../utils');

const readAll = async (req, res, next) =>{
    try{
        let results = [];
  
        console.log("-header request-",req.headers.param);
        let id = {_id: ObjectId(req.headers.param)};
        
        console.log("id:",id);
     
        //results = await Favorites.find({idUser : id});
        results =await User.findById(id).populate('favorites._id').select('favorites');
        console.log("res readAll:",results.favorites);
        const ress=[];
        results.favorites.map((f)=>{
            //console.log("elemento:",f._id);
            ress.push(f._id);
        })
        console.log("res;:",ress);
        res.status(200).json(ress)

    }catch (error) {
        console.log("error",error)
        res.status(400).json({ error: error });
    }
}
const readOne = async (req, res, next) =>{
    try{
        let id = {_id: ObjectId(req.body.idUser)};
        results = await Favorites.find({idUser : id,pokeName: req.params.pokeName});
       res.status(200).json(results)

    }catch (error) {
        res.status(400).json({ error });
    }
}
const create = async (req, res, next) =>{
    try{
        console.log("-body request-",req.body);
        let id = {_id: ObjectId(req.body.idUser)};
        let fav ={idUser: id, pokeName: req.body.pokeName, url:req.body.url, idPokemon: req.body.idPokemon};
        const favorite = new Favorites(fav);
        const saveFavorite = await favorite.save();
        console.log("favorito creado:",saveFavorite);
        const poke={_id: ObjectId(saveFavorite._id)};
        console.log("idpokemon:",poke);
        console.log("idUser",id._id);
        const useFav= await User.updateOne(
            {_id: id },
            {$addToSet:{favorites: [poke]  }}            
        );
        console.log("intento insert usert",useFav);
        res.status(201).json(saveFavorite);

    }catch (error) {
        res.status(400).json({ error });
    }
}
const updateOne = async (req, res, next) =>{
    try{
        let id = {_id: ObjectId(req.params.id)};
        User.updateOne(

        );
        const updateFavorite = await User.update({_id: id}, req.body);
        res.status(200).json(updateFavorite)

    }catch (error) {
        res.status(400).json({ error });
    }
}
const deleteOne = async (req, res, next) =>{
    try{
        let id = {_id: ObjectId(req.body.idUser)};
        console.log("-body request delete-",req.body);
        
        const deleteFavorite = await Favorites.remove({idUser : id,pokeName: req.body.pokeName});

        console.log("favorito Eliminado:",deleteFavorite);
        const findFav = await Favorites.find({idUser : id}).select('_id');
        console.log("favoritos",(findFav));
       /*  const idFavs=[];
        findFav.map((e)=>{
            idFavs.push((e.id));
        });
        console.log("idsfavs",idFavs);
        const poke={pokemones: ObjectId(findFav.id)};
        
        console.log("idPokemon:",poke); */
        //console.log("idUser",ObjectId(deleteFavorite._id));
        const useFav= await User.updateOne(
            {_id: id },
            {$set: {favorites: [...findFav]}}        
        );
        
            //{ "$pullAll": { "favorites": {"pokemones": [ObjectId(deleteFavorite._id)]} } },
        console.log("intento delete user",useFav);

        res.status(200).json(useFav);
        

    }catch (error) {
        res.status(400).json({ error });
    }
}

module.exports = {
    readAll,
    readOne,
    create,
    updateOne,
    deleteOne
}