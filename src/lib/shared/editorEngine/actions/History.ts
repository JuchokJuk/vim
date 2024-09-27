import { DoublyLinkedList } from '$lib/shared/utils/DoublyLinkedList';

type Action = {
	do: () => void;
	undo: () => void;
};

class History {
	// todo: undo/redo system

	undoStack = new DoublyLinkedList<Action>();
	redoStack = new DoublyLinkedList<Action>();

	undo() {
		if (this.undoStack.last) {
			this.undoStack.last.value.undo();
			this.redoStack.push(this.undoStack.pop()!);
		}
	}

	redo() {
		if (this.redoStack.last) {
			this.redoStack.last.value.do();
			this.undoStack.push(this.redoStack.pop()!);
		}
	}

	do(action: Action) {
		action.do();

		this.undoStack.push(action);

		if (this.undoStack.length > 100) {
			this.undoStack.shift();
		}

		this.redoStack.clear();
	}
}

export const history = new History();
