import React, { useEffect, useState } from 'react';
import { Community } from '../../atoms/communitiesAtom'
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";
 
type PostsProps = {
    communityData: Community;
    
};

const Posts:React.FC<PostsProps> = ({ communityData }) => {
    const [loading, setLoading] = useState(false);

    const getPosts = async () => {
        try {
            const postsQuery = query(collection(firestore, 'posts'), where('communityId', '==', communityData.id), orderBy('createdAt', 'desc')) 
            const postDocs = await getDocs(postsQuery)
            const posts = postDocs.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            console.log(posts)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
      getPosts()
    }, [])
    

    return <div>Posts</div>
}
export default Posts;