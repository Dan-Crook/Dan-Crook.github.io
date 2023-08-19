        // Function to read data from a text file using XMLHttpRequest
        function readTextFile(file, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    callback(xhr.responseText);
                }
            };
            xhr.open('GET', file, true);
            xhr.send();
        }

        // Function to process the word list
        function processWordList(text) {
            // Check if the data has already been processed to avoid duplicate output
            if (!processWordList.dataProcessed) {
                // Split the text into an array of words using whitespace as the delimiter
                var words = text.split(/\s+/);
                var fiveLetterWords = words.filter(function(word) {
                    return word.length === 5;
                });
                // Now you can use the 'fiveLetterWords' array in your JavaScript code

                // Generate a random index within the range of the 'fiveLetterWords' array
                var randomIndex = Math.floor(Math.random() * fiveLetterWords.length);

                // Get the random word using the generated index
                var randomWord = fiveLetterWords[randomIndex];
                console.log(randomWord);

                // Mark the data as processed to avoid duplicate output
                processWordList.dataProcessed = true;
            }
        }

        function test() {
            readTextFile('/misc/wordList.txt', processWordList);
        }