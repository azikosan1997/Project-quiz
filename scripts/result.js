(function () {
    const Result = {
        move: null,
        answers: null,
        init() {

            const url = new URL(location.href);
            document.getElementById('result-score').innerText = url.searchParams.get('score') + '/' + url.searchParams.get('total');

            this.move = document.getElementById('see-results');
            this.move.onclick = this.moveToAnswers.bind(this);

        },
        moveToAnswers() {

            let testId = JSON.parse(sessionStorage.getItem('id'));

            location.href = 'answers.html?id=' + testId;


        }

    }


    Result.init();

})();