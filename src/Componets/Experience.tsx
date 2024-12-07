import {
  useGLTF,
  useTexture,
  MeshPortalMaterial,
  RoundedBox,
  CameraControls,
  PortalMaterialType,
} from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

const Experience = () => {
  const model = useGLTF("/public/model/1.glb");
  const Texture = useTexture("/public/texture/1.png");

  const [active, setActive] = useState(false);
  // 修正された useRef
  const meshPortalMaterialRef = useRef<PortalMaterialType | null>(null);
  const cameraControlsRef = useRef<CameraControls | null>(null);
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
        cameraControlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true);
      } else {
        cameraControlsRef.current.setLookAt(0, 0, -5, 0, 0, 0, true);
      }
    }
  }, [active]);

  return (
    <>
      <CameraControls ref={cameraControlsRef} />

      <RoundedBox args={[2, 3, 0.1]} radius={0.2} onDoubleClick={handleClick}>
        <MeshPortalMaterial ref={meshPortalMaterialRef}>
          <primitive object={model.scene} scale={0.4} position-y={0.4} />
          <mesh>
            <sphereGeometry args={[20, 63, 63]} />
            <meshBasicMaterial map={Texture} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </>
  );
};

export default Experience;
