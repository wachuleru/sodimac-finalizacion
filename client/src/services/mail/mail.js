const nodemailer = require('@nodemailer/pro');
const template = require('./templates/confirmacion.js');

//process maneja informacion del contexto de la app
//process.argv[] devuelve el valor del indice del argumento

/* console.log('0= ',process.argv[0]);
console.log('1= ',process.argv[1]);
console.log('2= ',process.argv[2]);
console.log('3= ',process.argv[3]); */
const Mail = async (data)=>{
    console.log("DATA MAIL: ",data);
    let obj = {
        nombre : data.username, //Name
        email : data.email, //Email
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
    await transporter.verify( function(error, success){
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
    let info = await transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log(`
        INFORMACION: '
        ID: ${info.messageId}, 
        RESPONSE: ${info.response}`);
    });
}

export default Mail;
