const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smpt.gmail.com',
    secure: false,
    port: 587,
    auth:{
        user: process.env.user_mail,
        pass: process.env.pass_key
    }
})

const sendMail = async (to, template)=>{
    const mailContent = await transporter.sendMail({
        from: `Accredian <${process.env.user_mail}>`,
        to: to,
        subject: "Referal Confirmation",
        html: template
    })
    return mailContent
}

module.exports.referalnoti = async (userName,referreeName,referreeEmail, referrerEmail)=>{
    const content = `<div>
        <img src="https://i.pinimg.com/736x/46/b8/59/46b859188fcedf524746e395e52d6279.jpg" alt="e-learning" width="150"/>
        <p>Hello ${userName},</p>
            <p>Referrer Name:-${referreeName}</p>
            <p>Referrer Email:- ${referreeEmail}</p>
            <p>has successfully referred you to our service!</p>
            <p>
            Thank You!
            <br>
            Regards,
            <br/>
            Accredian</p>
        </div>`;
    
    await sendMail(referrerEmail,content)
    return {success: true, message: "Email sent successfully"}
}