import React from 'react';
import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { TabItem } from './NewPostForm';

type TabItemProps = {
    item: TabItem;
    selected: boolean
};

const TabItem:React.FC<TabItemProps> = ({ item, selected }) => {
    
    return (
        <Flex
        justify="center"
        align="center"
        flexGrow={1}
        p="14px 0px"
        cursor="pointer"
        _hover={{ bg: "gray.500" }}
        color = {selected ? "blue.500" : "black"}
        >
            <Flex
            align="center"
            height="20px"
            mr={2}>
                <Icon as={item.icon} />
            </Flex>
            <Text
            fontSize="10pt">
                {item.title}
            </Text>
        </Flex>
    )
}
export default TabItem;