function checkAnswers(quiz) {
	let total = 0;
	let correct = 0;
	for(let i = 0; i < quiz.questions.length; i++) {
		let subscore;
		switch(quiz.questions[i].type) {
			case "checkbox":
				subscore = checkboxHandler(quiz.questions[i], i);
				break;
			case "radio":
				subscore = radioHandler(quiz.questions[i], i);
				break;
			default:
				subscore = {subtotal: 0, subcorrect: 0};
		}
		let score = document.getElementById(`question-${i + 1}-score`);
		score.innerHTML = `${subscore.subcorrect} von ${subscore.subtotal} richtig`;
		score.style.display = "block";
		total += subscore.subtotal;
		correct += subscore.subcorrect;
	}
	let total_score = document.getElementById(`total-score`);
	total_score.innerText = `${correct} von ${total} richtig. Das entspricht ${(correct / total * 100).toFixed(0)}%.`;
}

function checkboxHandler(question, questionIndex) {
	let subtotal = 0, subcorrect = 0;
	for(let i = 0; i < question.options.length; i++) {
		let option = document.getElementById(`question-${questionIndex + 1}-option-${i + 1}-input`);
		let option_container = document.getElementById(`question-${questionIndex + 1}-option-${i + 1}`);
		if(option.checked === question.options[i].correct) {
			subcorrect++;
			option_container.classList.add("option-correct");
		} else {
			option_container.classList.add("option-incorrect");
		}
		subtotal++;
	}
	return {subtotal: subtotal, subcorrect: subcorrect}
}

function radioHandler(question, questionIndex) {
	let subtotal = 1, subcorrect = 0;
	for(let i = 0; i < question.options.length; i++) {
		let option = document.getElementById(`question-${questionIndex + 1}-option-${i + 1}-input`);
		let option_container = document.getElementById(`question-${questionIndex + 1}-option-${i + 1}`);
		if(option.checked === question.options[i].correct) {
			subcorrect = 1;
			option_container.classList.add("option-correct");
			break;
		} else {
			option_container.classList.add("option-incorrect");
		}
	}
	return {subtotal: subtotal, subcorrect: subcorrect}
}

addEventListener("submit", (e) => {
	e.preventDefault();
	checkAnswers(current_page_quiz)
})


