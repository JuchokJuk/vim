export type Entity = {
	offsetX: number; // отступ от начала стены вдоль длины стены
	offsetY: number; // отступ от начала стены вдоль высоты стены
	direction: 'left' | 'right'; // направление объекта внутрь или наружу
	position: 'center' | 'side'; // положение объекта: center - внутри стены, side - на стене
	cut?: {
		x: number;
		y: number;
		width: number;
		height: number;
	}; // вырез под объект в стене
	model?: string; // урл модели объекта
};

export type Wall = {
	start: { x: number; y: number; connections: Record<string, 'start' | 'end'> };
	end: { x: number; y: number; connections: Record<string, 'start' | 'end'> };
	height: number;
	thickness: number;
	entities?: Record<string, Entity>;
};

export const walls: Record<string, Wall> = {
	// квадратная квартира

	// толстые внешние стены
	'0': {
		start: { x: -8, y: 0, connections: { '8': 'end' } },
		end: { x: -4, y: 0, connections: { '1': 'start', '9': 'start' } },
		height: 3,
		thickness: 0.4
	},
	'1': {
		start: { x: -4, y: 0, connections: { '0': 'end', '9': 'start' } },
		end: { x: 0, y: 0, connections: { '2': 'start' } },
		height: 3,
		thickness: 0.4
	},
	'2': {
		start: { x: 0, y: 0, connections: { '1': 'end' } },
		end: { x: 0, y: 3.5, connections: { '3': 'start', '10': 'start' } },
		height: 3,
		thickness: 0.4,
		entities: {
			'0': {
				offsetX: 1.75,
				offsetY: 1.5,
				direction: 'left',
				position: 'center',
				cut: {
					x: -1,
					y: -0.75,
					width: 2,
					height: 1.5
				},
				model: '/models/window.glb'
			}
		}
	},
	'3': {
		start: { x: 0, y: 3.5, connections: { '2': 'end', '10': 'start' } },
		end: { x: 0, y: 8, connections: { '4': 'start' } },
		height: 3,
		thickness: 0.4,
		entities: {
			'0': {
				offsetX: 2.25,
				offsetY: 1.5,
				direction: 'left',
				position: 'center',
				cut: {
					x: -1,
					y: -0.75,
					width: 2,
					height: 1.5
				},
				model: '/models/window.glb'
			}
		}
	},
	'4': {
		start: { x: 0, y: 8, connections: { '3': 'end' } },
		end: { x: -4, y: 8, connections: { '5': 'start', '12': 'start' } },
		height: 3,
		thickness: 0.4
	},
	'5': {
		start: { x: -4, y: 8, connections: { '4': 'end', '12': 'start' } },
		end: { x: -8, y: 8, connections: { '6': 'start' } },
		height: 3,
		thickness: 0.4
	},
	'6': {
		start: { x: -8, y: 8, connections: { '5': 'end' } },
		end: { x: -8, y: 5, connections: { '7': 'start', '13': 'start' } },
		height: 3,
		thickness: 0.4,
		entities: {
			'0': {
				offsetX: 1.75,
				offsetY: 1.5,
				direction: 'left',
				position: 'center',
				cut: {
					x: -0.75,
					y: -0.75,
					width: 1.5,
					height: 1.5
				},
				model: '/models/window.glb'
			}
		}
	},
	'7': {
		start: { x: -8, y: 5, connections: { '6': 'end', '13': 'start' } },
		end: { x: -8, y: 1.5, connections: { '8': 'start', '16': 'end' } },
		height: 3,
		thickness: 0.4
	},
	'8': {
		start: { x: -8, y: 1.5, connections: { '7': 'end', '16': 'end' } },
		end: { x: -8, y: 0, connections: { 0: 'start' } },
		height: 3,
		thickness: 0.4,
		entities: {
			'0': {
				offsetX: 0.75,
				offsetY: 0,
				direction: 'left',
				position: 'center',
				cut: {
					x: -0.425,
					y: 0,
					width: 0.85,
					height: 2.125
				},
				model: '/models/door.glb'
			}
		}
	},

	// тонкие внутренние стены
	'9': {
		start: { x: -4, y: 0, connections: { '0': 'end', '1': 'start' } },
		end: { x: -4, y: 3.5, connections: { '10': 'end', '11': 'end' } },
		height: 3,
		thickness: 0.2,
		entities: {
			'0': {
				offsetX: 2.75,
				offsetY: 0,
				direction: 'left',
				position: 'center',
				cut: {
					x: -0.425,
					y: 0,
					width: 0.85,
					height: 2.125
				},
				model: '/models/door.glb'
			}
		}
	},
	'10': {
		start: { x: 0, y: 3.5, connections: { '2': 'end', '3': 'start' } },
		end: { x: -4, y: 3.5, connections: { '11': 'start', '9': 'end' } },
		height: 3,
		thickness: 0.2
	},
	'11': {
		start: { x: -4, y: 3.5, connections: { '10': 'end', '9': 'end' } },
		end: { x: -4, y: 5, connections: { '12': 'start', '14': 'end' } },
		height: 3,
		thickness: 0.2,
		entities: {
			'0': {
				offsetX: 0.75,
				offsetY: 0,
				direction: 'left',
				position: 'center',
				cut: {
					x: -0.425,
					y: 0,
					width: 0.85,
					height: 2.125
				},
				model: '/models/door.glb'
			}
		}
	},
	'12': {
		start: { x: -4, y: 8, connections: { '4': 'end', '5': 'start' } },
		end: { x: -4, y: 5, connections: { '11': 'end', '14': 'end' } },
		height: 3,
		thickness: 0.2
	},
	'13': {
		start: { x: -8, y: 5, connections: { '6': 'end', '7': 'start' } },
		end: { x: -5.5, y: 5, connections: { '14': 'start', '15': 'start' } },
		height: 3,
		thickness: 0.2
	},
	'14': {
		start: { x: -5.5, y: 5, connections: { '13': 'end', '15': 'start' } },
		end: { x: -4, y: 5, connections: { '11': 'end', '12': 'end' } },
		height: 3,
		thickness: 0.2,
		entities: {
			'0': {
				offsetX: 0.75,
				offsetY: 0,
				direction: 'left',
				position: 'center',
				cut: {
					x: -0.425,
					y: 0,
					width: 0.85,
					height: 2.125
				},
				model: '/models/door.glb'
			}
		}
	},
	'15': {
		start: { x: -5.5, y: 5, connections: { '14': 'start', '13': 'end' } },
		end: { x: -5.5, y: 1.5, connections: { '16': 'start' } },
		height: 3,
		thickness: 0.2,
		entities: {
			'0': {
				offsetX: 1.5,
				offsetY: 0,
				direction: 'left',
				position: 'center',
				cut: {
					x: -0.425,
					y: 0,
					width: 0.85,
					height: 2.125
				},
				model: '/models/door.glb'
			}
		}
	},
	'16': {
		start: { x: -5.5, y: 1.5, connections: { '15': 'end' } },
		end: { x: -8, y: 1.5, connections: { '8': 'start', '7': 'end' } },
		height: 3,
		thickness: 0.2
	}
};
