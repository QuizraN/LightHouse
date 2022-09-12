// const nodemailer = require("nodemailer");

// let mailOptions={
//     from:"quizraAdiba.16@gmail.com",
//     to:"quizra.16@gmail.com",
//     subject:"testing nodemailer",
//     text:"It is Working!"
// }

// const sendEmail = async(mailOptions) => {

// let transporter = nodemailer.createTransport({
//             service: 'smtp.gmail.com',
//             port:465,
//             secure: true,
//             secureConnection: false,
//             auth: {
//                 user: process.env.EMAIL,
//                 pass: process.env.PASSWORD,
//             },
//             tls:{
//                 rejectUnAuthorized:true,
//                 minVersion: "TLSv1.2"
//             }
// });


// console.group("starting to send")
// let info = await transporter.sendMail({
//     from:"quizraAdiba.16@gmail.com",
//     to:"quizra.16@gmail.com",
//     subject:"testing nodemailer",
//     text:"It is Working!"
// });
// console.log(`Message Sent: ${info.messageId}`);
// }


// require('dotenv').config();

// const nodemailer=require('nodemailer');


// let mailOptions={
//     from:"quizraAdiba.16@gmail.com",
//     to:"quizra.16@gmail.com",
//     subject:"testing nodemailer",
//     text:"It is Working!"
// }
// var smtpConfig = {
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true, // use SSL
//     auth: {
//         user: 'quizraAdiba.16@gmail.com',
//         pass: 'seiketsu12'
//     },
//     tls:{
//                         rejectUnAuthorized:true,
//                         minVersion: "TLSv1.2"
//                     }
// };
// var transporter = nodemailer.createTransport(smtpConfig);

// transporter.sendMail(mailOptions,function(err,info){
//     if(err)
//     {
//         console.log("Error:",err);
//     }
//     else{
//         console.log("Message sent!");
//     }
// })


const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'quizraAdiba.16@gmail.com',
        pass: 'srgmdpjrfuekpxrt'
    }
});


let mailOptions={
    from:"quizraAdiba.16@gmail.com",
    to:"quizra.16@gmail.com",
    subject:"Invitation to LightHouse",
    text:"Intranet for Companies",
    html: '<h2 style="color:#ff6600;"> Welcome to <a href="http://localhost:3000/">LightHouse App!</a></h2>'
}
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error.message);
    }
    console.log('success');
});