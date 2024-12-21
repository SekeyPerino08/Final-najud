let currentJoke = null;
        function fetchJoke() {
            fetch("https://official-joke-api.appspot.com/random_joke", { method: "GET" })
                .then(response => response.json())
                .then(x => {
                    let joke = x.setup;
                    let answer = x.punchline;

                    document.getElementById("jokes").textContent = joke;
                    let jokeAnswer = document.getElementById('answer');
                    jokeAnswer.textContent = answer;

                    currentJoke = { joke, answer };

                    document.getElementById("answer").hidden = true;
                    document.getElementById("reaction").hidden = true;
                    document.getElementById("thanksMessage").hidden = true;
                })
                .catch(error => {
                    console.error("Error fetching joke:", error);
                });
        }

        function showAns() {
            let jokeAnswer = document.getElementById("answer");
            jokeAnswer.hidden = false;
            document.getElementById("reaction").hidden = false;
        }

        function resetJoke() {
            fetchJoke();
        }

        function addReaction(reaction) {
            let thanksMessage = document.getElementById("thanksMessage");
            thanksMessage.textContent = reaction === 'like' ? "We're glad you liked it!" : "We'll try to do better next time!";
            thanksMessage.hidden = false;

            setTimeout(() => {
                thanksMessage.hidden = true;
            }, 3000);
        }

        fetchJoke();

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
             navigator.serviceWorker.register('../sw.js').then( () => {
              console.log('Service Worker Registered')
             })
           })
          }
        
    