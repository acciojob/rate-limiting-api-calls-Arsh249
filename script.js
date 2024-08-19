//your JS code here. If required.
 let clickCount = 0;
        let requestQueue = [];
        let lastCallTime = 0;
        const MAX_CALLS_PER_SECOND = 5;
        const MAX_CALLS_IN_WINDOW = 5;
        const WINDOW_DURATION_MS = 1000;

        const fetchData = () => {
            clickCount++;
            document.getElementById('click-count').innerText = clickCount;

            const now = Date.now();
            if (now - lastCallTime > WINDOW_DURATION_MS) {
                lastCallTime = now;
                requestQueue = [];
            }

            if (requestQueue.length < MAX_CALLS_IN_WINDOW) {
                requestQueue.push(new Promise(resolve => {
                    setTimeout(() => {
                        resolve(fetch('https://jsonplaceholder.typicode.com/todos/1')
                            .then(response => response.json())
                            .then(data => displayData(data))
                        );
                    }, WINDOW_DURATION_MS - (Date.now() - lastCallTime));
                }));
            } else {
                setTimeout(fetchData, 10000); // Retry after 10 seconds
            }
        };

        const displayData = (data) => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML += `<div>ID: ${data.id}, Title: ${data.title}, Completed: ${data.completed}</div>`;
        };

        document.getElementById('fetch-button').addEventListener('click', () => {
            fetchData();
        });

        setInterval(() => {
            clickCount = 0;
            document.getElementById('click-count').innerText = clickCount;
        }, 10000);