import React from "react";
import { Button, Flex, Icon, Stack, Text, Image } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";

const PersonalHome: React.FC = () => {
  return (
    <Flex
      
      direction="column"
      bg="none"
      borderRadius={4}
      cursor="pointer"
      boxShadow="5px 5px 10px #161719, -5px -5px 10px #1e1f21"
      position="sticky"
    >
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        bg="blue.500"
        height="34px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        bgImage="url(/images/acmlogo.png)"
        backgroundSize="cover"
      ></Flex>
      <Flex direction="column" p="12px">
        <Flex align="center" mb={2}>
          <Image alt="image" src="/images/acm.png" boxSize="48px" borderRadius='full' color="#5596E6" mr={2} />
          <Text fontWeight={600}>Home</Text>
        </Flex>
        <Stack spacing={3}>
          <Text fontSize="9pt" color="#5596E6">
            Your personal Truss frontpage, built for you.
          </Text>
          <Button height="30px"
          bg='none'
          boxShadow="5px 5px 10px #161719, -5px -5px 10px #1e1f21"
          _hover={{bg:'none'}}
          _focus={{bg:'none'}}>Create Post</Button>
          <Button height="30px"
          bg='none'
          boxShadow="5px 5px 10px #161719, -5px -5px 10px #1e1f21"
          _hover={{ boxShadow: 'inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21'}}
          _focus={{bg:'none', outline: 'none', border: 'none'}}>
            Create Community
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};
export default PersonalHome;