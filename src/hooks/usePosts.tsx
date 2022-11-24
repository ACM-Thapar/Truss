import React from 'react';
import { deleteObject ,ref } from 'firebase/storage'
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    query,
    where,
    writeBatch,
} from "firebase/firestore";
import { useRecoilState } from 'recoil';
import { postState, Post } from '../atoms/postsAtom'
import { storage, firestore } from '../firebase/clientApp'

const usePosts:React.FC = () => {
    const [postStateValue, setPostStateValue] = useRecoilState(postState)

    const onVote = async () => {

    } 

    const onSelectPost = () => {

    }

    const onDeletePost = async (post: Post): Promise<boolean> => {
        try {
            if (post.imageURL) {
                const imageRef = ref(storage, `posts/${post.id}/image`)
                await deleteObject(imageRef)
            }

            const postDocRef = doc(firestore, 'posts', post.id!)
            await deleteDoc(postDocRef)

            setPostStateValue((prev) => ({
                ...prev,
                posts: prev.posts.filter((item) => item.id !== post.id),
            }))

            return true;
        } catch (error) {
            return false;
        }
        
    }

    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onDeletePost,
        onSelectPost,
    }
}
export default usePosts;