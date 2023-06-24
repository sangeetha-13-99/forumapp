import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./components/Home";
import { RootPage } from "./components/RootPage";
import './App.css';
import { PostDetail } from "./components/PostDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      
      children: [
        {  path: "/", element: <Home /> },
        { path: "/posts/:postId", element: <PostDetail /> }
      ]
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
