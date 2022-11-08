import React from 'react';
import { Flex, Button } from '@chakra-ui/react';

const AuthButtons:React.FC = () => {
    
    return (
        <>
            <Button 
            bg="#1a1b1d"
            fontSize="14px"
            boxShadow="12px 12px 12px 0 rgba(0,0,0,.2), -12px -12px 12px 0 rgba(58, 58, 58, 0.3)"
            _hover={{boxShadow: "-12px -12px 16px 0 rgba(58, 58, 58, 0.3),12px 12px 16px 0 rgba(0,0,0,.2)"}}
            _focus={{boxShadow: "-12px -12px 16px 0 rgba(58, 58, 58, 0.3),12px 12px 16px 0 rgba(0,0,0,.2), -12px -12px 16px 0 rgba(58,58,58,0.1) inset, 12px 12px 16px 0 rgba(0,0,0,.2) inset"}}>
                Log In
            </Button>
            <Button
            bg="#1a1b1d"
            fontSize="14px"
            boxShadow="12px 12px 12px 0 rgba(0,0,0,.2), -12px -12px 12px 0 rgba(58, 58, 58, 0.3)"
            _hover={{boxShadow: "-12px -12px 16px 0 rgba(58, 58, 58, 0.3),12px 12px 16px 0 rgba(0,0,0,.2)"}}
            _focus={{boxShadow: "-12px -12px 16px 0 rgba(58, 58, 58, 0.3),12px 12px 16px 0 rgba(0,0,0,.2), -12px -12px 16px 0 rgba(58,58,58,0.1) inset, 12px 12px 16px 0 rgba(0,0,0,.2) inset"}}>
                Sign Up
            </Button>
        </>
    )
}
export default AuthButtons;