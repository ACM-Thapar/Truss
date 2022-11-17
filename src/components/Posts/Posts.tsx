import React, { useEffect, useState } from 'react';
import { Stack } from '@chakra-ui/react';
import { Community } from '../../atoms/communitiesAtom'
import { Post } from '../../atoms/postsAtom'
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { auth, firestore } from "../../firebase/clientApp";
import usePosts from '../../hooks/usePosts';
import PostItem from './PostItem';

type PostsProps = {
    communityData: Community;
    
};

const Posts:React.FC<PostsProps> = ({ communityData }) => {
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);
    const { postStateValue, setPostStateValue, onVote, onDeletePost, onSelectPost } = usePosts()

    const getPosts = async () => {
        try {
            const postsQuery = query(collection(firestore, 'posts'), where('communityId', '==', communityData.id), orderBy('createdAt', 'desc')) 
            const postDocs = await getDocs(postsQuery)
            const posts = postDocs.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            setPostStateValue(prev => ({
                ...prev,
                posts: posts as Post[],
            }))
            console.log(posts)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
      getPosts()
    }, [])
    

    return (
        <Stack color="black">
            {postStateValue.posts.map((item) => <PostItem post={item} userIsCreator={user?.uid === item.creatorId} userVoteValue={undefined}
            onVote={onVote}
            onSelectPost={onSelectPost}
            onDeletePost={onDeletePost} /> )}
        </Stack>
    )
}
export default Posts;