(function () {
    const Answers = {
        preTitle: null,
        sessionId: null,
        quizQuestion: null,
        docElement: null,
        init() {

            const url = new URL(location.href);
            const getTest = url.searchParams.get('id');

            if (getTest) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://testologia.site/get-quiz?id=' + getTest, false);
                xhr.send();
                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.quizQuestion = JSON.parse(xhr.responseText);
                    } catch (e) {
                        location.href = 'index.html'
                    }
                    console.log(this.quizQuestion)
                }
            } else {
                location.href = 'index.html'
            }

            this.showAnswers();
        },
        showAnswers() {
            document.getElementById('test-title-id').innerText = this.quizQuestion.name;


            this.quizQuestion.questions.forEach(item => {
                // //Answer Block Wrap
                // const optionElementAnswerBlockWrap = document.createElement('div');
                // optionElementAnswerBlockWrap.className = 'answer-block-wrap';
                //
                // //answer Block
                // const optionElementAnswerBlock = document.createElement('div');
                // optionElementAnswerBlock.className = 'answer-block';

                //wrap
                const optionElement = document.createElement('div');
                optionElement.className = 'question-wrap';

                //title
                const optionElementTitle = document.createElement('div');
                optionElementTitle.className = 'question-title';
                optionElementTitle.innerHTML = '<span>Вопрос ' + item.id + ':</span>' + item.question;

                //container
                const optionContainer = document.createElement('div');
                optionContainer.className = 'test-option-container'

                //test option
                const testOptionElement = document.createElement('div');
                testOptionElement.className = 'test-option';

                //Input
                const inputId = 'answer' + item.id
                const optionElementInput = document.createElement('input');
                optionElementInput.setAttribute('id', 'answer-' + inputId);
                optionElementInput.setAttribute('type', 'radio');
                optionElementInput.setAttribute('name', 'answer');
                optionElementInput.setAttribute('value', item.id);

                //label
                const labelElement = document.createElement('label');
                labelElement.innerText = item.answers;


                testOptionElement.appendChild(optionElementInput);
                testOptionElement.appendChild(labelElement);

                optionContainer.appendChild(testOptionElement);

                optionElement.appendChild(optionElementTitle);
                optionElement.appendChild(optionContainer);

                // optionElementAnswerBlock.appendChild(optionElement);
                // optionElementAnswerBlockWrap.appendChild(optionElementAnswerBlock);

                console.log(optionElement);
            });


        }


    }
    Answers.init();

})();