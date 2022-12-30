import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import SearchInput from './SearchInput';
import { defaultMenuItem } from '../../atoms/directoryMenuAtom';
import RightContent from './RightContent/RightContent';
import useDirectory from '../../hooks/useDirectory';
import Directory from './Directory/Directory';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/clientApp';

const Navbar:React.FC = () => {
    const [user, loading, error] = useAuthState(auth)
    const { onSelectMenuItem } = useDirectory()
    return (
        <Flex color="white" height="48px" padding="6px 12px" justify={{ md: "space-between"}} mt={2}>
            <Flex align="center" width={{ base: '40px', md: 'auto'}} mr={{ base: 0, md: 2}}
            onClick={() => onSelectMenuItem(defaultMenuItem)}
            cursor="pointer">
                <Image src="./images/logo.svg" height="150px" />
            </Flex>
            {user && <Directory />}
            <SearchInput user={user} />
            <RightContent user={user}/>
        </Flex>
    )
}
export default Navbar;