import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import PageContent from '../../../components/Layout/PageContent';
import NewPostForm from '../../../components/Posts/NewPostForm';

const SubmitPostPage:React.FC = () => {
    
    return (
        <PageContent>
            <>
                <Box
                padding="14px 0px" 
                borderBottom="1px solid"
                borderColor="white"
                >
                    <Text>
                        Create a post
                    </Text>
                </Box>
                <NewPostForm />
            </>
            <></>
        </PageContent>
    )
}
export default SubmitPostPage;