import React, { useState, useRef, ReactEventHandler } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { BiPoll } from 'react-icons/bi';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { AiFillCloseCircle } from 'react-icons/ai';
import { User } from "firebase/auth";
import TabItem from './TabItem';
import { useRouter } from 'next/router';
import TextInputs from './PostForm/TextInputs';
import ImageUpload from './PostForm/ImageUpload';
import { firestore, storage } from "../../firebase/clientApp";
import { postState, Post } from "../../atoms/postsAtom";
import { serverTimestamp, Timestamp, addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'


type NewPostFormProps = {
    communityId: string;
    communityImageURL?: string;
    user: User;
};

const formTabs: TabItem[] = [
    {
        title: 'Post',
        icon: IoDocumentText,
    },
    {
        title: 'Images & Video',
        icon: IoImageOutline,
    },
    {
        title: 'Link',
        icon: BsLink45Deg,
    },
    {
        title: 'Poll',
        icon: BiPoll,
    },
    {
        title: 'Talk',
        icon: BsMic,
    },
]

export type TabItem = {
    title: string;
    icon: typeof Icon.arguments;
}


const NewPostForm:React.FC<NewPostFormProps> = ({ communityId,
    communityImageURL,
    user, 
    }) => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    
    const [textInputs, setTextInputs] = useState({
        title: '',
        body: '',
    })

    const [selectedFile, setSelectedFile] = useState<string>()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleCreatePost = async () => {
        const { communityId } = router.query;
        const newPost: Post = {
            communityId: communityId as string,
            creatorId: user?.uid,
            creatorDisplayName: user.email!.split('@')[0],
            title: textInputs.title,
            body: textInputs.body,
            numberOfComments: 0,
            voteStatus: 0,
            createdAt: serverTimestamp() as Timestamp,
        }
        setLoading(true)

        try {
            const postDocRef = await addDoc(collection(firestore, 'posts'), newPost)

            if (selectedFile) {
                const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
                await uploadString(imageRef, selectedFile, 'data_url');
                const downloadURL = await getDownloadURL(imageRef);

                await updateDoc(postDocRef, {
                    imageURL: downloadURL,
                })
            }
        } catch (error: any) {
            console.log(error.message);
            setError(true);
        }
        setLoading(false);
        // router.back()
    }

    const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        if (event.target.files?.[0]) {
            reader.readAsDataURL(event.target.files[0])
        }
        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) {
                setSelectedFile(readerEvent.target.result as string)
            }
                
            }
        }
    

    const onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { target: { name, value } } = event; 
        setTextInputs(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <Flex
        direction="column"
        bg="none"
        boxShadow="7px 7px 14px #161618, -7px -7px 14px #1e2022"
        borderRadius={4}
        mt={4}
        >
            <Flex width="100%"
            >
                {formTabs.map((item) => (
                    <TabItem item={item} key={item.title} selected={item.title === selectedTab} setSelectedTab={setSelectedTab} />
                ))}
            </Flex>
            <Flex p={4}>
                {selectedTab === "Post" && (<TextInputs textInputs={textInputs} handleCreatePost={handleCreatePost} onChange={onTextChange} loading={loading} />)}
                {selectedTab === "Images & Video" && (
                    <ImageUpload selectedFile={selectedFile} onSelectImage={onSelectImage} setSelectedTab={setSelectedTab} setSelectedFile={setSelectedFile} />
                )}
            </Flex>
            {error && (
                <Alert status='error'
                bg="none">
                <AlertIcon />
                <Text mr={2} fontSize="10pt" color="#e53e3e">Error creating post</Text>
                </Alert>
            )}
        </Flex>
    )
}
export default NewPostForm;