import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../API/api";
import { useEffect } from "react";

export const InfiniteScroll = () => {

   const {data, hasNextPage, fetchNextPage, status, isFetchingNextPage} = useInfiniteQuery({
        queryKey:['users'],
        queryFn: fetchUsers,
        getNextPageParam: (lastPage, allPages) => {
            console.log("Last Page: ", lastPage, allPages);
            return lastPage.length === 10 ? allPages.length + 1 : undefined;
        },
    });

    console.log(data);

    const handleScroll = () => {
        const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;

        if(bottom && hasNextPage){
            fetchNextPage();
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasNextPage])

    if( status === "Loading") return <div>Loading...</div>;
    if( status === "error") return <div>Error Fetching Data</div>;

    return (
        <div>
            <h1>Infinite Scrolling with React Query v5</h1>

            {data?.pages?.map((page, index) => (
                <ul key={index}>
                    {page.map((user) => (
                        <li
                            key={user.id}
                            style={{padding: "10px", border: "1px solid #ccc"}}
                        >
                            <p>{user.login}</p>
                            <img 
                                src={user.avatar_url} 
                                alt={user.login}
                                width={50} 
                                height={50} 
                            />
                        </li>
                    ))}
                </ul>
            ))}
            {isFetchingNextPage && <div>Loading more...</div>}
        </div>
    );
};