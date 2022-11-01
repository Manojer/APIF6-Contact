const { response } = require('express')
const express = require('express')
const nodemailer = require('nodemailer')
const app = express()
//const port =3500



function sendEmail(){
    
    return new Promise((resolve, reject)=>{

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user:'axislankainfo@gmail.com',
                pass:'nsxfsfdtcohzuhag'
            }
        })

        const mail_configs ={
            from:app.get("from"),
            to:app.get("to"),
            replyTo:app.get("replyTo"),
            subject:app.get("subject"),
            html:app.get("text")
        }
        transporter.sendMail(mail_configs, function(error, info){
            if(error){
                console.log(error)
                return reject({message:'An error has occured'})
            }
            return resolve({message:"Email sent succesfully"})
        })
    })
}



//API Start

app.use(express.json())


app.post('/api/contact/',(req,res)=>{
    const {from}=req.body;
    const {to}=req.body;
    const {replyTo}=req.body;
    const {subject}=req.body;
    //form data start
    const {name}=req.body;
    const {phone}=req.body;
    const {email}=req.body;
    const {website}=req.body;
    const {budget}=req.body;
    const {goals}=req.body;
    
    //form data end
    //const {text}=app.get("name");
    app.set("from",from);
    app.set("to",to);
    app.set("replyTo",replyTo);
    app.set("subject",subject);
    app.set(
        "text",
            '<h1>Client Name: '+name+'</h1>'+
            '<h1>Phone: '+phone+'</h1>'+
            '<h1>Email: '+email+'</h1>'+
            '<h1>Website: '+website+'</h1>'+
            '<h1>Budget: '+budget+'</h1>'+
            '<h1>Goals: '+goals+'</h1>'
    
    
    
    );
    
    if(!to){
        res.status(418).send({message:'Email is not sent'})
    }else{
        sendEmail()
    }

    res.send({
        
        message:`you have successfully sent a message to ${to} from ${from}`
     
    });
    
    
    

});

//API End

app.get('/',(req,res)=>{
    sendEmail()
    .then(response=>res.send(response.message))
    .catch(error=>res.status(500).send(error.message))
})

//app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
app.listen(process.env.PORT || 5600)