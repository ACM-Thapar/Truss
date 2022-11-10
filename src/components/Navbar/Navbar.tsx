import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import SearchInput from './SearchInput';
import RightContent from './RightContent/RightContent';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/clientApp';

const Navbar:React.FC = () => {
    const [user, loading, error] = useAuthState(auth)
    return (
        <Flex color="white" height="48px" padding="6px 12px">
            <Flex align="center">
                <Image src="./images/logo.png" height="200px" />
            </Flex>
            <SearchInput />
            <RightContent user={user}/>
        </Flex>
    )
}
export default Navbar;