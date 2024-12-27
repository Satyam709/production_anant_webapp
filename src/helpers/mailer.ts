import nodeMailerConfig from "@/helpers/nodeMailerConfig";
import nodemailer from "nodemailer";
export type mailOptions = {
    from: string
    to: string
    subject: string
    text: string
    html?: string
};

const sendEmail = async(data: mailOptions)=>{

    try{
        const transporter=nodemailer.createTransport(nodeMailerConfig);
        const msg = await transporter.sendMail(data);
        console.log('Message sent: %s', msg.messageId);
    }
    catch(err){
        console.log(err);
    }
    
}

export default sendEmail;