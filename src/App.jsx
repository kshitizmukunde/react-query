import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { MainLayout } from "./components/Layout/MainLayout";
import { Home } from "./Pages/Home";
import { FetchOld } from "./Pages/FetchOld";
import { FetchRQ } from "./Pages/FetchRQ";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: '/', 
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/trad',
        element: <FetchOld />,
      },
      {
        path: '/rq',
        element: <FetchRQ />,
      },
    ],
  },
]);

export const App = () => {
  
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>  
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  ); 
};