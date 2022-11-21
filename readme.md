# Suitable

Meet Suitable. Instant authenticated web2-actions framework for Sui objects. It binds everyday actions to digital assets.
Imagine if everyone could: read the new Harry Potter book, play game of the year from Steam, watch the latest Marvel movie. Just by clicking the asset in the wallet. All of this is simply possible with Suitable's safe authentication protocol.

Demo video

## Suitable technology

Suitable tech is simple and tried. Which makes it safe in production. Suitable stands on three technologies:

1. The Ownership Oracle - a smart contract acting like a gatekeeper.
If it receives an object - it will announce an object id, owner's public auth token.

2. The action server. The action provider adds, a line of code to his digital service. When asked by wallet, it generates one-time public and secret auth token pair. The one-to-one mapping between public and secret token is stored on the server. The same server validates an answer from Ownership Oracle. After validating it provides the action to secret token holder.

3. The wallet. The forked version of Sui wallet serves an example. By fetching available actions and endpoints from 
the object, the wallet provides a UI button to dipatch an instant action. The wallet receives auth token/secret pair from the server. Authenticates the token via Ownership Oracle. Returns the transaction id and secret to be accepted by the server.


## Social mission

Share and care, send it to friends, to family, to people who need it but can't afford it. The right of action is transferred together with the asset.
Share and care by sending to your family. The action is transferred together with the 

Social adoption starts with social value.
This our answer to the next billion users




  Because it is an authentication technology, all of your game inventory, bookmarks, 
 travel with the asset. 





which will announce in public that 
and any message note you provide.

Read a book, play  . Alomost any utility function can be
The right is transfe

With a safe protocol, and convenient user experience. This our contribution to the mission of attracting next billion users to Sui. 

Read more to understand tech details.
must attach solid value to objects. 

<!-- It turns the tables by  -->

Two concepts guarantee safety and rich usability:

The safety 

Which we call ownership

click and NFT in the wallet

Right now, most NFTs have no real-world value. Utility NFTs seem to 

Just picture. The only reason for some to buy it - selling it for more.


Netflix subscription you buy it with SUI. And instantly receive. 
Suitable changes the idustry 
Suitable saves the day by

Car keys NFC, passive actions,

Imagine you pay with SUI for a vacuum cleaner

Ticket for Taylor Swift, you click it,
only for buyers

Imagine creators patreon onyl for supporters,



## Safety


##

## Substantial difference

You might ask why ditch Wallet Connect. It's everywhere. It's classic.
While Wallet Connect, is a safe protocol to log-in via your wallet. The regular userflow looks like this:

1. Remember what domain your NFT is usable at. 
2. Open the domain in your browser.
3. Find and click Wallet Connect button.
4. Open the wallet.
5. Click allow to connect this app in the wallet.
6. Sign a zero transaction in the wallet to prove your identity.
7. Open 

With Suitable the flow reduces to:

1. Open the Sui wallet.
2. See where your NFT is.
3. Click action on your NFT.

If you don't believe 
It almost looks like 

What is more fascinating. Suitable is all about sharing and caring. 
Once you are ready to give away objects to family and friends. Just send it to your children.


## The implications

Subscriptions to VPN, streaming services,
d

