// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { getObjectId, hasPublicTransfer } from '@mysten/sui.js';
import cl from 'classnames';
import { useMemo, useState, useCallback } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import TransferNFTCard from './transfer-nft';
import BottomMenuLayout, {
    Content,
    Menu,
} from '_app/shared/bottom-menu-layout';
import PageTitle from '_app/shared/page-title';
import ExplorerLink from '_components/explorer-link';
import { ExplorerLinkType } from '_components/explorer-link/ExplorerLinkType';
import Icon, { SuiIcons } from '_components/icon';
import Loading from '_components/loading';
import NFTDisplayCard from '_components/nft-display';
import {
    useAppSelector,
    useMiddleEllipsis,
    useNFTBasicData,
    useAppDispatch,
} from '_hooks';
import { accountNftsSelector } from '_redux/slices/account';
import { unwrapNFT, actNFT } from '_redux/slices/sui-objects';

import type { SuiObject } from '@mysten/sui.js';
import type { ButtonHTMLAttributes } from 'react';

import st from './NFTDetails.module.scss';

function NFTdetailsContent({
    nft,
    onClick,
}: {
    nft: SuiObject;
    onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}) {
    const { nftObjectID, nftFields, fileExtensionType } = useNFTBasicData(nft);
    const isTransferable = hasPublicTransfer(nft);
    const shortAddress = useMiddleEllipsis(nftObjectID);
    const dispatch = useAppDispatch();

    const nftAction = nftFields?.actions?.[0];

    const onClickAct = async ({ nft }: { nft: SuiObject }) => {
        console.log('acting', { nft });
        if ('fields' in nft.data) {
            const objectId = nft.data.fields.id;
            if (!nftAction?.fields?.endpoint) return;

            const resp = await dispatch(
                actNFT({
                    nftId: objectId.id,
                    endpoint: new URL(nftAction.fields.endpoint),
                })
            ).unwrap();
            console.log(resp);
        }
    };

    const onClickUnwrap = async ({ nft }: { nft: SuiObject }) => {
        console.log({ nft });
        if ('fields' in nft.data) {
            const objectId = nft.data.fields.id;
            console.log(objectId.id);
            console.log({ nftFields });
            const resp = await dispatch(
                unwrapNFT({
                    nftId: objectId.id,
                })
            ).unwrap();
        }
    };

    const NFTDetails = (
        <div className={st.nftDetails}>
            <div className={st.nftDetailsInner}>
                <div className={st.nftItemDetail}>
                    <div className={st.label}>Object ID</div>
                    <div className={st.value}>
                        <ExplorerLink
                            type={ExplorerLinkType.object}
                            objectID={nftObjectID}
                            title="View on Sui Explorer"
                            className={st.explorerLink}
                            showIcon={false}
                        >
                            {shortAddress}
                        </ExplorerLink>
                    </div>
                </div>

                {fileExtensionType.name !== '' && (
                    <div className={st.nftItemDetail}>
                        <div className={st.label}>Media Type</div>
                        <div className={st.value}>
                            {fileExtensionType?.name} {fileExtensionType.type}
                        </div>
                    </div>
                )}
                {!!nftFields?.metadata?.fields?.attributes && (
                    <>
                        {nftFields.metadata.fields.attributes.fields.keys.map(
                            (key: string, idx: number) => (
                                <div
                                    key={`nft_attribute_${key}`}
                                    className={st.nftItemDetail}
                                >
                                    <div className={st.label}>{key}</div>
                                    <div className={st.value}>
                                        {
                                            nftFields.metadata.fields.attributes
                                                .fields.values[idx]
                                        }
                                    </div>
                                </div>
                            )
                        )}
                    </>
                )}
            </div>
        </div>
    );

    return (
        <div className={st.container}>
            <PageTitle
                title={nftFields?.name || shortAddress}
                backLink="/nfts"
                className={st.pageTitle}
                hideBackLabel={true}
            />
            <BottomMenuLayout>
                <Content>
                    <section className={st.nftDetail}>
                        <NFTDisplayCard
                            nftobj={nft}
                            size="large"
                            expandable={true}
                        />
                        {NFTDetails}
                    </section>
                </Content>
                <Menu stuckClass={st.shadow} className={st.shadow}>
                    <button
                        onClick={onClick}
                        className={cl(
                            'btn',
                            st.action,
                            st.sendNftBtn,
                            'primary'
                        )}
                        disabled={!isTransferable}
                        title={
                            isTransferable
                                ? undefined
                                : "Unable to send. NFT doesn't have public transfer method"
                        }
                    >
                        <Icon
                            icon={SuiIcons.ArrowLeft}
                            className={cl(st.arrowActionIcon, st.angledArrow)}
                        />
                        Send NFT
                    </button>
                    {nftAction && (
                        <button
                            onClick={() => onClickAct({ nft })}
                            className={cl(
                                'btn',
                                st.action,
                                st.sendNftBtn,
                                'primary'
                            )}
                            disabled={!isTransferable}
                            title={
                                isTransferable
                                    ? undefined
                                    : "Unable to send. NFT doesn't have public transfer method"
                            }
                        >
                            <Icon
                                icon={SuiIcons.ArrowLeft}
                                className={cl(
                                    st.arrowActionIcon,
                                    st.angledArrow
                                )}
                            />
                            {nftAction.fields?.name}
                        </button>
                    )}

                    {false && (
                        <button
                            onClick={() => onClickUnwrap({ nft })}
                            className={cl(
                                'btn',
                                st.action,
                                st.sendNftBtn,
                                'primary'
                            )}
                            disabled={!isTransferable}
                            title={
                                isTransferable
                                    ? undefined
                                    : "Unable to send. NFT doesn't have public transfer method"
                            }
                        >
                            <Icon
                                icon={SuiIcons.ArrowLeft}
                                className={cl(
                                    st.arrowActionIcon,
                                    st.angledArrow
                                )}
                            />
                            Unwrap Loot
                        </button>
                    )}
                </Menu>
            </BottomMenuLayout>
        </div>
    );
}

function NFTDetailsPage() {
    const [searchParams] = useSearchParams();
    const [startNFTTransfer, setStartNFTTransfer] = useState<boolean>(false);
    const [selectedNFT, setSelectedNFT] = useState<SuiObject | null>(null);
    const objectId = useMemo(
        () => searchParams.get('objectId'),
        [searchParams]
    );

    const nftCollections = useAppSelector(accountNftsSelector);

    const activeNFT = useMemo(() => {
        const selectedNFT = nftCollections.filter(
            (nftItem) => getObjectId(nftItem.reference) === objectId
        )[0];
        setSelectedNFT(selectedNFT);
        return selectedNFT;
    }, [nftCollections, objectId]);

    const loadingBalance = useAppSelector(
        ({ suiObjects }) => suiObjects.loading && !suiObjects.lastSync
    );

    const startNFTTransferHandler = useCallback(() => {
        setStartNFTTransfer(true);
    }, []);

    if (!objectId || (!loadingBalance && !selectedNFT && !startNFTTransfer)) {
        return <Navigate to="/nfts" replace={true} />;
    }

    return (
        <Loading loading={loadingBalance}>
            {objectId && startNFTTransfer ? (
                <TransferNFTCard objectId={objectId} />
            ) : (
                <NFTdetailsContent
                    nft={activeNFT}
                    onClick={startNFTTransferHandler}
                />
            )}
        </Loading>
    );
}

export default NFTDetailsPage;
