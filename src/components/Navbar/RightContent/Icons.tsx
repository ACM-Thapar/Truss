import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";


const Icons:React.FC = () => {
    
    return (
        <Flex>
            <Flex 
            display={{ base: "none", md: "flex"}} 
            align="center" 
            borderRight="1px solid" 
            borderColor="#5596E6">
                <Flex mr={1.5} ml={1.5} padding={3} cursor="pointer"
                borderRadius={100} _hover={{bg: "linear-gradient(145deg, #17181a, #1c1d1f)"}}
                background="linear-gradient(145deg, #1c1d1f, #17181a)"
                boxShadow="5px 5px 13px #121214, -5px -5px 13px #222426"
                >
                    <Icon as={BsArrowUpRightCircle} fontSize={20} color="#5596E6"/>
                </Flex>
                <Flex mr={1.5} ml={1.5} padding={3} cursor="pointer"
                borderRadius={100} _hover={{bg: "linear-gradient(145deg, #17181a, #1c1d1f)"}}
                background="linear-gradient(145deg, #1c1d1f, #17181a)"
                boxShadow="5px 5px 13px #121214, -5px -5px 13px #222426">
                    <Icon as={IoFilterCircleOutline} fontSize={22} color="#5596E6"/>
                </Flex>
                <Flex mr={1.5} ml={1.5} padding={3} cursor="pointer"
                borderRadius={100} _hover={{bg: "linear-gradient(145deg, #17181a, #1c1d1f)"}}
                background="linear-gradient(145deg, #1c1d1f, #17181a)"
                boxShadow="5px 5px 13px #121214, -5px -5px 13px #222426">
                    <Icon as={IoVideocamOutline} fontSize={22} color="#5596E6"/>
                </Flex>
            </Flex>
            <>
                <Flex mr={1} ml={1} padding={3} cursor="pointer"
                borderRadius={100} _hover={{bg: "linear-gradient(145deg, #17181a, #1c1d1f)"}}
                background="linear-gradient(145deg, #1c1d1f, #17181a)"
                boxShadow="5px 5px 13px #121214, -5px -5px 13px #222426">
                    <Icon as={BsChatDots} fontSize={20} color="#5596E6"/>
                </Flex>
                <Flex mr={1} ml={1} padding={3} cursor="pointer"
                borderRadius={100} _hover={{bg: "linear-gradient(145deg, #17181a, #1c1d1f)"}}
                background="linear-gradient(145deg, #1c1d1f, #17181a)"
                boxShadow="5px 5px 13px #121214, -5px -5px 13px #222426">
                    <Icon as={IoNotificationsOutline} fontSize={20} color="#5596E6" />
                </Flex>
                <Flex display={{base: "none", md: "flex"}} mr={1} ml={1} padding={3} cursor="pointer"
                borderRadius={100} _hover={{bg: "linear-gradient(145deg, #17181a, #1c1d1f)"}}
                background="linear-gradient(145deg, #1c1d1f, #17181a)"
                boxShadow="5px 5px 13px #121214, -5px -5px 13px #222426"
                >
                    <Icon as={GrAdd} fontSize={20} />
                </Flex>
            </>
        </Flex>
    )
}
export default Icons;