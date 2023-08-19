import { createContext } from "react";

const context = createContext({
    access: {
        username: "NONE",
        priviate: false,
    },
    setAccess: () => {},
});

export default context;
