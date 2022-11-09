import React from 'react';
import { Flex, Button, Image } from '@chakra-ui/react';

const OAuthButtons:React.FC = () => {
    
    return (
        <Flex direction="column" width="100%" mb={4}>
            <Button 
            bg="none"
            boxShadow="5px 5px 10px #161719, -5px -5px 10px #1e1f21"
            _hover={{boxShadow: 'inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21'}}
            _focus={{outline: "none"}}>
                <Image src="/images/googlelogo.png" height="20px" mr={2}/>
                Continue with Google
            </Button>
        </Flex>
    )
}
export default OAuthButtons;