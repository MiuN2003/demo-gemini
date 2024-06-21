
// Load the JSON file and parse its content
fetch('gemini_merged_sentences.json')
    .then(response => response.json())
    .then(data => {
        let wordInfo = parseJSON(data);
        addDoubleClickEvent(wordInfo);
    });

// Function to parse JSON data
function parseJSON(data) {
    let result = {};
    data.forEach(item => {
        const { ID, Word, Word_Class,Word_Display, Vietnamese_Meaning, IPA,Vietnamese_Explanation, Verb_Structure_Collocation, Example_1, Example_2 } = item;
        result[Word] = { Word_Class,Word_Display, Vietnamese_Meaning, IPA,Vietnamese_Explanation, Verb_Structure_Collocation, Example_1, Example_2};
    });
    return result;
}


// Function to add double click event to each word in the paragraph
function addDoubleClickEvent(wordInfo) {
    let textElement = document.getElementById('text');
    let popup = document.getElementById('popup');
    let closeBtn = document.getElementsByClassName('close')[0];
    let infoElement = document.getElementById('info');

    textElement.addEventListener('dblclick', (event) => {
        let selectedWord = getSelectedWord(event);
        if (selectedWord && wordInfo[selectedWord]) {
            displayWordInfo(selectedWord, wordInfo[selectedWord]);
            popup.style.display = "block";
        }
    });

    closeBtn.onclick = function() {
        popup.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }

    function getSelectedWord(event) {
        let selection = window.getSelection();
        return selection.toString().trim();
    }

    function displayWordInfo(Word, info) {
    
        infoElement.innerHTML = `
            <p><strong>Word:</strong> ${Word}</p>
            <p><strong>Word Display:</strong> ${info.Word_Display}</p>
            <p><strong>Class:</strong> ${info.Word_Class}</p>
            <p><strong>IPA:</strong> ${info.IPA}</p>
            <p><strong>Vietnamese Meaning:</strong>${info.Vietnamese_Meaning}</p>
            <p><strong>Vietnamese Explanation:</strong>${info.Vietnamese_Explanation}</p>
            <p><strong>Verb Structure / Collocation:</strong> ${info.Verb_Structure_Collocation}</p>
            <p><strong>Example 1:</strong> ${info.Example_1}</p>
            <p><strong>Example 2:</strong> ${info.Example_2}</p>

        `;
    }
    
}
