import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';

const AuthButtons:React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    return (
        <>
            <Button 
            bg="none"
            boxShadow="5px 5px 10px #161719, -5px -5px 10px #1e1f21"
            _hover={{boxShadow: 'inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21'}}
            _focus={{outline: "none"}}
            fontSize="14px"
            fontWeight="400"
            height="35px"
            display={{base: 'none', sm: 'flex'}}
            width={{base: "70px", md: "100px"}}
            mr={2}
            onClick = {() => setAuthModalState({ open: true, view: 'login' })}
            >
                Log In
            </Button>
            <Button
            bg="none"
            boxShadow="5px 5px 10px #161719, -5px -5px 10px #1e1f21"
            _hover={{boxShadow: 'inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21'}}
            _focus={{outline: "none"}}
            fontSize="14px"
            fontWeight="400"
            height="35px"
            display={{base: 'none', sm: 'flex'}}
            width={{base: "70px", md: "100px"}}
            mr={2}
            onClick = {() => setAuthModalState({ open: true, view: 'signup' })}
            >
                Sign Up
            </Button>
        </>
    )
}
export default AuthButtons;