import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layoutx from "./layouts";
import { Login, News } from "./pages";
import Private from "./routes/private";
import { client } from "./service/client";
import Context from "./service/context";
function App() {
    const [access, setAccess] = useState({
        username: "",
        private: false,
    });
    const [sprotected, setProtected] = useState(false);
    const setAccessData = (data) => {
        setAccess(data);
    };
    console.log("cashe-data",client.getQueriesData());
    console.log(import.meta.env.VITE_BASE_URL);
    return (
        <Context.Provider value={{ access: access, setAccess: setAccessData }}>
            <Routes>
                <Route path="/" element={<Login setProtected={setProtected} />} />
                <Route element={<Private protected={sprotected} />}>
                    <Route element={<Layoutx />}>
                        <Route path="/news" element={<News />} />
                    </Route>
                </Route>
            </Routes>
        </Context.Provider>
    );
}

export default App;
