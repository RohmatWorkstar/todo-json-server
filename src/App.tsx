import { useState } from "react";
import Userlist from "./pages/Userlist";

type User ={
  id: number,
}

function App() {
  
    return (
        <div className="h-min-screen bg-gradient-to-r to-cyan-500 from-red-300">
            <Userlist />
        </div>
    );
}

export default App;
