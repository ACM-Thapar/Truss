import React, { useState } from 'react';
import { Icon, Flex, Checkbox, Stack, Input ,Text, Divider, Box, Button, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Lorem, ModalFooter } from '@chakra-ui/react';
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs';
import { HiLockClosed } from 'react-icons/hi';
import { doc, runTransaction, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../../firebase/clientApp";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import useDirectory from '../../../hooks/useDirectory';

type CreateCommunityModalProps = {
    open: boolean;
    handleClose: () => void;
};

const CreateCommunityModal:React.FC<CreateCommunityModalProps> = ({ open, handleClose }) => {
    const [user] = useAuthState(auth)
    const [communityName, setCommunityName] = useState("");
    const [charsRemaining, setCharsRemaining] = useState(21);
    const [communityType, setCommunityType] = useState("public");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const { toggleMenuOpen } = useDirectory()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 21) {
            return
        }
        setCommunityName(event.target.value)
        setCharsRemaining(21 - event.target.value.length)
    }

    const onCommunityTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommunityType(event.target.name)
    }

    const handleCreateCommunity = async () => {
        if (error) {
            setError("")
        }
        const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/
        if (format.test(communityName) || communityName.length < 3) {
            setError("Names must be between 3 and 21 characters and cannot contain special characters")
            return
        }

        setLoading(true)

        try {
        const communityDocRef = doc(firestore, "communities", communityName)

        await runTransaction(firestore, async (transaction) => {
            const communityDoc = await transaction.get(communityDocRef)

            if (communityDoc.exists()) {
            throw new Error(`Sorry, r/${communityName} is taken. Try another.`)
            }

            transaction.set(communityDocRef, {
                creatorId: user?.uid,
                createdAt: serverTimestamp(),
                numberOfMembers: 1,
                privacyType: communityType,
    
            })

            transaction.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityName), {
                communityId: communityName,
                isModerator: true
            })
        }) 

        handleClose()
        toggleMenuOpen()
        router.push(`r/${communityName}`)
        
        
        } catch (error: any) {
            console.log(error)
            setError(error.message)
        }
        setLoading(false)
        
    }

    return (
        <>
      

      <Modal isOpen={open} onClose={handleClose} size="lg" bg="#1a1b1d"> 
        <ModalOverlay />
        <ModalContent 
        bg="#1a1b1d">
          <ModalHeader 
          display="flex" 
          flexDirection="column" 
          fontSize={15} 
          padding={3}
          color="#5596E6">
            Create a community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalCloseButton color="#5596E6" />
            <ModalBody
            display="flex"
            flexDirection="column"
            padding="10px 0px"
            >
                <Text
                fontWeight={600}
                fontSize={15}
                color="#5596E6">
                    Name
                </Text>
                <Text fontSize={11} color="#5596E6">
                    Community names including capitalization cannot be changed.
                </Text>
                <Text position="relative" top="28px" left="10px" width="20px" color="#5596E6">
                    r/
                </Text>
                <Input value={communityName} size="sm" 
                pl="22px"
                position="relative"
                onChange={handleChange}
                border="none"
                outline="none"
                boxShadow="inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21"
                _focus={{outline: "none", border: "none"}}
                color="#5596E6"/>
                <Text color={charsRemaining === 0 ? "orange" : "gray"} fontSize="9pt">
                    {charsRemaining} Characters remaining
                </Text>
                <Text fontSize="9pt" color="red" pt={1}>{error}</Text>
                <Box mt={4} mb={4}>
                    <Text fontSize={15} mb={2} fontWeight={600} color="#5596E6">
                        Community Type
                    </Text>
                    <Stack spacing={2}>
                        <Checkbox name="public" isChecked={communityType === "public"} onChange={onCommunityTypeChange}>
                            <Flex align="center">
                                <Icon as={BsFillPersonFill} color="gray" mr={2} />
                                <Text fontSize="10pt" mr={1} color="#5596E6">
                                    Public
                                </Text>
                                <Text fontSize="8pt" color="gray" pt={1}>
                                    Anyone can view, post and comment to this community
                                </Text>
                            </Flex>
                        </Checkbox>
                        <Checkbox name="restricted" isChecked={communityType === "restricted"} onChange={onCommunityTypeChange}>
                            <Flex align="center">
                            <Icon as={BsFillEyeFill} color="gray" mr={2} />
                                <Text fontSize="10pt" mr={1} color="#5596E6">
                                    Restricted
                                </Text>
                                <Text fontSize="8pt" color="gray" pt={1}>
                                    Anyone can view but only approved users can post 
                                </Text>
                            </Flex>
                        </Checkbox>
                        <Checkbox name="private" isChecked={communityType === "private"} onChange={onCommunityTypeChange}>
                            <Flex align="center">
                            <Icon as={HiLockClosed} color="gray" mr={2} />
                                <Text fontSize="10pt" mr={1} color="#5596E6">
                                    Private
                                </Text>
                                <Text fontSize="8pt" color="gray" pt={1}>
                                    Only approved users can view, post and comment
                                </Text>
                            </Flex>
                        </Checkbox>
                    </Stack>
                </Box>
            </ModalBody>
          </Box>
          

          <ModalFooter>
            <Button mr={3} onClick={handleClose}
            color="#5596E6"
            bg="none"
            boxShadow="5px 5px 10px #161719, -5px -5px 10px #1e1f21"
            _hover={{boxShadow: 'inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21'}}
            _focus={{outline: "none"}}>
              Close
            </Button>
            <Button
            color="#5596E6"
            bg="none"
            boxShadow="5px 5px 10px #161719, -5px -5px 10px #1e1f21"
            _hover={{boxShadow: 'inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21'}}
            _focus={{outline: "none"}}
            onClick={handleCreateCommunity}
            isLoading={loading}>Create Community</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    )
}
export default CreateCommunityModal;