import {
  useGLTF,
  useTexture,
  MeshPortalMaterial,
  RoundedBox,
  Float,
  CameraControls,
  Text,
} from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

const Experience = () => {
  const model = useGLTF("./public/model/1.glb");
  const Texture = useTexture("./public/texture/1.png");

  const [active, setActive] = useState(false);

  // 修正済み useRef
  const cameraControlsRef = useRef<CameraControls | null>(null);
  const meshPortalMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  const handleClick = () => {
    setActive(!active);
  };

  useFrame((_, delta) => {
    if (meshPortalMaterialRef.current) {
      easing.damp(
        meshPortalMaterialRef.current,
        "blend",
        active ? 1 : 0,
        0.2,
        delta
      );
    }
  });

  useEffect(() => {
    if (cameraControlsRef.current) {
      if (active) {
        cameraControlsRef.current.setLookAt(0, 0, 3, 0, 0, 0, true);
      } else {
        cameraControlsRef.current.setLookAt(0, 0, 5, 0, 0, 0, true);
      }
    }
  }, [active]);

  return (
    <>
      <CameraControls ref={cameraControlsRef} />

      <Text position={[0, 1.5, 0.1]} fontSize={0.6}>
        Eggs
        <meshBasicMaterial toneMapped={false} />
      </Text>

      <Float>
        <RoundedBox args={[3, 4, 0.1]} radius={0.2} onDoubleClick={handleClick}>
          <MeshPortalMaterial blend={active ? 1 : 0}>
            <primitive object={model.scene} scale={0.4} position-y={0.4} />
            <mesh>
              <sphereGeometry args={[3, 500, 500]} />
              <meshBasicMaterial map={Texture} side={THREE.BackSide} />
            </mesh>
          </MeshPortalMaterial>
        </RoundedBox>
      </Float>
    </>
  );
};

export default Experience;
