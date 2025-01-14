function checkAnswers(quiz) {
	let total = 0;
	let correct = 0;
	for(let i = 0; i < quiz.questions.length; i++) {
		let subtotal = 0;
		let subcorrect = 0;
		for(let j = 0; j < quiz.questions[i].options.length; j++, subtotal++) {
			let option = document.getElementById(`question-${i + 1}-option-${j + 1}-input`);
			let option_container = document.getElementById(`question-${i + 1}-option-${j + 1}`);
			option_container.classList.remove("option-correct", "option-incorrect");
			if(option.checked == quiz.questions[i].options[j].correct) {
				option_container.classList.add("option-correct");
				subcorrect++;
			} else {
				option_container.classList.add("option-incorrect");
			}
		}
		let score = document.getElementById(`question-${i + 1}-score`);
		score.innerHTML = `${subcorrect} von ${subtotal} richtig`;
		score.style.display = "block";
		total += subtotal;
		correct += subcorrect;
	}
	let total_score = document.getElementById(`total-score`);
	total_score.innerText = `${correct} von ${total} richtig. Das entspricht ${(correct / total * 100).toFixed(0)}%.`;
}

addEventListener("submit", (e) => {
	e.preventDefault();
	checkAnswers(current_page_quiz)
})


