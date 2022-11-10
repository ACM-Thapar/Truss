import React, { useState } from 'react';
import CreateCommunityModal from '../../Modal/CreateCommunity/CreateCommunityModal';
import { MenuItem, Flex, Icon } from '@chakra-ui/react';
import {GrAdd} from 'react-icons/gr';

type CommunitiesProps = {
    
};

const Communities:React.FC<CommunitiesProps> = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
            <MenuItem
            _hover={{bg: "linear-gradient(145deg, #17181a, #1c1d1f)"}}
            _focus={{bg: "none"}}
            onClick={() => setOpen(true)}>
                <Flex align="center">
                    <Icon fontSize={20} mr={2} as={GrAdd} />
                    Create Community
                </Flex>
            </MenuItem>
        </>
    )
}
export default Communities;