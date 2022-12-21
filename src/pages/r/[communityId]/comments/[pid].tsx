import React from 'react';
import PageContent from '../../../../components/Layout/PageContent';
import PostItem from '../../../../components/Posts/PostItem';
import usePosts from '../../../../hooks/usePosts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../../firebase/clientApp';

const PostPage:React.FC = () => {
    const { postStateValue, setPostStateValue, onVote, onDeletePost } = usePosts()
    const [user] = useAuthState(auth);

    return (
        <PageContent>
            <>
                {postStateValue.selectedPost && (<PostItem post={postStateValue.selectedPost} onVote={onVote}
                onDeletePost={onDeletePost}
                userVoteValue={postStateValue.postVotes.find((item) => item.postId === postStateValue.selectedPost?.id)?.voteValue}
                userIsCreator={user?.uid === postStateValue.selectedPost?.creatorId}  />)}
            </>
            <>

            </>
        </PageContent>
    )
}
export default PostPage;