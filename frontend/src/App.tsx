import { Outlet } from "react-router-dom";
import BottomBar from "./components/BottomBar/BottomBar";
import RouteListener from "./components/RouteListener";
import useLayoutStore from "./store/layoutStore";
import ContentNavBar from "./components/NavBar/ContentNavBar";
function App() {
  const showBottomBar = useLayoutStore((state) => state.showBottomBar);
  const showNavBar = useLayoutStore((state) => state.showNavBar);
  const content = useLayoutStore((state) => state.content);
  console.log(content, " content 입니다.");
  return (
    <div className="box-content flex flex-col max-w-md mx-auto min-h-screen bg-gray-50 relative">
      {showNavBar && <ContentNavBar content={content} />}
      <RouteListener />
      <main className="flex flex-1 justify-center items-center">
        <Outlet />
      </main>
      {showBottomBar && <BottomBar />}
    </div>
  );
}

export default App;
