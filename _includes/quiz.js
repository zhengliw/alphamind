let answersChecked = false;
let elapsedTime = 0;
const timeout = 5;
const kickTimeout = 60;

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
	answersChecked = true;
}

function checkboxHandler(question, questionIndex) {
	let subtotal = 0, subcorrect = 0;
	for(let i = 0; i < question.options.length; i++) {
		let option = document.getElementById(`question-${questionIndex + 1}-option-${i + 1}-input`);
		let option_container = document.getElementById(`question-${questionIndex + 1}-option-${i + 1}`);
		option_container.classList.remove("option-incorrect", "option-correct");
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
	let subtotal = 1, subcorrect = 1;
	for(let i = 0; i < question.options.length; i++) {
		let option = document.getElementById(`question-${questionIndex + 1}-option-${i + 1}-input`);
		let option_container = document.getElementById(`question-${questionIndex + 1}-option-${i + 1}`);
		option_container.classList.remove("option-incorrect", "option-correct");
		if(option.checked === question.options[i].correct) {
			option_container.classList.add("option-correct");
		} else {
			option_container.classList.add("option-incorrect");
			subcorrect = 0;
		}
	}
	return {subtotal: subtotal, subcorrect: subcorrect}
}

function fasterCheckbox() {
	if(answersChecked == true) {
		return;
	}
	if(elapsedTime != 0) {
		alert(`${elapsedTime} Sekunden sind vergangen.`);
	}
	if(elapsedTime >= kickTimeout) {
		alert(`Ganze ${elapsedTime} Sekunden hast du gebraucht. Ich bin von deiner Unfähigkeit nicht beeindruckt.`);
		document.location.href = "/";
	}
	if(document.getElementById("faster-checkbox").checked) {
		setTimeout(fasterCheckbox, timeout * 1000);
		elapsedTime += timeout;
	}
}

addEventListener("submit", (e) => {
	e.preventDefault();
	checkAnswers(current_page_quiz)
})

document.getElementById("faster-checkbox").addEventListener("click", fasterCheckbox);


