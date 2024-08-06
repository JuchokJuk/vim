/* eslint-disable @typescript-eslint/no-explicit-any */
export function outside(element: HTMLElement, { event, cb }: { event: string; cb: any }) {
	function onClick(event: any) {
		if (!element.contains(event.target)) {
			cb();
		}
	}

	document.body.addEventListener(event, onClick);

	return {
		update(newCallbackFunction: any) {
			cb = newCallbackFunction;
		},
		destroy() {
			document.body.removeEventListener(event, onClick);
		}
	};
}
