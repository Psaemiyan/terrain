import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
    <Canvas camera={{ position: [0, 1, 10], fov: 70 }} shadows>
        <directionalLight position={[-2, 5, 2]} castShadow={true}/>
        <ambientLight intensity={1.5} />
      <App />
    </Canvas>
)
