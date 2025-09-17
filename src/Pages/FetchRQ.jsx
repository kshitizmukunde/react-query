import { useEffect, useState } from "react"
import { deletePost, fetchPosts, updatePost } from "../API/api";
import { keepPreviousData, QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

export const FetchRQ = () => {
    const [pageNumber, setPageNumber] = useState(0);



    // We cannot call a function directly in react jsx file and if you open a page or load a page and want to call the function we will use the useEffect hook and keep the dependency array empty. 
    // useEffect(() => {
    //     getPostData(); 
    // }, []);  

    // to fetch the data from the server or the api in tanStack query we use UseQuery()
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["posts", pageNumber], // this is working as useState
        queryFn: () => fetchPosts(pageNumber), // this is working as useEffect
        // gcTime: 1000,
        // staleTime: 10000,
        // refetchInterval: 1000,
        refetchIntervalInBackground: true,
        placeholderData: keepPreviousData,
    });

    const queryClient = useQueryClient();

    // Mutation function to delete the post
    const deleteMutation = useMutation({
        mutationFn: (id) => deletePost(id),
        onSuccess: (data, id) => {
            // console.log(data, id);
            queryClient.setQueryData(["posts", pageNumber], (curElem) => {
                return curElem?.filter((post) => post.id !== id);
            });
        },
    });

    // Mutation function to update the post
    const updateMutation = useMutation({
        mutationFn: (id) => updatePost(id),
        onSuccess: (apiData, postId) => {
            console.log(apiData, postId);
            // console.log(data, id);
            queryClient.setQueryData(["posts", pageNumber], (postsData) => {
                return postsData?.map((curPost) => {
                    return curPost.id === postId ? {...curPost, title: apiData.data.title} : curPost;
                });
            });
        }, 
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
                                <NavLink to={`/rq/${id}`}>
                                    <p>{id}</p>
                                    <h3>{title}</h3>
                                    <p>{body}</p>
                                </NavLink>
                                <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
                                <button onClick={() => updateMutation.mutate(id)}>Update</button>
                            </li>
                        );
                    })
                }
            </ul>

            <div className="pagination-section container">
                <button disabled={pageNumber === 0 ? true : false} onClick={() => setPageNumber((prev) => prev - 3)}>Prev</button>
                <h2>{pageNumber/3 + 1}</h2>
                <button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
            </div>
        </div>
    )
}