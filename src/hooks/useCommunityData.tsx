import React, { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authModalState } from '../atoms/authModalAtom';
import { doc, runTransaction, serverTimestamp, setDoc, getDocs, getDoc, collection, writeBatch, increment } from "firebase/firestore";
import { communityState, Community, CommunitySnippet } from '../atoms/communitiesAtom';
import { auth, firestore } from '../firebase/clientApp';
import { useRouter } from 'next/router';

const useCommunityData = () => {
    const [user] = useAuthState(auth)
    const router = useRouter()
    const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
    const setAuthModalState = useSetRecoilState(authModalState)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
        if (!user) {
            setAuthModalState({ open: true, view: 'login' })
            return
        }

        setLoading(true);
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
                snippetsFetched: true
            }))
        } catch (error: any) {
            console.log(error)
            setError(error.message)
        }
    }
 
    const joinCommunity = async (communityData: Community) => {
        try {
            const batch = writeBatch(firestore);

            const newSnippet: CommunitySnippet = {
                communityId: communityData.id,
                imageURL: communityData.imageURL || '',
                isModerator: user?.uid === communityData.creatorId,
            } 
            batch.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityData.id), newSnippet) 
            batch.update(doc(firestore, 'communities', communityData.id), {
                numberOfMembers: increment(1),

            })
            await batch.commit()

            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: [...prev.mySnippets, newSnippet],
            }))

        } catch (error: any) {
            console.log(error)
            setError(error.message)
        }
        setLoading(false);
    }

    const leaveCommunity = async (communityId: string) => {
        try {
            const batch = writeBatch(firestore);
            batch.delete(doc(firestore, `users/${user?.uid}/communitySnippets`, communityId))
            batch.update(doc(firestore, 'communities', communityId), {
                numberOfMembers: increment(-1),

            })

            await batch.commit()
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: prev.mySnippets.filter((item) => item.communityId !== communityId),
            }))

        } catch (error: any) {
            console.log(error)
            setError(error.message)
        }
        setLoading(false);
    }

    const getCommunityData = async (communityId: string) => {
        try {
            const communityDocRef = doc(firestore, 'communities', communityId);
            const communityDoc = await getDoc(communityDocRef);

            setCommunityStateValue((prev) => ({
                ...prev,
                currentCommunity: { id: communityDoc.id, ...communityDoc.data()} as Community,
            }))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!user) {
            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: [],
                snippetsFetched: false,
            }))
            return
        }
        getMySnippets()
    }, [user])
    
    useEffect(() => {
        const { communityId } = router.query
        if (communityId && !communityStateValue.currentCommunity) {
            getCommunityData(communityId as string)
        }
    }, [router.query, communityStateValue.currentCommunity])
    

    return {
        communityStateValue,
        onJoinOrLeaveCommunity,
        loading,
    }
}
export default useCommunityData;