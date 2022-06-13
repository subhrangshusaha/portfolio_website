class TypeWriter {

	constructor(txtElement, words, wait = 2000) {
		this.txtElement = txtElement;
		this.words = words;
		this.txt = '';
		this.wordIndex = 0;
		this.wait = parseInt(wait, 10);
		this.type();
		this.isDeleting = false;
	}

	// Type Method
	type() {
		// Current index of word
		const current = this.wordIndex % this.words.length;
		// Get full text of current word
		const fullTxt = this.words[current];

		// Type Speed
		let typeSpeed = 300;

		// Check if deleting
		if (this.isDeleting) {
			// remove char
			this.txt = fullTxt.substring(0, this.txt.length - 1);

			// change type speed
			typeSpeed /= 2;
		} else {
			// add char
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		// Insert txt into elemnt
		this.txtElement.innerHTML = this.txt;

		// Check if typing word is complete
		if (!this.isDeleting && this.txt === fullTxt) {
			// pause at end
			typeSpeed = this.wait;
			// set isDeleting to true
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
			// set isDeleting to true
			this.isDeleting = false;
			// Move to next word
			this.wordIndex++;
			// Pause before typing
			typeSpeed = 500;
		}

		setTimeout(() => this.type(), typeSpeed);
	}
}

// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

function init() {
	const txtElement = document.querySelector('.txt-type');
	const words = JSON.parse(txtElement.getAttribute('data-words'));
	const wait = txtElement.getAttribute('data-wait');

	// Init TypeWriter
	new TypeWriter(txtElement, words, wait);
}

