import React, { useRef } from 'react';
import { Stack, Flex, Button, Text, Image } from '@chakra-ui/react';

type ImageUploadProps = {
    selectedFile?: string;
    onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedTab: (value: string) => void;
    setSelectedFile: (value: string) => void;

};

const ImageUpload:React.FC<ImageUploadProps> = ({ selectedFile, onSelectImage, setSelectedTab, setSelectedFile}) => {
    const selectedFileRef = useRef<HTMLInputElement>(null)

    return (
        <Flex justify="center"
        align="center"
        width="100%"
        direction="column">
            {selectedFile ? (
                <>
                    <Image src={selectedFile}
                    maxWidth="400px" maxHeight="400px" />
                    <Stack direction="row" mt={4}>
                        <Button
                        height="28px"
                        onClick={() => setSelectedTab("Post")}>
                            Back to Post
                        </Button>
                        <Button
                        height="28px"
                        onClick={() => setSelectedFile('')}>
                            Remove
                        </Button>
                    </Stack>
                </>
            ) : 
            (<Flex justify="center" align="center" p={20}
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
                _focus={{ bg: "none"}}
                onClick={() => selectedFileRef.current?.click()}>Upload
                </Button>
                <input ref={selectedFileRef} type="file" hidden onChange={onSelectImage} />
            </Flex>)}
        </Flex>
    )
}
export default ImageUpload;