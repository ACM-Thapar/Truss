import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { doc, runTransaction, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../../firebase/clientApp";
import { Community } from '../../../atoms/communitiesAtom'
import safeJsonStringify from 'safe-json-stringify'

type CommunityPageProps = {
    communityData: Community;
};

const CommunityPage:React.FC<CommunityPageProps> = ({ communityData }) => {
    
    return <div>Welcome to {communityData.id}</div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const communityDocRef = doc(firestore, 'communities', context.query.communityId as string)
        const communityDoc = await getDoc(communityDocRef)

        return {
            props: {
                communityData: JSON.parse(safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() }))
            },
        }
    }
    catch (error)
    {
        console.log(error)
    }
}

export default CommunityPage;