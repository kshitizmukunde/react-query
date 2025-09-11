import { useEffect } from "react"
import { fetchPosts } from "../API/api";
import { useQuery } from "@tanstack/react-query";

export const FetchRQ = () => {

    const getPostData = async () => {
        try {
            const res = await fetchPosts();
            return res.status === 200 ? res.data : []; 
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    // We cannot call a function directly in react jsx file and if you open a page or load a page and want to call the function we will use the useEffect hook and keep the dependency array empty. 
    // useEffect(() => {
    //     getPostData(); 
    // }, []); 

    // to fetch the data from the server or the api in tanStack query we use UseQuery()
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["posts"], // this is working as useState
        queryFn: getPostData, // this is working as useEffect
    });

    // Conditional Rendering based in loading, error 
    if(isLoading) return <p>Loading...</p>;
    if(isError) return <p> Error: {error.message || "Something went wrong!"}</p>;

    return (
        <div>
            <ul className="section-accordion">
                {
                    // optional chaining
                    data?.map((curElem) => {
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