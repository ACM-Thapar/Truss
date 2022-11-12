import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, runTransaction, serverTimestamp, setDoc, getDocs, collection } from "firebase/firestore";
import { communityState, Community, CommunitySnippet } from '../atoms/communitiesAtom';
import { auth, firestore } from '../firebase/clientApp';

const useCommunityData = () => {
    const [user] = useAuthState(auth)
    const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
        if (isJoined) {
            leaveCommunity(communityData.id);
            return
        }
        joinCommunity(communityData)
    }

    const getMySnippets = async () => {
        setLoading(true);
        try {
            const snippetDocs = await getDocs(collection(firestore, `users/${user?.uid}/communitySnippets`));

            const snippets = snippetDocs.docs.map(doc => ({
                ...doc.data()
            }))
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: snippets as CommunitySnippet[],
            }))
        } catch (error) {
            console.log(error)
        }
    }
 
    const joinCommunity = (communityData: Community) => {

    }

    const leaveCommunity = (communityId: string) => {

    }

    useEffect(() => {
        if (!user) {
            return
        }
      getMySnippets()
    }, [user])
    
    return {
        communityStateValue,
        onJoinOrLeaveCommunity,
    }
}
export default useCommunityData;