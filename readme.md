# Suitable

Meet Suitable. Instant authenticated web2-actions framework for Sui objects. It binds everyday actions to digital assets.
Imagine if everyone could: read the new Harry Potter book, play game of the year from Steam, watch the latest Marvel movie. Just by clicking the asset in the wallet. All of this is simply possible with Suitable's safe authentication protocol.

[A simple demo of a private Pre-Sale game access](https://www.youtube.com/watch?v=agwS91HOJmk)
![image](https://user-images.githubusercontent.com/86002990/203318068-5389edbd-e722-4ecf-a57a-4dfed79a0177.png)

## Suitable technology

Suitable tech is simple and tried. Which makes it safe in production. Suitable stands on three technologies:

1. [The Ownership Oracle](https://github.com/arty-arty/Suitable/blob/69219fcc0347743a270a30cea2928c7b770e3bba/contract/sources/action_nft.move#L83) - a smart contract acting like a gatekeeper.
If it receives an object - it will announce an object id, owner's public auth token.

2. The action server. The action provider adds, a line of code to his digital service. When asked by wallet, it [generates one-time public and secret auth token pair](https://github.com/arty-arty/Suitable/blob/69219fcc0347743a270a30cea2928c7b770e3bba/api/actionHandle.js#L42). The one-to-one mapping between public and secret token is stored on the server. The same [server validates the answer](https://github.com/arty-arty/Suitable/blob/69219fcc0347743a270a30cea2928c7b770e3bba/api/actionHandle.js#L68) from Ownership Oracle. After validating it provides the action to secret token holder.

3. The wallet. The [forked version of Sui wallet](https://github.com/arty-arty/Suitable/blob/85dbfc32ac1ad95d995a6a775d0f43174d1eb494/wallet/src/ui/app/redux/slices/sui-objects/index.ts#L110) serves an example. By fetching available actions and endpoints from the object, the wallet provides a UI button to dipatch an instant action. The wallet receives auth token/secret pair from the server. Authenticates the token via Ownership Oracle. Returns the transaction id and secret to be accepted by the server.

For the wallet user, it looks like instantly they got their action done. A new tab opens in a second, with their content.

## Social mission

Suitable is not meant to be the single authentication method. It is all about choice. After you use the actionable-object. The provider might allow you to stay logged in. So, just passively having the item and getting all the priveleges would be possible. If one wants, he can pin the action to their home screen. Just like an app shortcut.
In this way, the actions are always one tap distance from the user. Done whenever they want.

Share and care 💞. Send the actionable-object to friends, to family, to people who need it, but can't afford it. The right of action is transferred together with the asset. Social adoption starts with social value. This is how to add value. This our answer to the next billion users.

## Suitable for creators and companies

We are building a Suitable Marketplace for actionable objects. Creators can add actions without programming.
Streamers, artists, musicians, inventors, the greatest creative minds. Can share their content with limited edition objects.

> With a piece of art, I received a whole private gallery. All the latest creations from my favourite artist. So much more utility than just an NFT picture. Love it. Would gift it to my sister and friends. - Sue Webthree

Suitable formalized the idea of actions. In this formalism, almost any utility function can be added. Crowdsourcing, esports, tickets, streaming, movies, music, games, software, NFC key-pass: every field benefits from instant actions.

Imagine unlocking a Tesla car with Sui wallet. Suitable protocol can be enchanced to allow authentication via NFC. Same tech, another communication channel.
There is no need to have an app for each key-pass, just a wallet.

## Substantial difference

You might ask why ditch Wallet Connect. It's everywhere. It's classic.
While Wallet Connect, is a safe protocol to log-in via your wallet. The regular userflow looks like this:

1. Remember what domain your NFT is usable at. 
2. Open the domain in your browser.
3. Find and click Wallet Connect button.
4. Open the wallet.
5. Click allow to connect this app in the wallet.
6. Sign a zero transaction in the wallet to prove your identity.
7. Find the desired action page and click it.

With Suitable the flow reduces to:

1. Open the Sui wallet.
2. See where your NFT is.
3. Click action on your NFT.

What is more fascinating. Suitable is all about sharing and caring. 
Once you are ready to give away objects to family and friends. Just send it to your children or parents. No need to explain how it works. One tap. All the rights for action are bound to the asset. User needs one tap to act. One tap to spread the vibe of web3. Spreading it from friend to friend to billions.















<!-- You bought a ticket to a  gaming tournament. Just click it to watch the stream. This easy. After the event is over, the same ticket 
leads to a private QA.

Crowdsourcing made better. For the early, -->

<!-- 
## Some examples


Buying 

 -->


<!-- If you don't believe and
It almost looks like magic -->
<!-- ## The implications
Subscriptions to VPN, streaming services, -->

<!-- Share and care by sending to your family. The action is transferred together with the  -->
<!-- 

The action is a vague term. Suitable framework can, 






which will announce in public that 



and any message note you provide.

Read a book, play  . Alomost any utility function can be
The right is transfe

With a safe protocol, and convenient user experience. This our contribution to the mission of attracting next billion users to Sui. 

Read more to understand tech details.
must attach solid value to objects.  -->

<!-- It turns the tables by  -->

<!-- Two concepts guarantee safety and rich usability:

The safety 

Which we call ownership

click and NFT in the wallet

Right now, most NFTs have no real-world value. Utility NFTs seem to be a tone better

Just picture. The only reason for some to buy it - selling it for more.


 subscription you buy it with SUI. And instantly receive. 
Suitable changes the idustry 
Suitable saves the day by -->
