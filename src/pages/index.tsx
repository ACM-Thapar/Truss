import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import PageContent from '../components/Layout/PageContent'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '../firebase/clientApp'
import { useRecoilValue } from 'recoil'
import { communityState } from '../atoms/communitiesAtom'
import { query, collection, orderBy, limit, getDocs, doc } from 'firebase/firestore' 
import usePosts from '../hooks/usePosts'
import { Post } from '../atoms/postsAtom'
import PostLoader from '../components/Posts/PostLoader'
import { Stack, Text } from '@chakra-ui/react'
import CreatePostLink from '../components/Community/CreatePostLink'
import PostItem from '../components/Posts/PostItem'

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth)
  const [loading, setLoading] = useState(false)
  const communtyStateValue = useRecoilValue(communityState)
  const { postStateValue, setPostStateValue, onSelectPost, onDeletePost, onVote } = usePosts()

  const buildUserHomeFeed = () => {}

  const buildNoUserHomeFeed = async () => {
    setLoading(true)
    try {
      const postQuery = query(collection(firestore, 'posts'), orderBy('voteStatus', 'desc'), limit(10))
      const postDocs = await getDocs(postQuery) 
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setPostStateValue((prev) =>({
        ...prev,
        posts: posts as Post[]
      }))

    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const getUserPostVotes = () => {}

  useEffect(() => {
    if (!user && !loadingUser) {
      buildNoUserHomeFeed()   
    }
  }, [user, loadingUser])
  

  return (
    <PageContent>
      <>
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map((post) => (
              <PostItem
              key={post.id}
              post={post}
              onSelectPost={onSelectPost}
              onDeletePost={onDeletePost}
              onVote={onVote}
              userVoteValue={postStateValue.postVotes.find((item) => item.postId === post.id)?.voteValue}
              userIsCreator={user?.uid === post.creatorId}
              homePage /> 
            ))}
          </Stack>
        )} 
      </>
      <>
        <Text>Hello</Text>
      </>
    </PageContent>
  )
}

export default Home;