import React from 'react';
import { Stack, Input, Textarea, Flex, Button, Text } from '@chakra-ui/react';


type TextInputsProps = {
    textInputs: {
        title: string;
        body: string;
    };
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleCreatePost: () => void;
    loading: boolean;
};

const TextInputs:React.FC<TextInputsProps> = ({ textInputs, onChange, handleCreatePost, loading }) => {
    
    return (
        <Stack
        spacing={3}
        width="100%">
            <Input
            onChange={onChange}
            value={textInputs.title}
            name="title" 
            fontSize="10pt"
            borderRadius={4}
            placeholder="Title" 
            bg="none"
            boxShadow="inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21"
            border="none" 
            _focus={{ borderColor: "none", border: "none", outline: "none"}}/> 
            <Textarea
            name="body" 
            value={textInputs.body}
            onChange={onChange}
            fontSize="10pt"
            borderRadius={4}
            placeholder="Text (optional)" 
            bg="none"
            boxShadow="inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21"
            border="none" 
            _focus={{ borderColor: "none", border: "none", outline: "none"}} />
            <Flex
            justify="flex-end">
                <Button
                height="34px"
                padding="0px 30px"
                border="none"
                outline="none"
                color="#5596E6"
                bg="none"
                boxShadow="5px 5px 10px #161719, -5px -5px 10px #1e1f21"
                _hover={{boxShadow: 'inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21'}}
                _focus={{outline: "none", bg: "none", border: "none"}}
                isLoading={loading}
                disabled={!textInputs.title}
                onClick={handleCreatePost}>Post</Button>
            </Flex>
        </Stack>
    )
}
export default TextInputs;