'use client';
import { useEffect } from 'react';
import { useFrame, useGraph } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import type { BufferGeometry, Euler, Material, Mesh } from 'three'; // Import the required types
import { Category } from '@mediapipe/tasks-vision';

let headMesh: Mesh<BufferGeometry, Material | Material[]>;
function Avatar({
  url,
  blendshapes,
  rotation,
}: {
  url: string;
  blendshapes: Category[];
  rotation: Euler;
}) {
  const { scene } = useGLTF(url);
  const { nodes } = useGraph(scene);

  useEffect(() => {
    headMesh =
      (nodes.Wolf3D_Head as Mesh<BufferGeometry, Material | Material[]>) ||
      (nodes.Wolf3D_Avatar as Mesh<BufferGeometry, Material | Material[]>) ||
      (nodes.Wolf3D_Head_Custom as Mesh<BufferGeometry, Material | Material[]>);
  }, [nodes, url]);

  useFrame((_, delta) => {
    if (headMesh?.morphTargetInfluences && blendshapes.length > 0) {
      blendshapes.forEach((element) => {
        if (headMesh.morphTargetDictionary && headMesh.morphTargetInfluences) {
          let index = headMesh.morphTargetDictionary[element.categoryName];
          if (index >= 0) {
            headMesh.morphTargetInfluences[index] = element.score;
          }
        }
      });

      nodes.Head.rotation.set(rotation.x, rotation.y, rotation.z);
      nodes.Neck.rotation.set(
        rotation.x / 5 + 0.3,
        rotation.y / 5,
        rotation.z / 5,
      );
      nodes.Spine2.rotation.set(rotation.x / 3, rotation.y / 3, rotation.z / 3);
    }
  });

  return <primitive object={scene} position={[0, -1.65, 4]} />;
}

export default Avatar;
