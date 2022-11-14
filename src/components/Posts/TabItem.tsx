import React from 'react';
import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { TabItem } from './NewPostForm';

type TabItemProps = {
    item: TabItem;
    selected: boolean;
    setSelectedTab: (value: string) => void;
};

const TabItem:React.FC<TabItemProps> = ({ item, selected, setSelectedTab }) => {
    
    return (
        <Flex
        justify="center"
        align="center"
        flexGrow={1}
        fontWeight={700}
        p="14px 0px"
        cursor="pointer"
        _hover={{ bg:"linear-gradient(145deg, #17181a, #1c1d1f)", boxShadow: "7px 7px 26px #161618, -7px -7px 26px #1e2022" }}
        color = {selected ? "#5596E6" : "white"}
        borderWidth={selected ? "0px 0px 2px 0px" : "0px 0px 1px 0px"}
        borderBottomColor={selected ? "#5596E6" : "transparent"}
        borderRightColor="none"
        onClick={() => setSelectedTab(item.title)}
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