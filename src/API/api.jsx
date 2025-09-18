import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

// now to fetch the data
export const fetchPosts = async (pageNumber) => {
    // return api.get("/posts?_start=0&_limit=3");
    try {
        const res = await api.get(`/posts?_start=${pageNumber}&_limit=3`);
        return res.status === 200 ? res.data : []; 
    } catch (error) {
        console.log(error);
    } 
}

// to fetch the individual data
// https://jsonplaceholder.typicode.com/posts/1

export const fetchInvPost = async (id) => {
    try {
        const res = await api.get(`/posts/${id}`);
        console.log(res.data);  
        return res.status === 200 ? res.data : [];
    } catch (error) {
        console.log(error);
    }
}


// to delete the post
export const deletePost = (id) => {
    return api.delete(`/posts/${id}`);
};

// to update the post
export const updatePost = (id) => {
    return api.patch(`/posts/${id}`, { title: "I have Updated"});
};


// infinte scrolling api
export const fetchUsers = async ({ pageParam }) => {
    try {
        const res = await axios.get(`https://api.github.com/users?per_page=10&page=${pageParam}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
}