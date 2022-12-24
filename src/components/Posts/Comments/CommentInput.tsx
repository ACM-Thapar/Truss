import React from 'react';
import { User } from 'firebase/auth'
import { Flex, Textarea, Button, Text } from "@chakra-ui/react";
import AuthButtons from "../../Navbar/RightContent/AuthButtons";

type CommentInputProps = {
    commentText: string,
    setCommentText: (value: string) => void,
    user: User,
    createLoading: boolean,
    onCreateComment: (commentText: string) => void,
};

const CommentInput:React.FC<CommentInputProps> = ({ commentText, setCommentText, user, createLoading, onCreateComment }) => {
    
    return (
        <Flex direction="column" position="relative">
          {user ? (
            <>
              <Text mb={1} color="white">
                Comment as{" "}
                <span style={{ color: "#3182CE" }}>
                  {user?.email?.split("@")[0]}
                </span>
              </Text>
              <Textarea
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                placeholder="What are your thoughts?"
                fontSize="10pt"
                border="none"
                boxShadow="inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21"
                borderRadius={4}
                minHeight="160px"
                pb={10}
                _placeholder={{ color: "gray.500" }}
                _focus={{ borderColor: "none", border: "none", outline: "none"}}
              />
              <Flex
                position="absolute"
                left="1px"
                right={0.1}
                bottom="1px"
                justify="flex-end"
                bg='#1a1b1d'
                boxShadow="inset 9px 9px 18px #17181a, inset -9px -9px 18px #1d1e20"
                p="6px 8px"
                borderRadius="0px 0px 4px 4px"
              >
                <Button
                  height="26px"
                  bg="none"
                  boxShadow="5px 5px 10px #161719, -5px -5px 10px #1e1f21"
                  _hover={{boxShadow: 'inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21'}}
                  disabled={!commentText.length}
                  isLoading={createLoading}
                  fontSize="10pt"
                  p={4}
                  onClick={() => onCreateComment(commentText)}
                >
                  Comment
                </Button>
              </Flex>
            </>
          ) : (
            <Flex
              align="center"
              justify="space-between"
              borderRadius={2}
              border="1px solid"
              borderColor="gray.100"
              p={4}
            >
              <Text fontWeight={600}>Log in or sign up to leave a comment</Text>
              <AuthButtons />
            </Flex>
          )}
        </Flex>
      );
}
export default CommentInput;