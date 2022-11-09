import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/clientApp';
import AuthButtons from './AuthButtons';
import AuthModal from '../../Modal/Auth/AuthModal'



type RightContentProps = {
    user: any;
};

const RightContent:React.FC<RightContentProps> = ({ user }) => {
    


    return (
        <>
            <AuthModal />
            <Flex justify="center" align="center">
                {user ? <Button onClick={() => signOut(auth)}>Signout</Button> : <AuthButtons />}
            </Flex>
        </>
    )
}
export default RightContent;