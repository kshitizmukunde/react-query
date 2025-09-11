import { useEffect, useState } from "react"
import { fetchPosts } from "../API/api";

export const FetchOld = () => {
    const [posts, setPosts] = useState([]);

    const getPostData = async () => {
        try {
            const res = await fetchPosts();
            console.log(res);
            res.status === 200 ? setPosts(res.data) : []; 
            // setPosts(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPostData();
    }, [])

    return (
        <div>
            <ul className="section-accordion">
                {
                    // optional chaining
                    posts?.map((curElem) => {
                    // posts.map((curElem) => {
                        const {id, title, body} = curElem;
                        return (
                            <li key={id}>
                                <h3>{title}</h3>
                                <p>{body}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}