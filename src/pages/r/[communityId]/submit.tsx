import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import PageContent from '../../../components/Layout/PageContent';
import NewPostForm from '../../../components/Posts/NewPostForm';
import { auth } from '../../../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

const SubmitPostPage:React.FC = () => {
    const [user] = useAuthState(auth);
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
                {user && <NewPostForm user={user} />}
            </>
            <></>
        </PageContent>
    )
}
export default SubmitPostPage;