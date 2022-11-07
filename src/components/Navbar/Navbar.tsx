import React from 'react';
import { Flex, Image } from '@chakra-ui/react';

const Navbar:React.FC = () => {
    
    return (
        <Flex color="white" height="44px" padding="6px 12px">
            <Flex>
                <Image src="./images/logo.svg" />
            </Flex>
        </Flex>
    )
}
export default Navbar;