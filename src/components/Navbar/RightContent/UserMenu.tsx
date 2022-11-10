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
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Icon, Flex } from '@chakra-ui/react';

type UserMenuProps = {
    user?: User | null;
};

const UserMenu:React.FC<UserMenuProps> = ({ user }) => {
    
    return (
        <Menu>
            <MenuButton>
                {user ? 
                (
                    <Flex>
                    <>
                        <Icon as={FaRedditSquare} fontSize={24} mr={1} color="blue" />
                    </>
                    </Flex>
                ) : 
                (<div>no user</div>)}
            </MenuButton>
            <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
        </Menu>
    )
}
export default UserMenu;