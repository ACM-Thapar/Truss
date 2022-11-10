import React from 'react';
import { PhoneIcon, SearchIcon } from '@chakra-ui/icons';
import { Flex, InputGroup, Input, InputLeftElement, InputRightElement } from '@chakra-ui/react';

type SearchInputProps = {
    
};

const SearchInput:React.FC<SearchInputProps> = () => {
    
    return (
        <Flex flexGrow={1} mr={2} align="center">
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='#5596E6' mb={1}/>}
                />
                <Input type='tel' placeholder='Search Truss' fontSize="16px" 
                _placeholder={{color: "#5596E6"}} 
                height="34px" 
                bg="none" 
                color="#5596E6"
                outline="none" border="none"  
                boxShadow="inset 5px 5px 7px #141416, inset -5px -5px 7px #212224" 
                transition="color 0.2s ease-out, transform 0.2s ease-out" 
                 
                _hover={{boxShadow: "inset 5px 5px 0px #17181a,inset -5px -5px 0px #1d1e20"}} 
                _focus={{boxShadow: "-12px -12px 16px 0 rgba(58, 58, 58, 0.3),12px 12px 16px 0 rgba(0,0,0,.2), -12px -12px 16px 0 rgba(58,58,58,0.1) inset, 12px 12px 16px 0 rgba(0,0,0,.2) inset"}}
                />
            </InputGroup>
        </Flex>
    )
}
export default SearchInput;