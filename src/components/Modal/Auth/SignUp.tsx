import React, { useState, useEffect } from 'react';
import { Input, Button, Flex, Text } from "@chakra-ui/react";
import { useSetRecoilState } from 'recoil';
import { authModalState, ModalView } from '../../../atoms/authModalAtom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../../firebase/clientApp';
import { doc, runTransaction, serverTimestamp, setDoc, getDoc, addDoc, collection } from "firebase/firestore";
import { User } from 'firebase/auth'

import { FIREBASE_ERRORS } from '../../../firebase/errors';

type SignUpProps = {
    toggleView: (view: ModalView) => void;
};

const SignUp:React.FC<LoginProps> = ({ toggleView }) => {
    const [signUpForm, setSignUpForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [error, setError] = useState('')
    const [createUserWithEmailAndPassword,
        userCred,
        loading,
        userError] = useCreateUserWithEmailAndPassword(auth);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (error) {
            setError('')
        }
        if (signUpForm.password !== signUpForm.confirmPassword) {
            setError("Passwords don't match")
            return
        }
        createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
        }
        
    

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpForm(prev=>({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    const createUserDocument = async (user: User) => {
        await addDoc(collection(firestore, "users"), JSON.parse(JSON.stringify(user)))
    }

    useEffect(() => {
      if (userCred) {
        createUserDocument(userCred.user)
      }
    }, [userCred])
    
    
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
            <Input 
            required
            name="confirmPassword" 
            type="password" 
            placeholder="confirm password" 
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
            <Text textAlign="center" color="orange" fontSize="12px">{error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}</Text>
            <Button type="submit"
            width="100%"
            height="36px"
            mt={2}
            mb={3}
            isLoading={loading}
            border="none"
            color="#5596E6"
            bg="none"
            boxShadow="5px 5px 10px #161719, -5px -5px 10px #1e1f21"
            transition="0.5 ease"
            _hover={{boxShadow: 'inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21'}}
            _focus={{outline: "none"}}>Sign Up</Button>
            <Flex fontSize="12px" justifyContent="center">
                <Text mr={2}>Already a trussor?</Text>
                <Text color="#5596E6" fontWeight="700" cursor="pointer"
                onClick={() => setAuthModalState(prev => ({
                    ...prev,
                    view: "login",
                }))}>Login In</Text>
            </Flex>
        </form>
    )
}
export default SignUp;