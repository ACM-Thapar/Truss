import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import SearchInput from './SearchInput';

const Navbar:React.FC = () => {
    
    return (
        <Flex color="white" height="48px" padding="6px 12px">
            <Flex align="center">
                <Image src="./images/logo.png" height="200px" />
            </Flex>
            <SearchInput />
        </Flex>
    )
}
export default Navbar;