import React from 'react';
import { Post } from '../../atoms/postsAtom'
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import { Flex, Button, Text, Box, Icon, Stack } from "@chakra-ui/react"; 

type PostItemProps = {
    post: Post;
    userIsCreator: boolean;
    userVoteValue?: number;
    onVote: () => {};
    onDeletePost: () => {};
    onSelectPost: () => void;

};

const PostItem:React.FC<PostItemProps> = ({ post, userIsCreator, userVoteValue, onVote, onDeletePost, onSelectPost}) => {
    
    return (
        <Flex
        border="1px solid"
        bg="white"
        borderColor="gray.300"
        borderRadius={4}
        cursor="pointer"
        onClick={onSelectPost}>
            <Flex direction="column"
            align="center"
            bg="gray.100"
            p={2}
            width='40px'
            borderRadius={4}>
                <Icon as={userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
                color={userVoteValue === 1 ? 'orange' : 'gray.400'}
                fontSize={22}
                cursor="pointer"
                onClick={onVote} />
                <Text fontSize="9pt">{post.voteStatus}</Text>
                <Icon as={userVoteValue === -1 ? IoArrowDownCircleSharp : IoArrowDownCircleOutline}
                color={userVoteValue === -1 ? '#4379ff' : 'gray.400'}
                cursor="pointer"
                fontSize={22}
                onClick={onVote} />
            </Flex>
            <Flex direction="column"
            width="100%"
            >
                <Stack></Stack>
            </Flex>
        </Flex>
    )
}
export default PostItem;