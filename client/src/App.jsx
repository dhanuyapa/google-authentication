import React, { useEffect, useState } from "react";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./components/GoogleLogin";

function App() {
    const [user, setUser] = useState();

    return (
        <GoogleOAuthProvider clientId="451139188624-1uipv62sik88sdiu0r1ni7obdm9psblm.apps.googleusercontent.com">
            <div className="App">
                <GoogleLogin setUser={setUser}></GoogleLogin>
                {user && user.name}
                {user && user.email}
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;
