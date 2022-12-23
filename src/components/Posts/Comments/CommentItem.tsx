import React from 'react';
import { Timestamp } from 'firebase/firestore';
import { Flex, Text, Button, Spinner, Box, Textarea, Icon, Stack } from '@chakra-ui/react';
import { FaReddit } from 'react-icons/fa';
import { IoArrowDownCircleOutline, IoArrowUpCircleOutline } from 'react-icons/io5';
import moment from 'moment';



export type Comment = {
    id: string,
    creatorId: string,
    creatorDisplayText: string,
    communityId: string,
    postId: string,
    postTitle: string,
    text: string,
    createdAt: Timestamp,
}

type CommentItemProps = {
    comment: Comment,
    onDeleteComment: (comment: Comment) => void,
    loadingDelete: boolean,
    userId: string,
};

const CommentItem:React.FC<CommentItemProps> = ({ comment, onDeleteComment, loadingDelete, userId }) => {
    
    return (
        <Flex>
            <Box mr={2}>
                <Icon as={FaReddit}
                fontSize={30}
                color="gray.300" />
            </Box>
            <Stack spacing={1}>
                <Stack 
                direction="row"
                align="center"
                fontSize="8pt"
                color="black" >
                    <Text color="black"
                    fontWeight={700} >
                        {comment.creatorDisplayText}
                    </Text>
                    <Text color="gray.600">{moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}</Text>
                    {loadingDelete && (<Spinner size="sm" />)}
                </Stack>
                <Text
                fontSize="10pt" >
                    {comment.text}
                </Text>
                <Stack 
                direction="row"
                align="center"
                cursor="pointer"
                color="gray.500">
                    <Icon as={IoArrowUpCircleOutline} />
                    <Icon as={IoArrowDownCircleOutline} />
                    {userId === comment.creatorId && (
                        <>
                            <Text
                            fontSize="9pt"
                            _hover={{color: "blue.500"}} >
                                Edit
                            </Text>
                            <Text
                            fontSize="9pt"
                            _hover={{color: "blue.500"}}
                            onClick={() => onDeleteComment(comment)} >
                                Delete
                            </Text>
                        </>
                    )}
                </Stack>
            </Stack>
        </Flex>
    )
}
export default CommentItem;