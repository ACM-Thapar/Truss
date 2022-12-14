import React, { useRef, useState } from 'react';
import { Box, Flex, Text, Icon, Stack, Divider, Button, Spinner, Image } from '@chakra-ui/react';
import { RiCakeLine } from 'react-icons/ri';
import moment from "moment";
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { FaReddit } from 'react-icons/fa';
import Link from 'next/link';
import { auth, firestore, storage } from '../../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import useSelectFile from '../../hooks/useSelectFile';
import { Community, communityState } from "../../atoms/communitiesAtom";
import { ref, getDownloadURL, uploadString } from 'firebase/storage';
import { updateDoc, doc } from 'firebase/firestore';
import { useSetRecoilState } from 'recoil';

type AboutProps = {
    communityData: Community;
};

const About:React.FC<AboutProps> = ({ communityData }) => {
    const [user] = useAuthState(auth);
    const selectedFileRef = useRef<HTMLInputElement>(null)
    const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile()
    const [uploadingImage, setUploadingImage] = useState(false)
    const setCommunityStateValue = useSetRecoilState(communityState)

    const onUpdateImage = async () => {
        if (!selectedFile) {
            return
        }
        setUploadingImage(true)
        try {
            const imageRef = ref(storage, `communities/${communityData.id}/image`)
            await uploadString(imageRef, selectedFile, 'data_url')
            const downloadURL = await getDownloadURL(imageRef)
            await updateDoc(doc(firestore, 'communities', communityData.id), {
                imageURL: downloadURL,
            })

            setCommunityStateValue((prev) => ({
                ...prev,
                currentCommunity: {
                    ...prev.currentCommunity,
                    imageURL: downloadURL,
                } as Community,
            }))
            console.log("uploading now")
        } catch (error) {
            console.log(error)
        }
        setUploadingImage(false)
    }

    return (
        <Box
        position="sticky"
        top="14px"
        >
            <Flex 
            justify="space-between" 
            align='center'
            bg='#1a1b1d'
            color="#5596E6"
            boxShadow="inset 9px 9px 18px #17181a, inset -9px -9px 18px #1d1e20"
            p={3}
            borderRadius='4px 4px 0px 0px'>
                <Text
                fontSize="10pt"
                fontWeight={700}>About Community
                </Text>
                <Icon as={HiOutlineDotsHorizontal} />
            </Flex>
            <Flex 
            direction="column"
            p={3}
            bg="#1a1b1d"
            color="#5596E6"
            boxShadow="9px 9px 18px #17181a, -9px -9px 18px #1d1e20"
            borderRadius="0px 0px 4px 4px">
                <Stack>
                    <Flex
                    width="100%"
                    p={2}
                    fontSize="10pt">
                        <Flex direction="column" flexGrow={1} fontWeight={700}>
                            <Text >
                                {communityData.numberOfMembers.toLocaleString()}
                            </Text>
                            <Text>Members</Text>
                        </Flex>
                        <Flex direction="column" flexGrow={1} fontWeight={700} >
                            <Text>1</Text>
                            <Text>Online</Text>
                        </Flex>
                    </Flex>
                    <Divider />
                    <Flex
                    color="#5596E6"
                    align='center'
                    width="100%"
                    p={1}
                    fontWeight={500}
                    fontSize="10pt">
                        <Icon as={RiCakeLine} fontSize={18} mr={2} />
                        {communityData.createdAt && (<Text>Created {moment(new Date(communityData.createdAt?.seconds * 1000)).format('MMM DD, YYYY')} </Text>)}
                    </Flex>
                    <Link href={`${communityData.id}/submit`}>
                        <Button
                        mt={3}
                        height="30px"
                        width="100%"
                        bg="none"
                        boxShadow="5px 5px 10px #161719, -5px -5px 10px #1e1f21"
                        _hover={{boxShadow: 'inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21'}}>
                            Create Post
                        </Button>
                    </Link>
                    {user?.uid === communityData.creatorId && (
                        <>
                            <Divider />
                            <Stack
                            spacing={1}
                            fontSize="10pt"
                            >
                                <Text fontWeight={600}>Admin</Text>
                                <Flex align="center" justify="space-between">
                                    <Text
                                    color="blue.500"
                                    cursor="pointer"
                                    _hover={{ textDecoration: "underline" }}
                                    onClick={()=> selectedFileRef.current?.click()}>Change Image
                                    </Text>
                                    {communityData.imageURL || selectedFile ? (
                                        <Image src={selectedFile || communityData.imageURL} 
                                        borderRadius="full" boxSize="40px" alt="Community Image" />
                                    ) : (
                                        <Icon 
                                        as={FaReddit}
                                        fontSize={40}
                                        color="brand.100"
                                        mr={2}/>
                                    )}
                                </Flex>
                            {selectedFile && (
                                (uploadingImage ? (
                                    <Spinner color="#5596E6" />
                                    
                                ) : (
                                    <Text
                                    cursor="pointer"
                                    color="orange"
                                    onClick={onUpdateImage}
                                    >Save Image</Text>
                                ))
                            )}
                            <input type="file"
                            id="file-upload"
                            accept="image/x-png,image/gif,image/jpeg"
                            hidden
                            ref={selectedFileRef}
                            onChange={onSelectFile} />
                            </Stack>
                        </>
                    )}
                </Stack>
            </Flex>
        </Box>
    )
}
export default About;