import React, { useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Flex,
    Text
} from '@chakra-ui/react'
import { useRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';

const AuthModal:React.FC = () => {
    const [modalState, setModalState] = useRecoilState(authModalState);

    const [user, loading, error] = useAuthState(auth)

    const handleClose = () => {
        setModalState((prev) => ({
            ...prev,
            open: false,
        }))
    }

    useEffect(() => {
      if (user) {
        handleClose()
      }
    }, [user])
    
    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent bg="#1a1b1d" color="white">
                    <ModalHeader textAlign="center">
                        {modalState.view === 'login' && 'Log In'}
                        {modalState.view === 'signup' && 'Sign Up'}
                        {modalState.view === 'resetPassword' && 'Reset Password'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDirection="column" justifyContent="center" alignItems="center"
                    pb={6}>
                        <Flex 
                        direction="column" 
                        align="center" 
                        justify="center" 
                        width="70%"
                        >
                        <OAuthButtons />
                        <Text color="dimgray" fontWeight="700">OR</Text>
                        <AuthInputs />
                        </Flex>
                    </ModalBody>
                </ModalContent>
          </Modal>
        </>
    )
}
export default AuthModal;