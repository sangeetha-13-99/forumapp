import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./components/Home";
import { Post } from "./components/Post";
import { RootPage } from "./components/RootPage";
import './App.css';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      children: [
        { path: "/home", element: <Home /> },
        { path: "/posts/:postId", element: <Post /> }
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
