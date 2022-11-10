import React, { useState } from 'react';
import { Icon, Flex, Checkbox, Stack, Input ,Text, Divider, Box, Button, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Lorem, ModalFooter } from '@chakra-ui/react';
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs';
import { HiLockClosed } from 'react-icons/hi';

type CreateCommunityModalProps = {
    open: boolean;
    handleClose: () => void;
};

const CreateCommunityModal:React.FC<CreateCommunityModalProps> = ({ open, handleClose }) => {
    const [communityName, setCommunityName] = useState("");
    const [charsRemaining, setCharsRemaining] = useState(21);
    const [communityType, setCommunityType] = useState("public");
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
    return (
        <>
      

      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader 
          display="flex" 
          flexDirection="column" 
          fontSize={15} 
          padding={3}>
            Create a community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody
            display="flex"
            flexDirection="column"
            padding="10px 0px"
            >
                <Text
                fontWeight={600}
                fontSize={15}>
                    Name
                </Text>
                <Text fontSize={11} color="gray">
                    Community names including capitalization cannot be changed.
                </Text>
                <Text position="relative" top="28px" left="10px" width="20px">
                    r/
                </Text>
                <Input value={communityName} size="sm" 
                pl="22px"
                position="relative"
                onChange={handleChange}/>
                <Text color={charsRemaining === 0 ? "red" : "gray"} fontSize="9pt">
                    {charsRemaining} Characters remaining
                </Text>
                <Box mt={4} mb={4}>
                    <Text fontSize={15} fontWeight={600}>
                        Community Type
                    </Text>
                    <Stack spacing={2}>
                        <Checkbox name="public" isChecked={communityType === "public"} onChange={onCommunityTypeChange}>
                            <Flex align="center">
                                <Icon as={BsFillPersonFill} color="gray" mr={2} />
                                <Text fontSize="10pt" mr={1}>
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
                                <Text fontSize="10pt" mr={1}>
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
                                <Text fontSize="10pt" mr={1}>
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
            <Button colorScheme='blue' mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button variant='ghost'>Create Community</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    )
}
export default CreateCommunityModal;