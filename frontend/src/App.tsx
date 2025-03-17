import { Outlet } from "react-router-dom";

function App() {
  return (
    <div
      className="border flex flex-col max-w-md mx-auto min-h-screen bg-gray-50
    "
    >
      <header></header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
