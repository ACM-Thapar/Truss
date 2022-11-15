import { Flex, Icon, Input } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsLink45Deg } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";
import { auth } from '../../firebase/clientApp'

const CreatePostLink: React.FC = () => {
    const router = useRouter()
    const [user] = useAuthState(auth)
    const setAuthModalState = useSetRecoilState(authModalState)

    const onClick = () => {
        if (!user) {
            setAuthModalState({ open: true, view: "login" })
            return
        }
        const { communityId } = router.query
        router.push(`/r/${communityId}/submit`)
    }

    return (
        
        <Flex
        justify="space-evenly"
        align="center"
        bg="none"
        height="56px"
        boxShadow="7px 7px 14px #161618, -7px -7px 14px #1e2022"
        borderRadius={4}
        p={2}
        mb={4}
        >
        
            <Icon as={FaReddit} fontSize={36} color="gray.300" mr={4} />
            <Input
            placeholder="Create Post" 
            fontSize="10pt"
            border="none"
            outline="none"
            _placeholder={{ color: "gray.500" }}
            boxShadow="inset 7px 7px 14px #161618, inset -7px -7px 14px #1e2022"
            _hover={{
                boxShadow: "inset 7px 7px 26px #161618, inset -7px -7px 26px #1e2022"
            }}
            _focus={{
                outline: "none",
                bg: "none", 
                border: "none",
                borderColor: "none"
            }}
            height="36px"
            borderRadius={4}
            mr={4}
            onClick={onClick}
            />
            <Icon
            as={IoImageOutline}
            fontSize={24}
            mr={4}
            color="gray.400"
            cursor="pointer"
            />
            <Icon as={BsLink45Deg} fontSize={24} color="gray.400" cursor="pointer" />
        </Flex>
        
    )
}

export default CreatePostLink;