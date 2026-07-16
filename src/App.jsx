import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]">

      {/* Background Blur */}
      <div className="fixed left-1/2 top-0 -translate-x-1/2 -z-10 h-80 w-80 rounded-full bg-fuchsia-400 opacity-20 blur-[100px]" />

      <Navbar />

      <main className="flex-1">
        <Manager />
      </main>

      <Footer />
    </div>
  );
}

export default App;