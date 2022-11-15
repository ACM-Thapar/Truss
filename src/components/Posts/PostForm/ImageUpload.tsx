import React, { useRef } from 'react';
import { Flex, Button, Text } from '@chakra-ui/react';

type ImageUploadProps = {
    
};

const ImageUpload:React.FC<ImageUploadProps> = () => {
    const selectedFileRef = useRef()

    return (
        <Flex justify="center"
        align="center"
        width="100%">
            <Flex justify="center" align="center" p={20}
            border="1px dashed"
            borderColor="gray.200"
            width="100%"
            borderRadius={4}>
                <Button
                bg="none"
                border="none"
                outline="none"
                boxShadow="inset 5px 5px 10px #161719, inset -5px -5px 10px #1e1f21"
                fontSize="10pt"
                fontWeight="600"
                height="28px"
                _hover={{ bg: "none"}}
                _focus={{ bg: "none"}}>Upload
                </Button>
                <input type="file" />
            </Flex>
        </Flex>
    )
}
export default ImageUpload;