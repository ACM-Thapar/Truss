import { atom } from 'recoil';
import { Timestamp } from 'firebase/firestore';

export type Post = {
    id: string;
    communityId: string;
    creatorId: string;
    creatorDisplayName: string;
    title: string;
    body: string;
    numberOfComments: number;
    voteStatus: number;
    imageURL?: string;
    createdAt: Timestamp;
    communityImageURL?: string; 
}

export type PostVote = {
    id?: string;
    postId: string;
    communityId: string;
    voteValue: number;
}

interface PostState {
    selectedPost: Post | null;
    posts: Post[]
    postVotes: PostVote[];
}

const defaultPostState: PostState = {
    selectedPost: null,
    posts: [],
    postVotes: [],
}

export const postState = atom<PostState> ({
    key: 'postState',
    default: defaultPostState
})