import React, { useState } from 'react';
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
import { Post } from "../../../atoms/postsAtom";
import { Flex, Button, Text, Box, Icon, Stack, Image, Skeleton, Spinner } from "@chakra-ui/react"; 
import moment from 'moment';
import { useRouter } from 'next/router';
import Link from 'next/link';

type PostItemProps = {
    post: Post;
    userIsCreator: boolean;
    userVoteValue?: number;
    onVote: (event: React.MouseEvent<SVGElement, MouseEvent>, post: Post, vote: number, communityId: string) => void;
    onDeletePost: (post: Post) => Promise<boolean>;
    onSelectPost?: (post: Post) => void;
    homePage?: boolean;
};

const PostItem:React.FC<PostItemProps> = ({ post, userIsCreator, userVoteValue, onVote, onDeletePost, onSelectPost, homePage }) => {
    const [loadingImage, setLoadingImage] = useState(true)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const router = useRouter()
    const singlePostPage = !onSelectPost
    const [error, setError] = useState(false)
    const handleDelete = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>,) => {
        event.stopPropagation()
        setLoadingDelete(true)
        console.log("delete")
        try {
            const success = await onDeletePost(post)
            if (!success) {
                throw new Error("Failed to delete post")
            }
            console.log("successfully deleted")
            if (singlePostPage) {
                router.push(`/r/${post.communityId}`)
            }
                
        } catch (error: any) {
            setError(error.message)
        }
        setLoadingDelete(false)
    }

    return (
        <Flex
        boxShadow="7px 7px 14px #161618, -7px -7px 14px #1e2022"
        bg="none"
        borderRadius={singlePostPage ? "4px 4px 0px 0px" : "4px"}
        cursor={singlePostPage ? "unset" : "pointer"}
        onClick={() => onSelectPost && onSelectPost(post)}>
            <Flex direction="column"
            align="center"
            bg={singlePostPage ? "none" : "linear-gradient(145deg, #17181a, #1c1d1f)"}
            boxShadow={singlePostPage ? "none" : "7px 7px 20px #161719, -7px -7px 20px #1e1f21"}
            p={2}
            width='40px'
            borderRadius={singlePostPage ? "0" : "3px 0px 0px 3px"}>
                <Icon as={userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
                color={userVoteValue === 1 ? 'orange' : '#5596E6'}
                fontSize={22}
                cursor="pointer"
                onClick={(event) => onVote(event, post, 1, post.communityId)} />
                <Text fontSize="9pt" color="#5596E6">{post.voteStatus}</Text>
                <Icon as={userVoteValue === -1 ? IoArrowDownCircleSharp : IoArrowDownCircleOutline}
                color={userVoteValue === -1 ? '#4379ff' : '#5596E6'}
                cursor="pointer"
                fontSize={22}
                onClick={(event) => onVote(event, post, -1, post.communityId)} />
            </Flex>
            <Flex direction="column"
            width="100%"
            >
                <Stack spacing={1}
                p="10px">
                    <Stack direction="row"
                    spacing={0.6}
                    align="center"
                    fontSize="9pt"
                    >
                        {homePage && (
                            <>
                                {post.communityImageURL ? (
                                    <Image alt="image" src={post.communityImageURL} borderRadius="full" boxSize="18px" mr={2} />
                                ) : (
                                    <Icon as={FaReddit} fontSize='18pt' mr={1} color='blue.500' />
                                )}
                                <Link href={`r/${post.communityId}`}>
                                    <Text fontWeight={700}
                                    _hover={{ textDecoration: 'underline' }} 
                                    onClick={(event) => event.stopPropagation()} >{`r/${post.communityId}`}</Text>
                                </Link>
                                <Icon as={BsDot} color="gray.500" fontSize={8} />
                            </>
                        )}
                        <Text color="gray.600">Posted by u/{post.creatorDisplayName} {" "} {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}</Text>
                    </Stack>
                    <Text
                    fontSize="12pt"
                    fontWeight={600}
                    color="#5596E6">{post.title}</Text>
                    <Text fontSize="10pt" color="#5596E6">{post.body}</Text>
                    {post.imageURL && (
                        <Flex justify="center" align="center" p={2}>
                            {loadingImage && (
                                <Skeleton height="200px" width="100%" borderRadius={4} />
                            )}
                            <Image src={post.imageURL} maxHeight="460px" alt="Post" display={loadingImage ? "none" : "unset"} onLoad={() => setLoadingImage(false)} />
                        </Flex>
                    )}
                </Stack>
                <Flex
                ml={1}
                mb={0.5}
                color="gray.500"
                >
                    <Flex align="center" p="8px 10px" borderRadius={4}
                    cursor="pointer">
                        <Icon as={BsChat} mr={2}/>
                        <Text fontSize="9pt">{post.numberOfComments}</Text>
                    </Flex>
                    <Flex align="center" p="8px 10px" borderRadius={4}
                    cursor="pointer">
                        <Icon as={IoArrowRedoOutline} mr={2}/>
                        <Text fontSize="9pt">Share</Text>
                    </Flex>
                    <Flex align="center" p="8px 10px" borderRadius={4}
                    cursor="pointer">
                        <Icon as={IoBookmarkOutline} mr={2}/>
                        <Text fontSize="9pt">Save</Text>
                    </Flex>
                    {userIsCreator && (<Flex align="center" p="8px 10px" borderRadius={4}
                    cursor="pointer" onClick={handleDelete}>
                        {loadingDelete ? (
                            <Spinner size="sm" />
                        ) : (
                        <>
                            <Icon as={AiOutlineDelete} mr={2}/>
                            <Text fontSize="9pt">Delete</Text>
                            </>
                            )}
                    </Flex>)}
                </Flex>
            </Flex>
        </Flex>
    )
}
export default PostItem;