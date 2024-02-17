import "./scss/style.scss";
import "./App.scss";
import { RouterProvider } from "react-router-dom";
import router from "./routes/PageRouter";
import { useEffect, useState } from "react";
import Loading from "./components/Common/Loading";
import { auth } from "./firebase";


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return <>{isLoading ? <Loading /> : <RouterProvider router={router} />}</>;
}

export default App;
