const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');

export type mailOptions = {
    from: string
    to: string
    subject: string
    text: string
    html?: string
};

const sendEmail = async(data: mailOptions)=>{

    try{
        const transporter=nodemailer.createTransport(nodemailerConfig);
        const msg = await transporter.sendMail(data);
        console.log('Message sent: %s', msg.messageId);
    }
    catch(err){
        console.log(err);
    }
    
}

export default sendEmail;