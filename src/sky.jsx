import { Clouds, Cloud } from "@react-three/drei"

export default function Sky()
{
    return <>
    <Clouds>
        <Puffycloud scale={.3} position={[1, 5, -3]} />
    </Clouds>
    </>
}


const Puffycloud = ({ children, ...props }) => {
  return (
    <group {...props}>
      {children}
      <Cloud scale={2} speed={0.5} opacity={0.9} />
    </group>
  );
}

