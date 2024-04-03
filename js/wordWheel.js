document.addEventListener('DOMContentLoaded', () => {
    const resultDiv = document.getElementById('result');
  
    // Fetch the file using a relative path
    fetch('/misc/wordList.txt')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch the file. Status: ' + response.status);
        }
        return response.text();
      })
      .then(content => {
        const words = extractWordsWithLength(content, 9);
        const pickedWord = pickWord(words);
        console.log('Picked word:', pickedWord);
      })
      .catch(error => {
        console.error('Error during fetch:', error.message);
      });
  
    function extractWordsWithLength(text, length) {
      const words = text.split(/\s+/);
      const filteredWords = words.filter(word => word.length === length);
      return filteredWords;
    }
  
    function pickWord(filteredWords) {
      // Check if the words array is not empty
      if (filteredWords.length === 0) {
        return 'No words available';
      }
  
      // Generate a random index
      const randomIndex = Math.floor(Math.random() * filteredWords.length);
  
      // Return the word at the random index
      return filteredWords[randomIndex];
    }
  });
  