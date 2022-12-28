import React, { useState } from 'react';
import { Input, Button, Flex, Text } from "@chakra-ui/react";
import { useSetRecoilState } from 'recoil';
import { authModalState, ModalView } from '../../../atoms/authModalAtom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';
import { FIREBASE_ERRORS } from '../../../firebase/errors';


type LoginProps = {
    
};

const Login:React.FC<LoginProps> = () => {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    })
    
    const [signInWithEmailAndPassword,
        user,
        loading,
        error] = useSignInWithEmailAndPassword(auth);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        signInWithEmailAndPassword(loginForm.email, loginForm.password);
        }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm(prev=>({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }
    
    const setAuthModalState = useSetRecoilState(authModalState);

    return (
        <form onSubmit={onSubmit}>
            <Input 
            required
            name="email" 
            type="email" 
            placeholder="email" 
            mb={2} 
            color="#5596E6"
            border="none"
            outline="none"
            _focus={{outline: "none", border: "none"}}
            _placeholder={{color: "#5596E6"}}
            boxShadow="inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21"
            onChange={onChange}
            />
            <Input 
            required
            name="password" 
            type="password" 
            placeholder="password" 
            mb={2} 
            color="#5596E6"
            onChange={onChange}
            _placeholder={{color: "#5596E6"}}
            border="none"
            outline="none"
            boxShadow="inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21"
            boxSizing="border-box"
            appearance="none"
            _focus={{outline: "none", border: "none"}}/>
            <Text textAlign="center" color="orange" fontSize="12px">{FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}</Text>
            <Button type="submit"
            width="100%"
            height="36px"
            isLoading={loading}
            mt={2}
            mb={3}
            border="none"
            color="#5596E6"
            bg="none"
            boxShadow="5px 5px 10px #161719, -5px -5px 10px #1e1f21"
            transition="0.5 ease"
            _hover={{boxShadow: 'inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21'}}
            _focus={{outline: "none"}}>Log In</Button>
            <Flex justifyContent="center" mb={2}>
                <Text fontSize="12px" mr={1}>
                    Forgot your password?
                </Text>
                <Text fontSize="12px" cursor="pointer" color="#5596E6" fontWeight="700" onClick={() => setAuthModalState(prev => ({
                    ...prev,
                    view: "resetPassword",
                }))}>
                    Reset
                </Text>
            </Flex>
            <Flex fontSize="12px" justifyContent="center">
                <Text mr={2}>New Here?</Text>
                <Text color="#5596E6" fontWeight="700" cursor="pointer"
                onClick={() => setAuthModalState(prev => ({
                    ...prev,
                    view: "signup",
                }))}>Sign Up</Text>
            </Flex>
        </form>
    )
}
export default Login;