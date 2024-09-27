type ShortcutHandler = (event: KeyboardEvent) => void;
type ShortcutConfig = {
	keys: string[];
	callback: ShortcutHandler;
};

export function shortcut(node: HTMLElement, shortcuts: ShortcutConfig[]) {
	const handleKeydown = (event: KeyboardEvent) => {
		// Create a Set of currently pressed keys (including modifiers)
		const pressedKeys = new Set<string>();

		if (event.ctrlKey) pressedKeys.add('Control');
		if (event.shiftKey) pressedKeys.add('Shift');
		if (event.altKey) pressedKeys.add('Alt');
		if (event.metaKey) pressedKeys.add('Meta');

		pressedKeys.add(event.code);

		// Loop through the configured shortcuts
		for (const shortcut of shortcuts) {
			const requiredKeys = new Set(shortcut.keys);
			// Check if both sets of keys (pressed and required) match
			if (
				requiredKeys.size === pressedKeys.size &&
				[...requiredKeys].every((key) => pressedKeys.has(key))
			) {
				event.preventDefault(); // Prevent default browser actions for certain shortcuts like Ctrl+S
				shortcut.callback(event); // Call the associated callback
			}
		}
	};

	node.addEventListener('keydown', handleKeydown);

	return {
		destroy() {
			node.removeEventListener('keydown', handleKeydown);
		}
	};
}
