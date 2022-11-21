// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    getExecutionStatusType,
    getObjectExistsResponse,
    getObjectId,
    getTimestampFromTransactionResponse,
    getTotalGasUsed,
    getTransactionDigest,
    getObjectVersion,
} from '@mysten/sui.js';
import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';

import { SUI_SYSTEM_STATE_OBJECT_ID } from './Coin';
import { ExampleNFT } from './NFT';

import type { SuiObject, SuiAddress, ObjectId } from '@mysten/sui.js';
import type { RootState } from '_redux/RootReducer';
import type { AppThunkConfig } from '_store/thunk-extras';

const objectsAdapter = createEntityAdapter<SuiObject>({
    selectId: ({ reference }) => reference.objectId,
    sortComparer: (a, b) =>
        a.reference.objectId.localeCompare(b.reference.objectId),
});

export const fetchAllOwnedAndRequiredObjects = createAsyncThunk<
    SuiObject[],
    void,
    AppThunkConfig
>('sui-objects/fetch-all', async (_, { getState, extra: { api } }) => {
    const state = getState();
    const {
        account: { address },
    } = state;
    const allSuiObjects: SuiObject[] = [];
    if (address) {
        const allObjectRefs =
            await api.instance.fullNode.getObjectsOwnedByAddress(`${address}`);
        const objectIDs = allObjectRefs
            .filter((anObj) => {
                const fetchedVersion = getObjectVersion(anObj);
                const storedObj = suiObjectsAdapterSelectors.selectById(
                    state,
                    getObjectId(anObj)
                );
                const storedVersion = storedObj
                    ? getObjectVersion(storedObj.reference)
                    : null;
                const objOutdated = fetchedVersion !== storedVersion;
                if (!objOutdated && storedObj) {
                    allSuiObjects.push(storedObj);
                }
                return objOutdated;
            })
            .map((anObj) => anObj.objectId);
        objectIDs.push(SUI_SYSTEM_STATE_OBJECT_ID);
        const allObjRes = await api.instance.fullNode.getObjectBatch(objectIDs);
        for (const objRes of allObjRes) {
            const suiObj = getObjectExistsResponse(objRes);
            if (suiObj) {
                allSuiObjects.push(suiObj);
            }
        }
    }
    return allSuiObjects;
});

export const batchFetchObject = createAsyncThunk<
    SuiObject[],
    ObjectId[],
    AppThunkConfig
>('sui-objects/batch', async (objectIDs, { extra: { api } }) => {
    const allSuiObjects: SuiObject[] = [];
    const allObjRes = await api.instance.fullNode.getObjectBatch(objectIDs);
    for (const objRes of allObjRes) {
        const suiObj = getObjectExistsResponse(objRes);
        if (suiObj) {
            allSuiObjects.push(suiObj);
        }
    }
    return allSuiObjects;
});

export const mintDemoNFT = createAsyncThunk<void, void, AppThunkConfig>(
    'mintDemoNFT',
    async (_, { extra: { api, keypairVault }, dispatch }) => {
        const signer = api.getSignerInstance(keypairVault.getKeyPair());
        await ExampleNFT.mintExampleNFT(signer);
        await dispatch(fetchAllOwnedAndRequiredObjects());
    }
);

export const unwrapNFT = createAsyncThunk<
    void,
    { nftId: ObjectId },
    AppThunkConfig
>('unwrapNFT', async (data, { extra: { api, keypairVault }, dispatch }) => {
    const signer = api.getSignerInstance(keypairVault.getKeyPair());
    console.log('unwraping NFT', signer, data.nftId);
    await ExampleNFT.unwrapLootNFT(signer, data.nftId);
    await dispatch(fetchAllOwnedAndRequiredObjects());
});

export const actNFT = createAsyncThunk<
    void,
    { nftId: ObjectId; endpoint: URL },
    AppThunkConfig
>('actNFT', async (data, { extra: { api, keypairVault }, dispatch }) => {
    const signer = api.getSignerInstance(keypairVault.getKeyPair());
    console.log('acting NFT', data.nftId, data.endpoint);
    const authResp = await fetch(data.endpoint, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    });
    const auth = await authResp.json();
    //await ExampleNFT.unwrapLootNFT(signer, data.nftId);
    console.log({ auth });

    const moveCallTxn = await signer.executeMoveCall({
        packageObjectId: '0x3f148d648966857e3d1e5e49563b3d709bff782a',
        module: 'action_nft',
        function: 'authenticate_action',
        typeArguments: [],
        arguments: [data.nftId, auth.authToken],
        gasBudget: 10000,
    });
    if ('EffectsCert' in moveCallTxn) {
        const txId = moveCallTxn.EffectsCert.certificate?.transactionDigest;

        if (txId)
            //@ts-expect-error chrome
            global.chrome.tabs.create({
                url:
                    data.endpoint +
                    '?txid=' +
                    encodeURIComponent(txId) +
                    '&secret=' +
                    auth.secret,
            });
    }

    //await dispatch(fetchAllOwnedAndRequiredObjects());
});

type NFTTxResponse = {
    timestamp_ms?: number;
    status?: string;
    gasFee?: number;
    txId?: string;
};

export const transferSuiNFT = createAsyncThunk<
    NFTTxResponse,
    { nftId: ObjectId; recipientAddress: SuiAddress; transferCost: number },
    AppThunkConfig
>(
    'transferSuiNFT',
    async (data, { extra: { api, keypairVault }, dispatch }) => {
        const signer = api.getSignerInstance(keypairVault.getKeyPair());
        const txn = await ExampleNFT.TransferNFT(
            signer,
            data.nftId,
            data.recipientAddress,
            data.transferCost
        );

        await dispatch(fetchAllOwnedAndRequiredObjects());
        const txnResp = {
            timestamp_ms: getTimestampFromTransactionResponse(txn),
            status: getExecutionStatusType(txn),
            gasFee: txn ? getTotalGasUsed(txn) : 0,
            txId: getTransactionDigest(txn),
        };

        return txnResp as NFTTxResponse;
    }
);
interface SuiObjectsManualState {
    loading: boolean;
    error: false | { code?: string; message?: string; name?: string };
    lastSync: number | null;
}
const initialState = objectsAdapter.getInitialState<SuiObjectsManualState>({
    loading: true,
    error: false,
    lastSync: null,
});

const slice = createSlice({
    name: 'sui-objects',
    initialState: initialState,
    reducers: {
        clearForNetworkSwitch: (state) => {
            state.error = false;
            state.lastSync = null;
            objectsAdapter.removeAll(state);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchAllOwnedAndRequiredObjects.fulfilled,
                (state, action) => {
                    objectsAdapter.setAll(state, action.payload);
                    state.loading = false;
                    state.error = false;
                    state.lastSync = Date.now();
                }
            )
            .addCase(
                fetchAllOwnedAndRequiredObjects.pending,
                (state, action) => {
                    state.loading = true;
                }
            )
            .addCase(
                fetchAllOwnedAndRequiredObjects.rejected,
                (state, { error: { code, name, message } }) => {
                    state.loading = false;
                    state.error = { code, message, name };
                }
            );
    },
});

export default slice.reducer;

export const { clearForNetworkSwitch } = slice.actions;

export const suiObjectsAdapterSelectors = objectsAdapter.getSelectors(
    (state: RootState) => state.suiObjects
);

export const suiSystemObjectSelector = (state: RootState) =>
    suiObjectsAdapterSelectors.selectById(state, SUI_SYSTEM_STATE_OBJECT_ID);
