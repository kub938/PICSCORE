import { Outlet } from "react-router-dom";
import BottomBar from "./components/BottomBar/BottomBar";
import NavBar from "./components/NavBar/NavBar";
import RouteListener from "./components/RouteListener";
import useLayoutStore from "./store/layoutStore";
function App() {
  const showBottomBar = useLayoutStore((state) => state.showBottomBar);
  const showNavBar = useLayoutStore((state) => state.showNavBar);

  return (
    <div className="box-content flex flex-col max-w-md mx-auto min-h-screen bg-gray-50 relative">
      {showNavBar && <NavBar />}
      <RouteListener />
      <main
        className={`flex flex-1 justify-center items-center ${
          showBottomBar ? "pb-16" : ""
        }`}
      >
        <Outlet />
      </main>
      {showBottomBar && <BottomBar />}
    </div>
  );
}

export default App;