simple proven-fair upgrade for your favourite random numbers generator. It is a web2 API that generates true random numbers. [A smart signature](https://github.com/arty-arty/thefairrandomizer/blob/main/contract/mainWithNumber.py#L46) running on decentralized network of Algorand guarantees the fairness. [The proof is stored forever on-chain](https://testnet.algoexplorer.io/tx/RGZQ6AGWZIMDZBWBOVCOQXFH3ITFI5SUGYFEBEHLTVET2Y4XS46A) inside of a transaction note. Thanks to a new [AVM 7 Teal opcodes vrf_verify and block](https://developer.algorand.org/articles/avm-7-new-features/), the very fact that this transaction exists - means mathematically verified randomness. Showing this transaction to the end-user demonstrates complete fairness, transparency, and trust. 

Sounds like an impossible magic-trick? [Learn more about security and fairness](#security-and-fairness) or just play around [with a prototype](https://rand.algotool.app) built using this API.

> "I finally decided and did my golden Tesla giveaway. The hype was huge. I posted my public key and a future block number in advance on Twitter. The raffle was held between the first 256 commenters. In a day, I announced [the winning transaction](https://testnet.algoexplorer.io/tx/4DMYNCS5QYRPQHCXUDO45HC2PVING7N7NSWRCFZTZDYIWKXJWXMQ). The 101 commenter won. He is happy. Everyone can see the proof. No heated arguments like the last time." - John Webthree 

## Our mission

[Cambridge dictionary](https://dictionary.cambridge.org/dictionary/english/fairness) defines fairness as "the quality of treating people equally...". In some sense random is this force which guarantess equal treatment. 

That is probably why, Today, on the Internet, we can observe a lot of sites or applications where randomization is used. Some want to be fair. Some want to look fair. Along with the development of web3, it becomes very important to verify all randomization. More and more crypto projects/web3 projects/gambling projects have started using random numbers in their work. 

People want to know for sure whether there is evidence for the honesty of certain random algorithms. Sometimes the developers don't even tell us about the algorithms they use and about fairness. Our goal is to popularize the verification of randomization with help of Algorand Blockchain and as a result, make someone's life a little better.

[See the prototype](https://rand.algotool.app/) of a [verified lootbox opener](https://rand.algotool.app/) that we built with this API.
Because this is not a single oracle, but a smart signature. The API is capable of generating unlimited random numbers in parallel. With the speed of [Algorand itself, which is fantastic 6000 TPS](https://developer.algorand.org/articles/algorand-boosts-performance-5x-in-latest-upgrade/).

The [transaction proof](https://testnet.algoexplorer.io/tx/4DMYNCS5QYRPQHCXUDO45HC2PVING7N7NSWRCFZTZDYIWKXJWXMQ) looks like this:
```js
{
  "blockSeedTakenFromBlockWithId": 25065081,
  "publicKey": "KkMR2g6BeE6rDBYk3ceqnUeRXcXunsFiNzyTNrM3hC4=",
  "randNumber": 101,
  "proof": "ZfMhbzKHP/+kKaMoDino4ywqccseeVq8BLf9WbiGwCNtxVazdnjmsrpq4heVrJIbyMaDsY8Zxwb2v4rj6wH1O+9vfNAUc8lHqFD25pzqNQg="
}
```

## How to use it in your own project

Simple. Just two steps! First, do a GET request on `https://api.algotool.app/random/publicKey`. Response would be like:
```js
{
	"pk": "2rzL4HR8Ru9/QKYSt8uD0xo3Og8xOF5X0oa0gW5Z+RY=",
	"firstRound": 25086239,
	"futureBlockId": 25086247
}
```
Where `pk` is your public key, and its dual secret key is temorarily stored on the server. You are in. Now you only have to claim the verified random number, when it is ready. The `firstRound` field is the current block on the Algorand chain. The `futureBlockId` field is a future block id, with a yet unknown block hash, to be used as a seed for random number generation.

Second, wait until the block with `futureBlockId` is created, ~12 secs for a 3 block safety-space, ~32 secs for an 8 block safety-space.
By doing post to `https://api.algotool.app/random/proofOfRandom`, with `content-type: application/json`, and json body:

```js 
{
 "pk": "2rzL4HR8Ru9/QKYSt8uD0xo3Og8xOF5X0oa0gW5Z+RY="
}
``` 

redeem your resulting random. You are going to get a response with a verifiable proof, plus some useful info:

```js
{
	"proof": "31/0lmET8j/hU8uxFPcKqEKxbxsr9vGjCUqUOZ+ugxv7lgkVYJqkDbP1r2n3Md7M/I18B8ExKdtFaC7iBSURZggT0/fuahG0vwSDrXC1CQ4=",
	"randNumber": 223,
	"txId": "5AN3UVXXPL6G7AHRX5FGU3KPSVVO3RZ5VBUVDWDOIDF2W3PGAKBQ",
	"txUrl": "https://testnet.algoexplorer.io/tx/5AN3UVXXPL6G7AHRX5FGU3KPSVVO3RZ5VBUVDWDOIDF2W3PGAKBQ",
	"futureBlockId": 25086247
}
```
This `txUrl` is like a bank receipt, but it's a proof of random. Give it to the user. If the user just checks that the public key has not changed. And the future block they agreed to was indeed in the future. Then the proof is 100% reliable [because of the smart signature](https://github.com/arty-arty/thefairrandomizer/blob/main/contract/mainWithNumber.py#L46).

## 🌶️ Bonus

* By changing a few lines. We can run a longer, say a day, or a week long raffle. Just change how many blocks in the future [in the backend code](https://github.com/arty-arty/thefairrandomizer/blob/main/api/verifiedRandomnessServer.js#L19). Publish your public key in Twitter and tell everyone when the futureBlock is. 

* If you want to tag users by their Discord name. To easily find the winner. Could be a Discord bot using our API. Just add this info 
to a [transaction note in the backend](https://github.com/arty-arty/thefairrandomizer/blob/main/api/sendGroupTransaction.js#L79).

* Even if you want the users to claim their results anonymously. We've got a solution. Look at the same [transaction note](https://github.com/arty-arty/thefairrandomizer/blob/main/api/sendGroupTransaction.js#L79). Instead of Discord handle, user's wallet, or any other id, add a salted hash of it. Now after the lottery users can securely and anonymously claim the prize.  

* We forked dcypto library and added Algorand VRF functions. It compiles to WASM, so platform agnostic. This is our present to Algorand community. 
Anyone can use it to whether in Node.js or in browser. Find it in [`/crypto` folder of this repository](https://github.com/arty-arty/thefairrandomizer/tree/main/crypto). Example of usage:

```console
git clone https://github.com/arty-arty/thefairrandomizer.git
cd thefairrandomizer/api
yarn add ../crypto
```
The common use case looks like this:
```js
const dcrypto = require("@deliberative/crypto");
const skFrom = {};

const generateKeyPairAndMemorize = async () => {
    const { pk, sk } = await dcrypto.vrf_algo_keypair();
    skFrom[Buffer.from(pk).toString('base64')] = sk
    return { pk: Buffer.from(pk).toString('base64'), sk }
}

const generateProofFromSeedAndMemorizedSk = async ({ blockSeed, pk }) => {
    const sk = skFrom[pk];
    const proof = await dcrypto.vrf_algo_prove(sk, blockSeed);
     return { proof: Buffer.from(proof).toString('base64') }
}
```

## Security and fairness

The fair randomizer has several layers of protection:

1. Parties agree how many blocks in the future to wait. Could be 3 or 8 blocks from now for more security. This future block will have a unique block hash which will be taken as a random seed. It is pretty hard for attacker to influence it in a favorable way. Yet, still possible. Verifiable pseudo random functions come to the rescue.
    
    A tip: combine N several consecutive block hashes in production. This way a "succesfull hack" will require corrupting N randomly chosen block producers, which is even more cumbersome.

2. One time public-secret VRF keypair is generated. And is shared with the user. In this way the random number producer can not bruteforce different public keys to get a needed result. The user just has to make sure that the promised public key = the public key seen in smart signature verified transaction. 

2. Algorand's [verifiable random function](https://en.wikipedia.org/wiki/Verifiable_random_function) as in [draft-irtf-cfrg-vrf-03](https://tools.ietf.org/html/draft-irtf-cfrg-vrf-03) is actually a keyed variant of hash that provides a 80-byte proof that it's output was calculated correctly. The proof is proven to be a pseudorandom function of the seed.

3. In AVMv7 Teal Contract language of Algorand introduced an on-chain method - vrf_verify opcode. Which takes the public key, seed, and a proof - and says if the pseudorandom function was calculated correctly. 
For this prototype we use a [logic signature](https://developer.algorand.org/docs/get-details/dapps/smart-contracts/smartsigs/modes/#logic-signatures) in a mode when it governs a special account uniqely assigned to it's code. It allows or denies transactions based on certain criteria.

Here it parses the note like this:

```python
    futureBlockId = JsonRef.as_uint64(
        Txn.note(), Bytes("blockSeedTakenFromBlockWithId"))
    message = Block.seed(futureBlockId)
    proof = Base64Decode.std(JsonRef.as_string(
        Txn.note(), Bytes("proof")))
    randNumber0 = JsonRef.as_uint64(
        Txn.note(), Bytes("randNumber"))
    publicKey = Base64Decode.std(JsonRef.as_string(
        Txn.note(), Bytes("publicKey")))
```

And approves a transaction only if the note contains the truth. Only if:

```python
   program = And(
        ...
        randNumber0 == GetByte(proof, Int(0)),
        VrfVerify.algorand(message, proof, publicKey).outputReducer(
            lambda x, y: y == Int(1))
    )
```

4. Logic signature could be replayed with the same proof, seed, and publickey satisfying the vrf_verify equation. How do we protect? By checking the group from inside of a signature, we require another transaction from our authorized account in this group. Without signing by authorized account each time, replayed transactions by other people just fail.

```python
   program = And(
        Gtxn[1].sender() == Addr(feeprovider),
        Gtxn[1].receiver() == Addr(feeprovider),
    )
```

Another nice feature of Algorand is pooled fee. In our setup actually this authorized account pays the fee for the whole group. See more about [group transactions (atomic transfers)](https://developer.algorand.org/docs/get-details/atomic_transfers/)


## Examples of usability

Here are the examples of what can be built using our API.
The end-users might say something along the lines:

> "I finally decided and did my golden Tesla giveaway. The hype was huge. I posted my public key and a future block number in advance on Twitter. The raffle was held between the first 256 commenters. In a day, I announced [the winning transaction](https://testnet.algoexplorer.io/tx/4DMYNCS5QYRPQHCXUDO45HC2PVING7N7NSWRCFZTZDYIWKXJWXMQ). The 101 commenter won. He is happy. Everyone can see the proof. No heated arguments like last time." - John Webthree 

1. Play-to-Earn Gaming

Gaming has gained unprecedented popularity in the 21st century. We can see a [constant increase in the number of players, games and platforms](https://www.digitaljournal.com/pr/play-to-earn-nft-games-market-share-and-growth-insights-2022-global-size-analysis-demand-scope-future-trends-growing-opportunities-and-forecast-to-2027). And more recently, over the past few years, play-to-earn gaming has appeared. And in all play-to-earn projects users must buy nft or tokens in order to play or earn a significant amount of money. As a result, users risk 🔥🪙 their crypto savings. And often in such projects, the blockchain is used mainly for anonymity and convenient interaction with crypto/nft assets.

So what's the deal with randomization? Usually the rewards for some actions/missions in games are determined using random. For example, you are told that you will receive a reward with a 10% chance. But you cannot check the fairness of this 10% random. But you need to pay for each attempt to get a reward. As a result, the user loses his money.

With our randomizer, the randomness of every reward in the game can be verified.

2. Gambling

The main area where randomization is constantly used is gambling. Despite the fact that in some countries everything related to gambling is prohibited, slot machines, online lotteries, case opening and other features are gaining more and more popularity. Let's put gambling philosophy aside for another time and talk about fairness in gambling. Many online platforms do not have a fair random and people lose their money even without a single chance of winning. Or they are told that on average a gambling game returns 98% of the money wagered, but in fact this percentage can be less than 50%. 

The Fair Randomizer, with the help of Algorand Blockchain, can increase user confidence in any legal gambling platform that they seek to use.

3. Raffles or lotteries

So many companies today are constantly raffling off some crypto/nfts/other nice things to attract and stimulate users. But a lot of raffles are fake or rewards go to specifically chosen people.
With the help of our randomizer, you will be able to observe the fairness of the random and enjoy some prizes if you win.

4. [Fair random for anyone](https://rand.algotool.app/)!

Any user of our randomizer will be able to generate some numbers for any purpose. For example, to choose which of your friends will seek others in a hide-and-seek game. Or which friend gets 🏆 your golden Tesla. 

It's like random.org, but with a proof forever inscribed on-chain. The proof can be shown to anyone in the world. With a simple link. 
Mathematically secured by [Verifiable Random Functions on Algorand](https://developer.algorand.org/articles/randomness-on-algorand/). Due to [our smart signature](https://github.com/arty-arty/thefairrandomizer/blob/main/contract/mainWithNumber.py#L43), random numbers can be published in transaction note, only if proven by decentralized network of Algorand. So, the very fact of transaction means - each published random number was verified! 
It's the ultimate random for the age of web3!  
