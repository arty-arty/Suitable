//Useful patterns https://examples.sui.io/patterns/id-pointer.html
// General Move refernce https://diem.github.io/move/loops.html

module action_nft::action_nft {
  
    use sui::url::{Self, Url};
    use std::string;
    use sui::object::{Self, ID, UID};
    use sui::event;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    /// An example NFT that can be minted by anybody
    struct DevNetNFT has key, store {
        id: UID,
        /// Name for the token
        name: string::String,
        /// Description of the token
        description: string::String,
        /// URL for the token
        url: Url,
        // TODO: allow custom attributes
        actions: vector<Action>,
    }

    struct Action has store, drop {
        endpoint: Url,
        name: string::String,
    }

    struct ActionViaNFTEvent has copy, drop {
        //Crucial for authentication
        object_id: ID,
        authToken : string::String,

        //Less necessary fields
        //creator: address,
        //name: string::String,
    }

    struct MintNFTEvent has copy, drop {
        // The Object ID of the NFT
        object_id: ID,
        // The creator of the NFT
        creator: address,
        // The name of the NFT
        name: string::String,
    }
    
    /// Create a new devnet_nft
    public entry fun mint(
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        endpoint0 : vector<u8>,
        action_name: vector<u8>,
        ctx: &mut TxContext
    ) {
        let actions = std::vector::empty<Action>();

        std::vector::push_back(&mut actions, 
        Action {
             endpoint: url::new_unsafe_from_bytes(endpoint0), 
             name: string::utf8(action_name)
        });

        let nft = DevNetNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            url: url::new_unsafe_from_bytes(url),
            actions,
        };
        let sender = tx_context::sender(ctx);
        event::emit(MintNFTEvent {
            object_id: object::uid_to_inner(&nft.id),
            creator: sender,
            name: nft.name,
        });
        transfer::transfer(nft, sender);
    }

    public entry fun authenticate_action(nft: &DevNetNFT, token: vector<u8>){
        event::emit(ActionViaNFTEvent {
            object_id: object::uid_to_inner(&nft.id),
            authToken : string::utf8(token),
        });
    }

    /// Update the `description` of `nft` to `new_description`
    public entry fun update_description(
        nft: &mut DevNetNFT,
        new_description: vector<u8>,
        _: &mut TxContext
    ) {
        nft.description = string::utf8(new_description)
    }

    /// Permanently delete `nft`
    public entry fun burn(nft: DevNetNFT, _: &mut TxContext) {
        let DevNetNFT { id, name: _, description: _, url: _, actions: _ } = nft;
        object::delete(id)
    }

    /// Get the NFT's `name`
    public fun name(nft: &DevNetNFT): &string::String {
        &nft.name
    }

    /// Get the NFT's `description`
    public fun description(nft: &DevNetNFT): &string::String {
        &nft.description
    }

    /// Get the NFT's `url`
    public fun url(nft: &DevNetNFT): &Url {
        &nft.url
    }
}
