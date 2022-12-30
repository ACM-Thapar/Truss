import React, { useEffect, useState } from 'react';
import { Community } from '../../atoms/communitiesAtom';
import useCommunityData from '../../hooks/useCommunityData';
import { firestore } from '../../firebase/clientApp';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { Flex, Text, Stack, Box, Button, Spinner, Skeleton, SkeletonCircle, Image, Icon } from '@chakra-ui/react';
import { FaReddit } from 'react-icons/fa'; 
import Link from 'next/link';

const Recommendations:React.FC = () => {
    const [communities, setCommunities] = useState<Community[]>([])
    const [loading, setLoading] = useState(false)
    const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData()
    
    const getCommunityRecommendations = async () => {
        setLoading(true)
        try {
            const communityQuery = query(collection(firestore, 'communities'), 
            orderBy('numberOfMembers', 'desc'),
            limit(5))
            
            const communityDocs = await getDocs(communityQuery)
            const communities = communityDocs.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            setCommunities(communities as Community[])
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        getCommunityRecommendations()
    }, [])
    

    return (
        <Flex
        direction="column"
        bg='none'
        boxShadow="9px 9px 18px #17181a, -9px -9px 18px #1d1e20"
        borderRadius={4}
        color='#5596E6'
        >
            <Flex
            align='flex-end'
            color='white'
            p='6px 10px'
            height='70px'
            borderRadius='4px 4px 0px 0px'
            fontWeight={700}
            bgImage='url(/images/acmlogo.png)'
            backgroundSize='cover'
            bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),url('images/acmlogo.png')">
                Top Communities
            </Flex>
            <Flex
            direction="column"
            >
                {loading ? (
                    <Stack mt={2} p={3}>
                    <Flex justify="space-between" align="center">
                      <SkeletonCircle size="10" />
                      <Skeleton height="10px" width="70%" />
                    </Flex>
                    <Flex justify="space-between" align="center">
                      <SkeletonCircle size="10" />
                      <Skeleton height="10px" width="70%" />
                    </Flex>
                    <Flex justify="space-between" align="center">
                      <SkeletonCircle size="10" />
                      <Skeleton height="10px" width="70%" />
                    </Flex>
                  </Stack>
                ) : (
                    <>
                        {communities.map((item, index) => {
                            const isJoined = !!communityStateValue.mySnippets.find((snippet) => snippet.communityId === item.id)
                            return (
                                <Link key={item.id} href={`/r/${item.id}`}>
                                    <Flex
                                    position='relative'
                                    align='center'
                                    fontSize='10pt'
                                     
                                    p='10px 12px'>
                                        <Flex
                                        width='80%' align='center'>
                                            <Flex width='15%'>
                                                <Text color="#5596E6">{index + 1}</Text>
                                            </Flex>
                                            <Flex 
                                            align='center'
                                            width='80%'>
                                                {item.imageURL ? (
                                                    <Image alt="image" src={item.imageURL} borderRadius='full' boxSize='28px' mr={2} />
                                                ): (
                                                    <Image alt="image" src="/images/acm.png" borderRadius='full' boxSize='28px' color="#5596E6" mr={2} />
                                                )}
                                                <span style={{ color: '#5596E6', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                                    {`r/${item.id}`}
                                                </span>
                                            </Flex>
                                        </Flex>
                                        <Box
                                        position="absolute"
                                        right='10px'>
                                            <Button 
                                            bg='none'
                                            height='22px'
                                            fontSize='8pt'
                                            boxShadow={isJoined ? 'inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21' : "5px 5px 10px #161719, -5px -5px 10px #1e1f21"}
                                            _hover={{ boxShadow: isJoined ? 'inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21' : "5px 5px 10px #161719, -5px -5px 10px #1e1f21" }}
                                            onClick={(event) => {
                                                event.preventDefault()
                                                onJoinOrLeaveCommunity(item, isJoined)
                                            }}>
                                                {isJoined ? 'Joined' : 'Join'}
                                            </Button>
                                        </Box>
                                    </Flex>
                                </Link>
                            )
                        })}
                        <Box p='10px 20px'>
                            <Button height='30px' width='100%'
                            bg='none'
                            boxShadow="5px 5px 10px #161719, -5px -5px 10px #1e1f21"
                            _hover={{ boxShadow: 'inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21'}}
                            _focus={{ bg: 'none'}}
                            >
                                View All
                            </Button>
                        </Box>
                    </>
                )}
            </Flex>
        </Flex>
    )
}
export default Recommendations;