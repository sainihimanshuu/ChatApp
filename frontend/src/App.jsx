import "./App.css";
import Header from "./components/Header.jsx";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <div>
            <Header />
            <Outlet />
            <div>Hello</div>
        </div>
    );
}

export default App;
