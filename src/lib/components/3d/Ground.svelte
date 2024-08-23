<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { useTexture } from '@threlte/extras';
	import { AutoColliders } from '@threlte/rapier';
	import { MeshStandardMaterial, RepeatWrapping, Texture } from 'three';

	function transform(texture: Texture) {
		texture.wrapS = RepeatWrapping;
		texture.wrapT = RepeatWrapping;
		texture.repeat.set(4, 4);
		return texture;
	}

	const color = useTexture('/textures/ground/baseColor.webp', { transform });
	const metallicRoughness = useTexture('/textures/ground/metallicRoughness.webp', { transform });
	const normal = useTexture('/textures/ground/normal.webp', { transform });

	const groundMaterial = new MeshStandardMaterial({
		color: '#F4EFE9'
	});

	Promise.all([color, metallicRoughness, normal]).then(([color, metallicRoughness, normal]) => {
		groundMaterial.map = color;
		groundMaterial.metalnessMap = metallicRoughness;
		groundMaterial.roughnessMap = metallicRoughness;
		groundMaterial.normalMap = normal;
		groundMaterial.needsUpdate = true;
	});
</script>

<AutoColliders shape="trimesh" friction={0}>
	<T.Mesh rotation.x={Math.PI * -0.5} position.x={-4} position.z={-4} receiveShadow>
		<T.PlaneGeometry args={[8, 8]} />
		<T is={groundMaterial} />
	</T.Mesh>
</AutoColliders>
