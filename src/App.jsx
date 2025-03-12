import { OrbitControls } from "@react-three/drei"
import Scene from "./scene"
import './app.css'

export default function App()
{
  return <>
    <OrbitControls makeDefault />
    <Scene />
  </>
}