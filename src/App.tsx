import "./App.css";
import { Canvas } from "@react-three/fiber";
import Experience from "./Componets/Experience";

function App() {
  return (
    <>
      <main className="w-full h-screen">
        <Canvas
          camera={{
            fov: 45,
            near: 0.1,
            far: 1000,
            position: [0, 0, 5],
          }}
        >
          <ambientLight />
          <Experience />
        </Canvas>
      </main>
    </>
  );
}

export default App;
