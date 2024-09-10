<script lang="ts">
	import { T } from '@threlte/core';
	import { RepeatWrapping, Texture } from 'three';

	import { useTexture } from '@threlte/extras';
	import { spring } from '$lib/shared/utils/spring';

	const opacity = spring(1, { stiffness: 0.15, damping: 1 });

	function transform(texture: Texture) {
		texture.wrapS = RepeatWrapping;
		texture.wrapT = RepeatWrapping;
		texture.repeat.set(0.5, 0.5);
		return texture;
	}

	const map = useTexture('/textures/wall/baseColor.webp', { transform });
	const normalMap = useTexture('/textures/wall/normal.webp', { transform });
</script>

<T.MeshStandardMaterial
	color="#FFFFFF"
	transparent
	opacity={$opacity}
	metalness={0}
	roughness={0.9}
	map={$map}
	normalMap={$normalMap}
	userData={{ setOpacity: opacity.set }}
/>
