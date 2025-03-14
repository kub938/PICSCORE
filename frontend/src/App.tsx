import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col max-w-md mx-auto min-h-screen">
      <header></header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
