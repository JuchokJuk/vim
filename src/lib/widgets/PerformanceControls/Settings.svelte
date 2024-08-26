<script lang="ts">
	import { resolution, options } from '$lib/shared/store/performanceSettings/resolution';
	import {
		ambientOcclusion,
		antiAliasing,
		bloom,
		noise,
		postProcessing
	} from '$lib/shared/store/performanceSettings/postProcessing';
	import Switch from '$lib/shared/UI/Switch.svelte';
	import ToggleGroup from '$lib/shared/UI/ToggleGroup.svelte';
	import { X } from 'lucide-svelte';
	import { shadows, softShadows } from '$lib/shared/store/performanceSettings/shadows';
	import {
		degradePostProcessing,
		degradeQualityOnFrequentRerender,
		degradeResolution
	} from '$lib/shared/store/performanceSettings/degradeQualityOnRerender';
	import { realisticMirrors } from '$lib/shared/store/performanceSettings/realisticMirrors';

	export let close: () => void;
</script>

<div class="content">
	<div class="section py-xl pl-3xl pr-xl">
		<div class="flex justify-between items-center gap-3xl">
			<p class="paragraph-2xl">Настройки графики</p>
			<button on:pointerdown={close}>
				<X class="icon" />
			</button>
		</div>
	</div>
	<div class="scroll">
		<div class="section p-3xl">
			<div class="flex flex-col gap-lg">
				<p class="paragraph-xl">Разрешение</p>
				<ToggleGroup
					class="toggle-group rounded-lg p-xs"
					fullWidth
					color="primary"
					activeItemIndex={options.findIndex((option) => option === $resolution)}
					items={options.map((option) => ({
						value: String(option),
						label: String(option),
						handler: () => {
							resolution.set(option);
						}
					}))}
				/>
			</div>
		</div>
		<div class="section p-3xl">
			<div class="flex flex-col gap-xl">
				<div class="flex justify-between items-center gap-3xl">
					<p class="paragraph-xl">Постобработка</p>
					<Switch bind:value={$postProcessing} />
				</div>

				<div class="flex flex-col gap-md">
					<div class="flex justify-between items-center gap-3xl">
						<p class="paragraph-md">Глобальное затемнение</p>
						<Switch bind:value={$ambientOcclusion} />
					</div>
					<div class="flex justify-between items-center gap-3xl">
						<p class="paragraph-md">Свечение</p>
						<Switch bind:value={$bloom} />
					</div>
					<div class="flex justify-between items-center gap-3xl">
						<p class="paragraph-md">Сглаживание</p>
						<Switch bind:value={$antiAliasing} />
					</div>
					<div class="flex justify-between items-center gap-3xl">
						<p class="paragraph-md">Шум</p>
						<Switch bind:value={$noise} />
					</div>
				</div>
			</div>
		</div>
		<div class="section p-3xl">
			<div class="flex flex-col gap-xl">
				<div class="flex justify-between items-center gap-3xl">
					<p class="paragraph-xl">Тени</p>
					<Switch bind:value={$shadows} />
				</div>
				<div class="flex justify-between items-center gap-3xl">
					<p class="paragraph-md">Мягкие тени</p>
					<Switch bind:value={$softShadows} />
				</div>
			</div>
		</div>
		<div class="section p-3xl">
			<div class="flex flex-col gap-xl">
				<div class="flex justify-between items-center gap-3xl">
					<p class="paragraph-xl">Ухудшать качество при частой перерисовке</p>
					<Switch bind:value={$degradeQualityOnFrequentRerender} />
				</div>

				<div class="flex flex-col gap-md">
					<div class="flex justify-between items-center gap-3xl">
						<p class="paragraph-md">Выключать постобработку</p>
						<Switch bind:value={$degradePostProcessing} />
					</div>
					<div class="flex justify-between items-center gap-3xl">
						<p class="paragraph-md">Уменьшать разрешение</p>
						<Switch bind:value={$degradeResolution} />
					</div>
				</div>
			</div>
		</div>
		<div class="section p-3xl">
			<div class="flex justify-between items-center gap-3xl">
				<p class="paragraph-md">Реалистичные зеркала</p>
				<Switch bind:value={$realisticMirrors} />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.content {
		width: clamp(320px - 16px * 2, calc(100vw - 16px * 2), 340px);
		
		button {
			border: none;
			background: none;

			width: 40px;
			height: 40px;

			display: grid;

			cursor: pointer;

			&:focus {
				outline: none;
			}
			&:hover {
				:global(.icon) {
					color: var(--text-1);
				}
			}
			:global(.icon) {
				margin: 10px;
				width: 20px;
				height: 20px;
				color: var(--text-0);
				transition: color 0.2s;
			}
		}

		.paragraph-2xl,
		.paragraph-xl {
			color: var(--text-2);
		}

		:global(.toggle-group) {
			background: var(--surface-2);
			margin-left: -1 * map.get($spacing, xs);
			margin-right: -1 * map.get($spacing, xs);
		}

		.scroll {
			overflow: auto;
			max-height: calc(100vh - map.get($spacing, xl) * 2 - 72.8px);

			&::-webkit-scrollbar {
				display: none;
			}
		}

		.section {
			border-bottom: 1px solid var(--outline-0);
		}
	}
</style>
