<script lang="ts">
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';
	import roomURL from './room.glb?url';

	const gltf = useGltf(roomURL);
</script>

{#await gltf then gltf}
	<T.Group position.y={0.1}>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Base.geometry}
			material={gltf.materials.Base}
			position={[-2.04, 0.14, -0.88]}
		/>
		<!-- <T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Window_glass.geometry}
			material={gltf.materials['Window glass']}
			position={[3.37, 1.83, 4.87]}
			rotation={[Math.PI, 0, Math.PI / 2]}
		/> -->
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Balustrade.geometry}
			material={gltf.materials.Balustrade}
			position={[4.88, -1.35, 6.84]}
			rotation={[Math.PI, 0, Math.PI]}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Walls_inside.geometry}
			material={gltf.materials['Wall plaster']}
			position={[-0.81, 2.08, -1.89]}
		/>
		<T.Group position={[0, 0, 9.42]}>
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Mesh002.geometry} material={gltf.materials.Copper} />
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Mesh002_1.geometry} material={gltf.materials['White window']} />
		</T.Group>
		<T.Group position={[0, 1.7, 0]} scale={[1.58, 1, 1.58]}>
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube004.geometry} material={gltf.materials.Ceiling} />
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube004_1.geometry} material={gltf.materials.Base} />
		</T.Group>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Window_sill.geometry}
			material={gltf.materials['Marble 01']}
			position={[0, 1.5, 0]}
			scale={[1.58, 1, 1.58]}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Door_frame.geometry}
			material={gltf.materials.White_Door}
			position={[-1.48, 1.23, 2.14]}
			rotation={[Math.PI / 2, 0, Math.PI / 2]}
			scale={0.01}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Handle.geometry}
			material={gltf.materials.Copper}
			position={[3.25, 1.14, 4.92]}
			rotation={[Math.PI / 2, 0, 0]}
			scale={0.01}
		/>
		<T.Group position={[0, 0, 4.9]}>
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Mesh019.geometry} material={gltf.materials.Copper} />
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Mesh019_1.geometry} material={gltf.materials['White window']} />
		</T.Group>
		<T.Group position={[-6.06, 1.37, 0.05]} rotation={[Math.PI / 2, 0, -Math.PI]} scale={0.01}>
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Untitled005.geometry} material={gltf.materials.Copper} />
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Untitled005_1.geometry} material={gltf.materials.White_Door} />
		</T.Group>
		<T.Group position={[-3.98, 1.37, 6.14]} rotation={[Math.PI / 2, 0, -Math.PI]} scale={0.01}>
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Untitled006.geometry} material={gltf.materials.Copper} />
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Untitled006_1.geometry} material={gltf.materials.White_Door} />
		</T.Group>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Ceiling_top.geometry}
			material={gltf.materials['White plane']}
			position={[0, 1.5, 0]}
			scale={[1.58, 1, 1.58]}
		/>
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Shelfs.geometry} material={gltf.materials.Base} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Shelf.geometry} material={gltf.materials['Marble 01']} />
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Walls_outside.geometry}
			material={gltf.materials['White plane']}
			position={[0, 1.5, 0]}
			scale={[1.58, 1, 1.58]}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Cabinet.geometry}
			material={gltf.materials.Wood}
			position={[-2.76, 0, 6.83]}
			rotation={[Math.PI, 0, Math.PI]}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Table.geometry}
			material={gltf.materials.Table}
			position={[-0.94, 0, 4.83]}
			rotation={[Math.PI / 2, 0, 0]}
			scale={0.01}
		/>
		<T.Group position={[1.44, 0, 1.3]} rotation={[Math.PI / 2, 0, 0.07]} scale={0.01}>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.ZU_OMG_Chair010.geometry}
				material={gltf.materials['Black legs']}
			/>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.ZU_OMG_Chair010_1.geometry}
				material={gltf.materials['Chair fabric 02']}
			/>
		</T.Group>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Drawer.geometry}
			material={gltf.materials.Wood}
			position={[-4.26, 0.39, 1.72]}
			rotation={[0, 1.57, 0]}
			scale={[1.39, 1, 1.39]}
		/>
		<T.Group position={[-4.05, 0.35, -2.56]} rotation={[0, 0.01, 0]}>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.ASTON_ARMCHAIR_CM74_001.geometry}
				material={gltf.materials['Armchair fabric 02']}
			/>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.ASTON_ARMCHAIR_CM74_001_1.geometry}
				material={gltf.materials['Black legs']}
			/>
		</T.Group>
		<T.Group position={[-2.44, 0.35, -2.57]} rotation={[0, 0.64, 0]}>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.ASTON_ARMCHAIR_CM74_001.geometry}
				material={gltf.materials['Armchair fabric 02']}
			/>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.ASTON_ARMCHAIR_CM74_001_1.geometry}
				material={gltf.materials['Black legs']}
			/>
		</T.Group>
		<T.Group position={[1.73, 0.44, -5.51]} rotation={[0, -Math.PI / 3, 0]}>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes['LESLIE_BERG�RE_CM68_027'].geometry}
				material={gltf.materials['Armchair back']}
			/>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes['LESLIE_BERG�RE_CM68_027_1'].geometry}
				material={gltf.materials['Armchair fabric 01']}
			/>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes['LESLIE_BERG�RE_CM68_027_2'].geometry}
				material={gltf.materials['Black legs']}
			/>
		</T.Group>
		<T.Group position={[-3.39, 0.02, -3.68]}>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.Ligne_Roset_Liam_Low_Table.geometry}
				material={gltf.materials.Copper}
			/>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.Ligne_Roset_Liam_Low_Table_1.geometry}
				material={gltf.materials['Glass table']}
			/>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.Ligne_Roset_Liam_Low_Table_2.geometry}
				material={gltf.materials['Glass table edge']}
			/>
		</T.Group>
		<T.Group position={[-3.83, 0.38, -5.09]} rotation={[0, 0.43, 0]}>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes._SEYMOUR_SEMI_ROUND_SOFA_MIX_CM_315_045002.geometry}
				material={gltf.materials['Sofa fabric']}
			/>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes._SEYMOUR_SEMI_ROUND_SOFA_MIX_CM_315_045002_1.geometry}
				material={gltf.materials['Sofa legs']}
			/>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes._SEYMOUR_SEMI_ROUND_SOFA_MIX_CM_315_045002_2.geometry}
				material={gltf.materials['Sofa pillows']}
			/>
		</T.Group>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Desk.geometry}
			material={gltf.materials.Wood}
			position={[1.37, 0, 1.84]}
		/>
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Pot.geometry} material={gltf.materials.Clay} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Painting_02.geometry} material={gltf.materials['Painting 02']} />
		<T.Group position={[-3.84, 1.61, 2.08]} rotation={[-Math.PI / 2, 0, 0]} scale={0.4}>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.frame_IKEA003.geometry}
				material={gltf.materials['Frame black']}
			/>
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.frame_IKEA003_1.geometry} material={gltf.materials.Picture_02} />
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.frame_IKEA003_2.geometry}
				material={gltf.materials['passe-partout']}
			/>
		</T.Group>
		<T.Group position={[-4.47, 1.93, 2.07]} rotation={[-Math.PI / 2, 0, 0]} scale={0.76}>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.frame_IKEA004.geometry}
				material={gltf.materials['Frame black']}
			/>
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.frame_IKEA004_1.geometry} material={gltf.materials.Picture_02} />
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.frame_IKEA004_2.geometry}
				material={gltf.materials['passe-partout']}
			/>
		</T.Group>
		<T.Group position={[-3.82, 2.08, 2.08]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={0.57}>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.frame_IKEA005.geometry}
				material={gltf.materials['Frame black']}
			/>
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.frame_IKEA005_1.geometry} material={gltf.materials.Picture_04} />
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.frame_IKEA005_2.geometry}
				material={gltf.materials['passe-partout']}
			/>
		</T.Group>
		<T.Group position={[-3.84, 1.21, 2.08]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={0.4}>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.frame_IKEA006.geometry}
				material={gltf.materials['Frame black']}
			/>
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.frame_IKEA006_1.geometry} material={gltf.materials.Picture_03} />
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.frame_IKEA006_2.geometry}
				material={gltf.materials['passe-partout']}
			/>
		</T.Group>
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Painting_03.geometry} material={gltf.materials['Painting 03']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Painting_01.geometry} material={gltf.materials['Painting 01']} />
		<T.Group position={[-1.02, 1.96, 4.83]}>
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Mesh004.geometry} material={gltf.materials['Lamp black']} />
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Mesh004_1.geometry} material={gltf.materials['Lamp white']} />
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.Mesh004_2.geometry}
				material={gltf.materials['Lamp light table']}
			/>
		</T.Group>
		<T.Group position={[0.91, 0, -6.01]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.ZU_Tripod.geometry} material={gltf.materials['White lamp']} />
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.ZU_Tripod_1.geometry} material={gltf.materials.Wood} />
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.ZU_Tripod_2.geometry} material={gltf.materials['Lamp light']} />
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.ZU_Tripod_3.geometry} material={gltf.materials['Metal Lamp']} />
		</T.Group>
		<T.Group position={[-3.15, 2.28, -3.94]} rotation={[0, 0.61, 0]} scale={0}>
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Mesh001.geometry} material={gltf.materials['Lamp light']} />
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Mesh001_1.geometry} material={gltf.materials['Lamp black']} />
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Mesh001_2.geometry} material={gltf.materials['Lamp glass']} />
		</T.Group>
		<T.Group position={[1.81, 0.74, 1.85]}>
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Tip_Table_Lamp.geometry} material={gltf.materials.Lamp_01} />
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.Tip_Table_Lamp_1.geometry}
				material={gltf.materials['Lamp light']}
			/>
		</T.Group>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Vase.geometry}
			material={gltf.materials['Marble 02']}
			position={[-1.17, 0.84, -6.54]}
		/>
		<T.Group position={[-4.76, 0.75, 1.8]} rotation={[Math.PI, 0, Math.PI]} scale={0.79}>
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.candle_1.geometry} material={gltf.materials['Marble 01']} />
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.candle_2.geometry} material={gltf.materials['Candle wick']} />
			<T.Mesh castShadow receiveShadow geometry={gltf.nodes.candle_3.geometry} material={gltf.materials.Candle} />
		</T.Group>
		<T.Group position={[-3.66, 0.64, 1.85]} rotation={[Math.PI, 0, Math.PI]}>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.Ligne_Roset_Lithos_book_set.geometry}
				material={gltf.materials['Book pages']}
			/>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.Ligne_Roset_Lithos_book_set_1.geometry}
				material={gltf.materials['Book cover 01']}
			/>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.Ligne_Roset_Lithos_book_set_2.geometry}
				material={gltf.materials['Book cover 02']}
			/>
		</T.Group>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Book_stand.geometry}
			material={gltf.materials['Marble 02']}
			position={[-3.66, 0.64, 1.85]}
			rotation={[Math.PI, 0, Math.PI]}
		/>
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Carpet.geometry} material={gltf.materials.Rug} />
		<T.Group position={[-3.36, 0.41, -3.58]}>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.Serax_Copper_Glass_Set.geometry}
				material={gltf.materials['Glass set']}
			/>
			<T.Mesh castShadow receiveShadow
				geometry={gltf.nodes.Serax_Copper_Glass_Set_1.geometry}
				material={gltf.materials.Copper}
			/>
		</T.Group>
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Mesh010.geometry} material={gltf.materials.Copper} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Mesh010_1.geometry} material={gltf.materials['White window']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube008.geometry} material={gltf.materials.Floor} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube008_1.geometry} material={gltf.materials['Balcony floor']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Nimbus_Rectangular.geometry} material={gltf.materials.Mirror} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Nimbus_Rectangular_1.geometry} material={gltf.materials.Copper} />
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.ZU_OMG_Chair004.geometry}
			material={gltf.materials['Black legs']}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.ZU_OMG_Chair004_1.geometry}
			material={gltf.materials['Chair fabric 01']}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.ZU_OMG_Chair002.geometry}
			material={gltf.materials['Black legs']}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.ZU_OMG_Chair002_1.geometry}
			material={gltf.materials['Chair fabric 02']}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.ZU_OMG_Chair003.geometry}
			material={gltf.materials['Black legs']}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.ZU_OMG_Chair003_1.geometry}
			material={gltf.materials['Chair fabric 01']}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.ZU_OMG_Chair008.geometry}
			material={gltf.materials['Black legs']}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.ZU_OMG_Chair008_1.geometry}
			material={gltf.materials['Chair fabric 02']}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.ZU_OMG_Chair005.geometry}
			material={gltf.materials['Black legs']}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.ZU_OMG_Chair005_1.geometry}
			material={gltf.materials['Chair fabric 02']}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.ZU_OMG_Chair001.geometry}
			material={gltf.materials['Black legs']}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.ZU_OMG_Chair001_1.geometry}
			material={gltf.materials['Chair fabric 01']}
		/>
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Mesh007.geometry} material={gltf.materials['Glass stove']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Mesh007_1.geometry} material={gltf.materials['Stove black']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Mesh007_2.geometry} material={gltf.materials['Stove glass']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Mesh007_3.geometry} material={gltf.materials.Fire} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.NurbsPath001.geometry} material={gltf.materials.Clay} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.NurbsPath001_1.geometry} material={gltf.materials.Soil} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.NurbsPath001_2.geometry} material={gltf.materials['Wood plant']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.NurbsPath001_3.geometry} material={gltf.materials.Stalk_01} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.NurbsPath001_4.geometry} material={gltf.materials.Leaf_01} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.NurbsPath001_5.geometry} material={gltf.materials.Leaf_02} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.NurbsPath001_6.geometry} material={gltf.materials.Leaf_03} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.plant004.geometry} material={gltf.materials.Leaves} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.plant004_1.geometry} material={gltf.materials.Band} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.plant004_2.geometry} material={gltf.materials.Soil} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.plant004_3.geometry} material={gltf.materials.Stalk_02} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.plant004_4.geometry} material={gltf.materials['Wood plant']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.frame_IKEA.geometry} material={gltf.materials['Frame gold']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.frame_IKEA_1.geometry} material={gltf.materials['Painting 04']} />
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.frame_IKEA_2.geometry}
			material={gltf.materials['passe-partout']}
		/>
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.frame_IKEA001.geometry} material={gltf.materials['Frame gold']} />
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.frame_IKEA001_1.geometry}
			material={gltf.materials['Painting 04']}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.frame_IKEA001_2.geometry}
			material={gltf.materials['passe-partout']}
		/>
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.frame_IKEA002.geometry} material={gltf.materials['Frame gold']} />
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.frame_IKEA002_1.geometry}
			material={gltf.materials['Painting 04']}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.frame_IKEA002_2.geometry}
			material={gltf.materials['passe-partout']}
		/>
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Sphere.geometry} material={gltf.materials.Copper} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Sphere_1.geometry} material={gltf.materials['White Ball']} />
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Cylinder001.geometry}
			material={gltf.materials['Computer screen']}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Cylinder001_1.geometry}
			material={gltf.materials['Computer logo']}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Cylinder001_2.geometry}
			material={gltf.materials['Computer aluminum']}
		/>
		<T.Mesh castShadow receiveShadow
			geometry={gltf.nodes.Cylinder001_3.geometry}
			material={gltf.materials['Computer keyboard']}
		/>
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube077.geometry} material={gltf.materials['Book cover_01']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube077_1.geometry} material={gltf.materials['Book cover_02']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube077_2.geometry} material={gltf.materials['Books pages']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube165.geometry} material={gltf.materials['Book cover_01']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube165_1.geometry} material={gltf.materials['Book cover_02']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube165_2.geometry} material={gltf.materials['Books pages']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube149.geometry} material={gltf.materials['Book cover_01']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube149_1.geometry} material={gltf.materials['Book cover_02']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube149_2.geometry} material={gltf.materials['Books pages']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube002.geometry} material={gltf.materials['Book cover_01']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube002_1.geometry} material={gltf.materials['Book cover_02']} />
		<T.Mesh castShadow receiveShadow geometry={gltf.nodes.Cube002_2.geometry} material={gltf.materials['Books pages']} />
	</T.Group>
{/await}
