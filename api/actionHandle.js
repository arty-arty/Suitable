
var express = require('express');
var cors = require('cors')
var crypto = require("crypto");
const path = require('path');

var { JsonRpcProvider, Network } = require('@mysten/sui.js');
const provider = new JsonRpcProvider(Network.DEVNET);

// const devnetNftFilter = {
//     All: [
//         { EventType: 'MoveEvent' },
//         { Package: '0x2' },
//         { Module: 'devnet_nft' },
//     ],
// };

// //await provider
// const devNftSub = provider.subscribeEvent(
//     devnetNftFilter,
//     (event) => {
//         console.log(event)
//         // handle subscription notification message here
//     }
// );


var app = express();
var PORT = 4000;

app.use(express.json());
app.use(cors())


const actionNFTPackage = '0xed3f1711fd12bc75b064cf884d0306f5c4da39ba'
objectsAllowedToAct = ["0x57f52d959ebb45ee76955b12e1af37067122f2ba"]
const validityTimeMs = 5 * 1000;

tokens = {}
secrets = {}

const generateUID = () => {
    let authToken;
    do {
        authToken = crypto.randomUUID();
    } while (authToken in tokens);

    let secret;
    do {
        secret = crypto.randomUUID();
    } while (secret in secrets);

    tokens[authToken] = secret;
    secrets[secret] = authToken;
    return authToken
}

app.post('/watch/content', async function (req, res) {
    // const input = req.body;
    // console.log(input)
    // const pk = input?.pk
    const authToken = generateUID()
    const secret = tokens[authToken]
    res.json({ authToken, secret });
    return res.end();
})

const validate = (event, secret) => {
    let valid = false;
    if (!event.moveEvent) return false;

    valid =
        (event.moveEvent.packageId == actionNFTPackage) &&
        (event.moveEvent.transactionModule == "action_nft") &&
        (event.moveEvent.type == actionNFTPackage + '::action_nft::ActionViaNFTEvent')

    if (!valid) return false
    const { fields } = event.moveEvent

    if (!fields?.authToken) return false
    if (!fields?.object_id) return false

    if (!fields.object_id in objectsAllowedToAct) return false

    console.log(event.moveEvent)
    const { authToken } = fields
    console.log(tokens[authToken], secret)
    if (!authToken in tokens) return false;
    if (tokens[authToken] != secret) return false;

    console.log(event.moveEvent)
    console.log(event.moveEvent.fields)
    return valid
}

app.get('/watch/content', async function (req, res) {

    if (!req?.query?.txid) return res.end();
    if (!req?.query?.secret) return res.end();
    let { txid, secret } = req.query
    txid = decodeURIComponent(txid);
    console.log({ txid, secret })
    const tx = await provider.getTransactionWithEffects(txid).catch(() => { })
    if (!tx) return res.end()

    //TODO: Object id show on private page
    //TODO: Sender id show on private page

    let valid = tx?.effects?.events.some(event => validate(event, secret))
    console.log(valid)
    if (!valid) return res.end()
    if (Date.now() - tx.timestamp_ms > validityTimeMs) { valid = false; console.log("Expired link") }
    if (!valid) return res.end()
 
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});