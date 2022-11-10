import React from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'
import { User } from 'firebase/auth';
import { FaRedditSquare } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';
import { IoSparkles } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineLogin } from 'react-icons/md';
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Icon, Flex, Text } from '@chakra-ui/react';
import { auth } from '../../../firebase/clientApp';
import { signOut } from 'firebase/auth';
import { useSetRecoilState } from 'recoil'; 
import { authModalState } from '../../../atoms/authModalAtom';


type UserMenuProps = {
    user?: User | null;
};

const UserMenu:React.FC<UserMenuProps> = ({ user }) => {
    const setAuthModalState = useSetRecoilState(authModalState)


    return (
        <Menu>
            <MenuButton cursor="pointer" padding="0px 6px"
            borderRadius={4} 
            _hover={{ outline: "1px solid", outlineColor: "gray"}}>
                <Flex align="center">
                        <Flex align="center">
                {user ? 
                (
                    
                    <>
                        <Icon as={FaRedditSquare} fontSize={24} mr={1} color="blue" />
                    
                    <Flex
                    direction="column"
                    display={{ base: "none", lg: "flex"}}
                    fontSize="8pt"
                    align="flex-start"
                    mr={8}>
                        <Text fontWeight={700}>
                            {user?.displayName || user.email?.split("@")[0]}
                        </Text>
                        <Flex>
                            <Icon as={IoSparkles} color="brand.100" mr={1} />
                            <Text color="gray.400">1 karma</Text>
                        </Flex>
                    </Flex>
                    </>
                ) : 
                (
                    <Icon as={VscAccount} fontSize={24} mr={1} color="gray" />
                )}
                </Flex>
                <ChevronDownIcon />
                    </Flex>
            </MenuButton>
            <MenuList color="#5596E6"
            mt={4}
            bg="linear-gradient(145deg, #1c1d1f, #17181a)"
            boxShadow="5px 5px 13px #121214, -5px -5px 13px #222426"
            border="none">
                {user ? (
                    <>
                        <MenuItem fontSize="10pt" fontWeight={700} 
                        _hover={{bg: "linear-gradient(145deg, #17181a, #1c1d1f)"}}
                        _focus={{bg: "none"}}>
                            <Flex align="center">
                                <Icon fontSize={20} mr={2} as={CgProfile} /> 
                                Profile
                            </Flex>
                        </MenuItem>
                        <MenuDivider color="#5596E6"/>
                        <MenuItem fontSize="10pt" fontWeight={700} 
                        _hover={{bg: "linear-gradient(145deg, #17181a, #1c1d1f)"}}
                        _focus={{bg: "none"}}
                        onClick={() => signOut(auth)}>
                            <Flex align="center">
                                <Icon fontSize={20} mr={2} as={MdOutlineLogin} /> 
                            Log Out
                        </Flex>
                        </MenuItem>
                    </>
                ) : (
                    <>
                        <MenuItem fontSize="10pt" fontWeight={700} 
                        _hover={{bg: "linear-gradient(145deg, #17181a, #1c1d1f)"}}
                        _focus={{bg: "none"}}
                        onClick={() => setAuthModalState({ open: true, view: "login"})}>
                            <Flex align="center">
                                <Icon fontSize={20} mr={2} as={MdOutlineLogin} /> 
                            Log In / Sign Up
                        </Flex>
                        </MenuItem>
                    </>
                )}
                
            </MenuList>
        </Menu>
    )
}
export default UserMenu;