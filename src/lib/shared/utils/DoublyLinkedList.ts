type DoublyLinkedListNode<T> = {
	value: T;
	prev: DoublyLinkedListNode<T> | null;
	next: DoublyLinkedListNode<T> | null;
};

export class DoublyLinkedList<T> {
	first: DoublyLinkedListNode<T> | null;
	last: DoublyLinkedListNode<T> | null;

	length: number;

	constructor() {
		this.first = null;
		this.last = null;
		this.length = 0;
	}

	// create new last item
	push(value: T) {
		const newItem = { value, next: null, prev: null } as DoublyLinkedListNode<T>;

		if (this.length === 0) {
			this.first = newItem;
			this.last = newItem;

			this.length++;
		} else {
			newItem.prev = this.last;

			this.last!.next = newItem;
			this.last = newItem;

			this.length++;
		}
	}

	// remove first item
	shift(): T | null {
		if (this.length === 0) return null;

		const removedItem = this.first!;

		if (this.length == 1) {
			this.first = null;
			this.last = null;
			this.length--;

			return removedItem.value;
		} else {
			this.first = this.first!.next;
			this.first!.prev = null;
			this.length--;

			return removedItem.value;
		}
	}

	// remove last item
	pop(): T | null {
		if (this.length === 0) return null;

		const removedItem = this.last!;

		if (this.length == 1) {
			this.first = null;
			this.last = null;
			this.length--;

			return removedItem.value;
		} else {
			this.last = this.last!.prev;
			this.last!.next = null;
			this.length--;

			return removedItem.value;
		}
	}

	// remove all items
	clear() {
		this.first = null;
		this.last = null;
		this.length = 0;
	}
}
