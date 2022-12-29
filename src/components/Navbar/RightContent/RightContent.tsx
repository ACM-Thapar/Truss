import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/clientApp';
import AuthButtons from './AuthButtons';
import AuthModal from '../../Modal/Auth/AuthModal'
import Icons from './Icons';
import UserMenu from './UserMenu';
import { User } from 'firebase/auth'

type RightContentProps = {
    user?: User | null;
};

const RightContent:React.FC<RightContentProps> = ({ user }) => {
    


    return (
        <>
            <AuthModal />
            <Flex justify="center" align="center">
                {user ? (<Icons />) : (<AuthButtons />)}
                <UserMenu user={user} />
            </Flex>
        </>
    )
}
export default RightContent;