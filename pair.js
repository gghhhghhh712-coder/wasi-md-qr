const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
    default: Baileys, useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("maher-zubair-baileys");

function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
};

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
        async function DANEXIOS_PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/'+id)
     try {
            let DanexiosConn = Baileys({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "fatal"}).child({level: "fatal"}),
                browser: ["Chrome (Linux)", "", ""]
             });
             if(!DanexiosConn.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            const code = await DanexiosConn.requestPairingCode(num)
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            DanexiosConn.ev.on('creds.update', saveCreds)
            DanexiosConn.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                await delay(5000);
                let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                await delay(800);
               let b64data = Buffer.from(data).toString('base64');
               
               // QUI CREIAMO IL TUO CODICE CON IL PREFISSO DANEXIOS!
               let session = await DanexiosConn.sendMessage(DanexiosConn.user.id, { text: 'Danexios!' + b64data });

               // IL TUO MESSAGGIO PERSONALIZZATO
               let DANEXIOS_TEXT = `
┏━━━━━━━━━━━━━━━━━━━━━━━━
┃  *DANEXIOS BOT* 
┗━━━━━━━━━━━━━━━━━━━━━━━━
┃ ✅ *SESSIONE GENERATA*
┃
┃ ⚠️ *Attenzione:* Copia il codice sopra
┃ e incollalo nel tuo file config.js 
┃ Non condividerlo con nessuno!
┃
┃ 👤 *Proprietario:* Danexios
┗━━━━━━━━━━━━━━━━━━━━━━━━`;
 await DanexiosConn.sendMessage(DanexiosConn.user.id,{text:DANEXIOS_TEXT},{quoted:session})
 

        await delay(100);
        await DanexiosConn.ws.close();
        return await removeFile('./temp/'+id);
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    DANEXIOS_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("Servizio riavviato");
            await removeFile('./temp/'+id);
         if(!res.headersSent){
            await res.send({code:"Servizio non disponibile"});
         }
        }
    }
    return await DANEXIOS_PAIR_CODE()
});
module.exports = router