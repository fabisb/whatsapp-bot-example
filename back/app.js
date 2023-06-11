
const express = require('express')
const app = express()
const port = 3000



const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});
const qrcode = require('qrcode-terminal');


client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, { small: true });

});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async message => {
    console.log(message)
    const nombre = await message.notifyName
    const telefono = await message.getContact()
     console.log(telefono)
    if (message.body.toLocaleLowerCase() == 'hola') {
        message.reply('Hola ' + nombre);
    }
});


client.initialize();




app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})