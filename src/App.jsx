import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { MainLayout } from "./components/Layout/MainLayout";
import { Home } from "./Pages/Home";
import { FetchOld } from "./Pages/FetchOld";
import { FetchRQ } from "./Pages/FetchRQ";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FetchIndv } from "./components/UI/FetchIndv";

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
      {
        path: '/rq/:id',
        element: <FetchIndv />,
      },
    ],
  },
]);

export const App = () => {
  
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>  
      <ReactQueryDevtools initialIsOpen={false} /> 
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  ); 
};