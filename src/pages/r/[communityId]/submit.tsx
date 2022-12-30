import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import PageContent from '../../../components/Layout/PageContent';
import NewPostForm from '../../../components/Posts/NewPostForm';
import { auth } from '../../../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import useCommunityData from '../../../hooks/useCommunityData';
import About from '../../../components/Community/About';

const SubmitPostPage:React.FC = () => {
    const [user] = useAuthState(auth);
    const { communityStateValue } = useCommunityData()
    return (
        <PageContent>
            <>
                <Box
                padding="14px 0px" 
                borderBottom="1px solid"
                borderColor="#5596E6"
                >
                    <Text color="#5596E6">
                        Create a post
                    </Text>
                </Box>
                {user && <NewPostForm user={user} communityId={communityStateValue.currentCommunity?.id} communityImageURL={communityStateValue.currentCommunity?.imageURL} />}
            </>
            <>
                {communityStateValue.currentCommunity && (<About communityData={communityStateValue.currentCommunity} />)}
            </>
        </PageContent>
    )
}
export default SubmitPostPage;