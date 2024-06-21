document.addEventListener("DOMContentLoaded", function() {
    fetch('gemini_data_youpass_full_reading.json')
        .then(response => response.json())
        .then(data => {
            let wordInfo = parseJSON(data);
            wrapWordsWithSpan(wordInfo);
            addDoubleClickEvent(wordInfo);
        });

    // Function to parse JSON data
    function parseJSON(data) {
        let result = {};
        data.forEach(item => {
            const { ID, Word, Word_Class, Word_Display, Vietnamese_Meaning, IPA, Vietnamese_Explanation, Verb_Structure_Collocation, Example_1, Example_2 } = item;
            result[ID] = { Word, Word_Class, Word_Display, Vietnamese_Meaning, IPA, Vietnamese_Explanation, Verb_Structure_Collocation, Example_1, Example_2 };
        });
        return result;
    }

    // Function to wrap each word in a span with a unique ID
    function wrapWordsWithSpan(wordInfo) {
        let textElement = document.getElementById('text');
        let words = textElement.innerText.split(/(\s+)/);
        let idCounter = 0;

        let wrappedWords = words.map(word => {
            let cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
            let matchingID = Object.keys(wordInfo).find(id => wordInfo[id].Word.toLowerCase() === cleanWord.toLowerCase());
            
            if (matchingID) {
                let uniqueID = `${matchingID}-${idCounter++}`;
                return `<span id="word-${uniqueID}" class="word">${word}</span>`;
            } else {
                return word;
            }
        });

        textElement.innerHTML = wrappedWords.join('');
    }

    // Function to add double click event to each word in the paragraph
    function addDoubleClickEvent(wordInfo) {
        let popup = document.getElementById('popup');
        let closeBtn = document.getElementsByClassName('close')[0];
        let infoElement = document.getElementById('info');

        document.querySelectorAll('.word').forEach(span => {
            span.addEventListener('dblclick', (event) => {
                let selectedID = event.target.id.replace('word-', '').split('-')[0];
                if (selectedID && wordInfo[selectedID]) {
                    displayWordInfo(selectedID, wordInfo[selectedID]);
                    popup.style.display = "block";
                }
            });
        });

        closeBtn.onclick = function() {
            popup.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == popup) {
                popup.style.display = "none";
            }
        }

        function displayWordInfo(ID, info) {
            infoElement.innerHTML = `
                <p><strong>Word:</strong> ${info.Word}</p>
                <p><strong>Word Display:</strong> ${info.Word_Display}</p>
                <p><strong>Class:</strong> ${info.Word_Class}</p>
                <p><strong>IPA:</strong> ${info.IPA}</p>
                <p><strong>Vietnamese Meaning:</strong> ${info.Vietnamese_Meaning}</p>
                <p><strong>Vietnamese Explanation:</strong> ${info.Vietnamese_Explanation}</p>
                <p><strong>Verb Structure / Collocation:</strong> ${info.Verb_Structure_Collocation}</p>
                <p><strong>Example 1:</strong> ${info.Example_1}</p>
                <p><strong>Example 2:</strong> ${info.Example_2}</p>
            `;
        }
    }
});
