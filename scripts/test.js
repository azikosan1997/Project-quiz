(function () {

    const Test = {
        questionTitleElement: null,
        optionsElement: null,
        nextButtonElement: null,
        prevButtonElement: null,
        quiz: null,
        currentQuestionIndex: 1,
        userResult: [],
        init() {
            checkUserData();
            const url = new URL(location.href);
            const testId = url.searchParams.get('id');

            if (testId) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://testologia.site/get-quiz?id=' + testId, false);
                xhr.send();
                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.quiz = JSON.parse(xhr.responseText);
                    } catch (e) {
                        location.href = 'index.html'
                    }
                    this.startQuiz();
                } else {
                    location.href = 'index.html'
                }

            } else {
                location.href = 'index.html';
            }

        },
        startQuiz() {
            console.log(this.quiz);
            this.questionTitleElement = document.getElementById('title');
            this.optionsElement = document.getElementById('options');

            this.nextButtonElement = document.getElementById('next');
            this.nextButtonElement.onclick = this.move.bind(this, 'next');

            this.passButtonElement = document.getElementById('pass');
            this.passButtonElement.onclick = this.move.bind(this, 'pass');

            this.prevButtonElement = document.getElementById('prev');
            this.prevButtonElement.onclick = this.move.bind(this, 'prev');


            this.showQuestion();

        },
        showQuestion() {
            const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
            this.questionTitleElement.innerHTML = '<span>Вопрос ' + this.currentQuestionIndex + ':</span> ' + activeQuestion.question;

            this.optionsElement.innerHTML = '';
            const that = this;

            const chosenOption = this.userResult.find(item => item.questionId === activeQuestion.id);
            activeQuestion.answers.forEach(answer => {
                const optionElement = document.createElement('div');
                optionElement.className = 'test-option';

                const inputId = 'answer' + answer.id;
                const inputElement = document.createElement('input');
                inputElement.className = 'option-answer';
                inputElement.setAttribute('id', inputId);
                inputElement.setAttribute('type', 'radio');
                inputElement.setAttribute('name', 'answer');
                inputElement.setAttribute('value', answer.id);
                if (chosenOption && chosenOption.chosenAnswerId === answer.id) {
                    inputElement.setAttribute('checked', 'checked')
                }


                inputElement.onchange = function () {
                    that.chooseAnswer();
                }

                const labelElement = document.createElement('label');
                labelElement.setAttribute('for', inputId);
                labelElement.innerText = answer.answer;

                optionElement.appendChild(inputElement);
                optionElement.appendChild(labelElement);

                this.optionsElement.appendChild(optionElement);

            });
            this.nextButtonElement.setAttribute('disabled', 'disabled');
            if (this.currentQuestionIndex === this.quiz.questions.length) {
                this.nextButtonElement.innerText = 'Завершить'
            } else {
                this.nextButtonElement.innerText = 'Далее'

            }

            if (this.currentQuestionIndex > 1) {
                this.prevButtonElement.removeAttribute('disabled');
            } else {
                this.prevButtonElement.setAttribute('disabled', 'disabled');

            }

        },
        chooseAnswer() {
            this.nextButtonElement.removeAttribute('disabled');
        },
        move(action) {
            const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
            const chosenAnswer = Array.from(document.getElementsByClassName('option-answer')).find(element => {
                return element.checked;
            });

            let chosenAnswerId = null;
            if (chosenAnswer && chosenAnswer.value) {
                chosenAnswerId = Number(chosenAnswer.value);
            }

            const existingResult = this.userResult.find(item => {
                return item.questionId === activeQuestion.id
            });

            if (existingResult) {
                existingResult.chosenAnswerId = chosenAnswerId
            } else {
                this.userResult.push({
                    questionId: activeQuestion.id,
                    chosenAnswerId: chosenAnswerId
                });
            }


            console.log(this.userResult);

            if (action === 'next' || action === 'pass') {
                this.currentQuestionIndex++;
            } else {
                this.currentQuestionIndex--;
            }
            this.showQuestion();
        }
    }
    Test.init();

})();