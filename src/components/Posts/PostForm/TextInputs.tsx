import React from 'react';
import { Stack, Input, Textarea, Flex, Button, Text } from '@chakra-ui/react';


type TextInputsProps = {
    
};

const TextInputs:React.FC<TextInputsProps> = () => {
    
    return (
        <Stack
        spacing={3}
        width="100%">
            <Input
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
            fontSize="10pt"
            borderRadius={4}
            placeholder="Text (optional)" 
            bg="none"
            boxShadow="inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21"
            border="none" 
            _focus={{ borderColor: "none", border: "none", outline: "none"}} />
            <Flex>
                <Button>Post</Button>
            </Flex>
        </Stack>
    )
}
export default TextInputs;