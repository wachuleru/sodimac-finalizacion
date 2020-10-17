const nodemailer = require('@nodemailer/pro');
const template = require('./templates/confirmacion.js');


const Mail =  (username,email)=>{
    console.log("DATA MAIL: ",data);
    let obj = {
        nombre : username, //Name
        email : email, //Email
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
    // Verificar conexión con la cuenta de GMAIL
     transporter.verify( function(error, success){
        if(error){
            console.log(error);
        }else{
            console.log('Servidor de email esta OK');
        }
    });
    // Opciones del email a enviar
    let mailOptions ={
        from: `${obj.nombre}<${obj.email}>`,
        to: `${obj.nombre}<${obj.email}>`,
        subject: '👻 Email testing 👻',
        text: 'EMAIL DE PRUEBA',
        html: template.emailConfirmacion(obj)
    };
    // Enviar email
     transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log(`
        INFORMACION: '
        ID: ${info.messageId}, 
        RESPONSE: ${info.response}`);
    });
}

module.exports= Mail;
