import { Outlet } from "react-router-dom";
import BottomBar from "./components/BottomBar/BottomBar";
import NavBar from "./components/NavBar/NavBar";
function App() {
  return (
    <div className="border flex flex-col max-w-md mx-auto min-h-screen bg-gray-50">
      <NavBar />

      <main className="flex flex-col justify-between flex-grow">
        <Outlet />
      </main>
      <BottomBar />
    </div>
  );
}

export default App;
