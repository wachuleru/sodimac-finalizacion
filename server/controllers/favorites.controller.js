const mongoose = require('mongoose');
const Favorites = require('../models/favorites.model');
//const { verifiedAuth } = require('../midlewares/authToken.midleware');
const ObjectId = mongoose.Types.ObjectId;
//const { createTokenAuth, verifiedToken } = require('../utils');

const readAll = async (req, res, next) =>{
    try{
        let results = [];
        let page = req.query.page;
        let limit = req.query.limit;
        let id = {_id: ObjectId(req.body.idUser)};
        
        
        // let articles = await Article.findAll().paginate({page: page, limit: limit}).exec();
        // results = await User.find({}).paginate({page: page, limit: limit});
        results = await Favorites.find({idUser : id});

        res.status(200).json(results)

    }catch (error) {
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
        let id = {_id: ObjectId(req.body.idUser)};
        let fav ={idUser: id, pokeName: req.body.pokeName};
        const favorite = new Favorites(fav);
        const saveFavorite = await favorite.save(); 
        res.status(201).json(saveFavorite)

    }catch (error) {
        res.status(400).json({ error });
    }
}
const updateOne = async (req, res, next) =>{
    try{
        let id = {_id: ObjectId(req.params.id)};
        const updateFavorite = await User.update({_id: id}, req.body);
        res.status(200).json(updateFavorite)

    }catch (error) {
        res.status(400).json({ error });
    }
}
const deleteOne = async (req, res, next) =>{
    try{
        let id = {_id: ObjectId(req.params.id)};
        const deleteFavorite = await Favorites.remove({_id: id});
        res.status(200).json(deleteFavorite)

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