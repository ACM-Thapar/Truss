import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { doc, runTransaction, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../../firebase/clientApp";
import { Community, communityState } from '../../../atoms/communitiesAtom'
import safeJsonStringify from 'safe-json-stringify'
import NotFound from '../../../components/Community/NotFound'
import Header from '../../../components/Community/Header'
import PageContent from '../../../components/Layout/PageContent'
import CreatePostLink from '../../../components/Community/CreatePostLink'
import About from '../../../components/Community/About'
import Posts from '../../../components/Posts/Posts'
import { useSetRecoilState } from 'recoil';

type CommunityPageProps = {
    communityData: Community;
};

const CommunityPage:React.FC<CommunityPageProps> = ({ communityData }) => {
    const setCommunityStateValue = useSetRecoilState(communityState)


    if (!communityData) {
        return (
            <NotFound />
        )
    }

    useEffect(() => {
        setCommunityStateValue((prev) => ({
            ...prev,
            currentCommunity: communityData,
        }))
    }, [communityData])
    

    return (
        <>
            <Header communityData={communityData} />
            <PageContent>
                <>
                    <CreatePostLink />
                    <Posts communityData={communityData} />
                </>
                <>
                    <About communityData={communityData} />
                </>
            </PageContent>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const communityDocRef = doc(firestore, 'communities', context.query.communityId as string)
        const communityDoc = await getDoc(communityDocRef)

        return {
            props: {
                communityData: communityDoc.exists() ? JSON.parse(safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })) : "",
            },
        }
    }
    catch (error)
    {
        console.log(error)
    }
}

export default CommunityPage;