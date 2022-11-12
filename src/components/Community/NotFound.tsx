import React from 'react';
import { Flex, Button, Text } from '@chakra-ui/react';
import Link from 'next/link';

const CommunityNotFound:React.FC = () => {
    
    return (
        <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh">
            Sorry that community does not exist
            <Link href="/">
                <Button mt={4}>Go Home</Button>
            </Link>
        </Flex>
    )
}
export default CommunityNotFound;