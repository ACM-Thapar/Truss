import React from 'react';
import { Flex, Button, Image, Text } from '@chakra-ui/react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';


const OAuthButtons:React.FC = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth); 
    return (
        <Flex direction="column" width="100%" mb={4}>
            <Button 
            isLoading={loading}
            onClick={() => signInWithGoogle()}
            bg="none"
            boxShadow="5px 5px 10px #161719, -5px -5px 10px #1e1f21"
            _hover={{boxShadow: 'inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21'}}
            _focus={{outline: "none"}}>
                <Image src="/images/googlelogo.png" height="20px" mr={2}/>
                Continue with Google
            </Button>
            {error && <Text>{error.message}</Text>}
        </Flex>
    )
}
export default OAuthButtons;