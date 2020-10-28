const mongoose = require('mongoose');
const User = require('../models/user.model');
const { verifiedAuth } = require('../midlewares/authToken.midleware');
const ObjectId = mongoose.Types.ObjectId;
const { createTokenAuth, verifiedToken,verify } = require('../utils');
//const Mail = '../utils/mail/mail.js';
const nodemailer = require('@nodemailer/pro');

const template = require('../utils/mail/templates/confirmacion');

const readAll = async (req, res, next) =>{
    try{
        let results = [];
        let searchString = req.query.search;
        if (searchString){
            
            const regex = new RegExp(searchString, 'i');
            results = await User.find({ text: regex })

            console.log('--results--', results);
            // Para búsquedas avanzadas que utilicen palabras parciales, sinónimos y 
            // errores tipográficos, deberá utilizar soluciones de terceros como 
            // Elastic Search, Solr o Algolia.

                              
            // results = [ {message: 'no results' } ]

        }else{

            // PARA PAGINAR PODEMOS USARIO 
            // Access the provided 'page' and 'limt' query parameters
            let page = req.query.page;
            let limit = req.query.limit;

            // let articles = await Article.findAll().paginate({page: page, limit: limit}).exec();
            // results = await User.find({}).paginate({page: page, limit: limit});
            results = await User.find({});

            res.status(200).json(results)
        }

    }catch (error) {
        console.log('-error-', error);
        res.status(400).json({ error: error });
    }
}
const readOne = async (req, res, next) =>{
    try{
        let id = {_id: ObjectId(req.params.id)};
        const user = await User.findById(id);
        res.status(200).json(user)

    }catch (error) {
        res.status(400).json({ error });
    }
}
const create = async (req, res, next) =>{
    try{
        const user = new User(req.body);
        const saveUser = await user.save(); 
        let obj = {
            nombre : user.username, //Name
            email : user.email, //Email
            hash : '5887d4fc097486a5e9e3e23a', //Id Unico que permitira identificar al usuario
        }
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user:'fullstacksodimac@gmail.com',
                pass:'sodimac.,123'
            },
            tls: {rejectUnauthorized: false}
        });
        let mailOptions ={
            from: `${obj.nombre}<${obj.email}>`,
            to: `${obj.nombre}<${obj.email}>`,
            subject: ' Registro OK ',
            text: 'Registro OK',
            html: template.emailConfirmacion(obj)
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log(`
            INFORMACION: '
            ID: ${info.messageId}, 
            RESPONSE: ${info.response}`);
        });
       /*  console.log("intento correo");
        console.log("user:",user);
         Mail(user.username,user.email);
        console.log("intento correo"); */
        res.status(201).json(saveUser)
        
    }catch (error) {
        res.status(400).json({ error });
    }
}
const updateOne = async (req, res, next) =>{
    try{
        let { id } = req.params;
        const updateUser = await User.update({_id: id}, req.body);
        res.status(200).json(updateUser)

    }catch (error) {
        res.status(400).json({ error });
    }
}
const deleteOne = async (req, res, next) =>{
    try{
        let { id } = req.params;

        const deleteUser = await User.remove({_id: id});
        res.status(200).json(deleteUser)

    }catch (error) {
        res.status(400).json({ error });
    }
}


const authLogin = async (req, res, next)=>{
    const { username, password } = req.body;

    try {
        const user = await User.login(username, password);
       console.log('==USER=', user);
       if(typeof user !== 'undefined' && user.length > 0){
            const dataUser = {
                id: user[0]._id,
                user: user[0].username,
                email: user[0].email
            };

            const token = createTokenAuth(dataUser)
             console.log('--VALIDATE-TOKEN authLogin--', verifiedToken(token));
            console.log('---verify---',verify(token));
            return res.status(200).json({ token: token})

        }else{
            
            return res.status(400).json({ message: "Accesos incorrectos" });

        }


    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

const updateFavorite = async (req, res, next) =>{
    
    try{
        let id = {_id: ObjectId(req.body.id)};
        let pokemon = {_id: ObjectId(req.body.pokemon)};
        console.log("----------updateFavorite----------",req.body);
        const updateFavorite = await User.updateOne(
            {_id: id},
            {$addToSet:{favorites: [pokemon]  }}            
        );

        //const updateFavorite = await User.update({_id: id}, req.body);
        res.status(200).json(updateFavorite)

    }catch (error) {
        res.status(400).json({ error });
    }
}

module.exports = {
    readAll,
    readOne,
    create,
    updateOne,
    deleteOne,
    authLogin,
    updateFavorite
}