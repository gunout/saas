import { useGLTF, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const MobileHomeConfigurator = ({ baseModel, options }) => {
  const { scene } = useGLTF(baseModel);
  
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <primitive 
        object={scene} 
        scale={[0.1, 0.1, 0.1]}
        position={[0, -2, 0]}
      />
      <OrbitControls />
    </Canvas>
  );
};

// Composant d'options
const OptionSelector = ({ options, onSelect }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {options.map(option => (
        <TouchableOpacity 
          key={option.id}
          onPress={() => onSelect(option)}
          style={styles.optionCard}
        >
          <Image source={{ uri: option.thumbnail }} style={styles.optionImage} />
          <Text>{option.name} (+{option.priceImpact}€)</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};