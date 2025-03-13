import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Scene from './scene'
import Sky from './sky'
import './app.css'


createRoot(document.getElementById('root')).render(
    <Canvas camera={{ position: [0, 2, 20], fov: 70 }} shadows>
        <OrbitControls makeDefault />
        <color attach="background" args={["lightblue"]} />
        <directionalLight position={[-2, 5, 2]} castShadow={true}/>
        <ambientLight intensity={1.5} />
        <Scene />
        <Sky />
    </Canvas>
)
