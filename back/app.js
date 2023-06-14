
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

client.on('message_create', async message => {
    console.log(message)
    const telefono = await message.getContact()
    const nombre = await telefono.pushname
    console.log(nombre)
    if (message.body.toLocaleLowerCase() == 'hola') {
        message.reply('Hola ' + nombre + ' tu numero es: ' + telefono.number);
    }
});
client.on('message', async message => {
    console.log(message)
    const telefono = await message.getContact()
    const nombre = await telefono.pushname
    console.log(nombre)
    if (message.body.toLocaleLowerCase() == 'hola') {
        message.reply('Hola ' + nombre + ' tu numero es: ' + telefono.number);
    }
});


client.initialize();




app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})