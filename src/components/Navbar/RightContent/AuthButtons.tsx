import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';

const AuthButtons:React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    return (
        <>
            <Button 
            bg="#1a1b1d"
            fontSize="14px"
            boxShadow="12px 12px 12px 0 rgba(0,0,0,.2), -12px -12px 12px 0 rgba(58, 58, 58, 0.3)"
            _hover={{boxShadow: "-12px -12px 16px 0 rgba(58, 58, 58, 0.3),12px 12px 16px 0 rgba(0,0,0,.2)"}}
            _focus={{boxShadow: "-12px -12px 16px 0 rgba(58, 58, 58, 0.3),12px 12px 16px 0 rgba(0,0,0,.2), -12px -12px 16px 0 rgba(58,58,58,0.1) inset, 12px 12px 16px 0 rgba(0,0,0,.2) inset"}}
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
            bg="#1a1b1d"
            fontSize="14px"
            boxShadow="12px 12px 12px 0 rgba(0,0,0,.2), -12px -12px 12px 0 rgba(58, 58, 58, 0.3)"
            _hover={{boxShadow: "-12px -12px 16px 0 rgba(58, 58, 58, 0.3),12px 12px 16px 0 rgba(0,0,0,.2)"}}
            _focus={{boxShadow: "-12px -12px 16px 0 rgba(58, 58, 58, 0.3),12px 12px 16px 0 rgba(0,0,0,.2), -12px -12px 16px 0 rgba(58,58,58,0.1) inset, 12px 12px 16px 0 rgba(0,0,0,.2) inset"}}
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