import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Scene from './scene';
import Toggle from './toggle';
import Sky from './sky';
import './app.css';

function App() {
    const [isDay, setIsDay] = useState(true);

    const handleToggle = () => {
        setIsDay((prev) => !prev);
    };

    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <Toggle onToggle={handleToggle} isDay={isDay} />

            <Canvas camera={{ position: [0, 2, 20], fov: 70 }} shadows>
                <OrbitControls makeDefault />
                <color attach="background" args={isDay ? ["#87ceeb"] : ["#0a0f1e"]} />
                                {/* Ambient Light */}
                                <ambientLight intensity={isDay ? 3.5 : 1.2} />

                <directionalLight 
                    position={[5, 10, 5]} 
                    intensity={isDay ? 2.5 : 0.8} 
                    color={isDay ? "white" : "#4a6583"} 
                    castShadow 
                />
                <Scene isDay={isDay} />
                <Sky />
            </Canvas>
        </div>
    );
}

// Render the App component
createRoot(document.getElementById('root')).render(<App />);

