import { Ed25519Keypair, JsonRpcProvider, RawSigner, mnemonicToSeed, Ed25519PublicKey, hasPublicTransfer } from '@mysten/sui.js';
// Generate a new Keypair

// console.log({ keypair })
let mnemonic = "clock between surprise impulse spell devote brush train rule shock vacuum impose"
mnemonic = "proud canvas can spirit grunt region labor elite exchange voyage click leader"
const lootContractAddress = ""

// const pKey = new Buffer.from("890029d1d7139465277df82c977affeecb36f3a0", 'hex')
// const pair = { publicKey: new Uint8Array(pKey), secretKey:  }
// console.log(pKey.toString("Hex"), pair)
const keypair = Ed25519Keypair.deriveKeypair(mnemonic);

const provider = new JsonRpcProvider();
const signer = new RawSigner(keypair, provider);


const createNFT = async ({ name, description, image }) => {
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId: '0x2',
        module: 'devnet_nft',
        function: 'mint',
        typeArguments: [],
        arguments: [
            name,
            description,
            image,
        ],
        gasBudget: 10000,
    });
    return moveCallTxn.EffectsCert.effects.effects.created[0].reference.objectId;
}

const createActionNFT = async ({ name, description, image, endpoint, action_name }) => {
    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId: '0x3f148d648966857e3d1e5e49563b3d709bff782a',
        module: 'action_nft',
        function: 'mint',
        typeArguments: [],
        arguments: [
            name,
            description,
            image,
            endpoint,
            action_name
        ],
        gasBudget: 10000,
    });
    return moveCallTxn.EffectsCert.effects.effects.created[0].reference.objectId;
}

const nftId1 = await createActionNFT({
    name: 'Om Nom Run Private Beta',
    description: 'This NFT is your private ticket to content. After you watch send it to friends. Share and care!',
    image: 'https://img.cdn.famobi.com/portal/html5games/images/tmp/OmNomRunTeaser.jpg?v=0.2-d66a2541',
    endpoint: "http://142.93.218.81:3000/watch/content",
    action_name: "Play"
})

// const moveCallTxn = await signer.executeMoveCall({
//     packageObjectId: '0xed3f1711fd12bc75b064cf884d0306f5c4da39ba',
//     module: 'action_nft',
//     function: 'authenticate_action',
//     typeArguments: [],
//     arguments: [
//         //nftId1,
//         "0x57f52d959ebb45ee76955b12e1af37067122f2ba",
//         "933cd94d-85d2-4545-b87e-c1b2ee1a0448"
//     ],
//     gasBudget: 10000,
// });
// console.log(moveCallTxn)
// const nftId2 = await createNFT({
//     name: 'The best NFT ever!',
//     description: 'An NFT better than just an NFT',
//     image: 'ipfs://bafkreibngqhl3gaa7daob4i2vccziay2jjlp435cf66vhono7nrvww53ty'
// })

// return await signer.executeMoveCall({
//     packageObjectId: '0x538cc540a0dd20e6131113c69b6a326b7b81011c',
//     module: 'loot_module',
//     function: 'wrap_my_loot',
//     typeArguments: [
//         '0x2::devnet_nft::DevNetNFT',
//         '0x2::devnet_nft::DevNetNFT',
//     ],
//     arguments: [nftId1, nftId2],
//     gasBudget: 10000,
// });
console.log(nftId1);