import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    logger : true,
    port: 465,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "rentmanager14@gmail.com",
      pass: "pcswujwrjomswayg",
    }
});


export const sendMail = (email : string,subject : string ,bodyFile : string)=>{
    try {
        
        const mailOptions = {
            from: '"Rent-MGR" <rentmanager14@gmail.com>',
            to: email,
            subject: subject,
            html:bodyFile
        };
        return new Promise((resolve,reject)=> {
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    throw error;
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve(true)
                }
            });
        })
        
    } catch (error) {
        console.log(error);
        
    }
}