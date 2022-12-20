import React from 'react';
import { Community, communityState } from '../../atoms/communitiesAtom'
import { Button, Image, Flex, Box, Icon, Text } from '@chakra-ui/react';
import { FaReddit } from 'react-icons/fa';
import useCommunityData from '../../hooks/useCommunityData';

type HeaderProps = {
    communityData: Community;
};

const Header:React.FC<HeaderProps> = ({ communityData }) => {
    const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData()

    const isJoined = !!communityStateValue.mySnippets.find(item => item.communityId === communityData.id);
    return (
        <Flex
        direction="column" width="100%" height="146px">
            <Box height="50%" bg="none" />
            <Flex justify="center" bg="none" flexGrow={1}
            boxShadow="inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21">
                <Flex width="95%" maxWidth="860px">
                    {communityStateValue.currentCommunity?.imageURL ? (
                        <Image src={communityStateValue.currentCommunity?.imageURL} 
                        borderRadius="full"
                        alt="Dan"
                        boxSize="66px"
                        position="relative"
                        color="blue.500"
                        top={-3}
                        border="4px solid white
                        " />
                    ) : (
                        <Icon as = {FaReddit} 
                        fontSize={64} 
                        position="relative" 
                        top={-3} 
                        color="blue.500" 
                        border="4px solid white"
                        borderRadius="50%"/>
                    )}
                    <Flex padding="10px 16px">
                        <Flex direction="column" mr={6}>
                            <Text
                            fontWeight={800}
                            fontSize="16pt"
                            color="#5596E6"
                            >
                                {communityData.id}
                            </Text>
                            <Text
                            fontWeight={600}
                            fontSize="10pt"
                            color="gray.400"
                            >
                                r/{communityData.id}
                            </Text>
                        </Flex>
                        <Button
                        bg="none"
                        outline="none"
                        border="none"
                        height="30px"
                        pr={6}
                        pl={6}
                        boxShadow={isJoined ? 'inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21' : "5px 5px 10px #161719, -5px -5px 10px #1e1f21"}
                        _hover={{ boxShadow: isJoined ? 'inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21' : "5px 5px 10px #161719, -5px -5px 10px #1e1f21" }}
                        onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}>
                            {isJoined ? "Joined" : "Join"}
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
            
        </Flex>
    )
}
export default Header;