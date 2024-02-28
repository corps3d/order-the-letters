$(document).ready(function() {

    var current, original; 
    const words = [
        "and", "the", "for", "but", "not", "get", "say", "all", "day", 
        "can", "top", "dog", "cat", "man", "bat", "run", "own", "see", "use", "big"
    ];

    function randomCharacterAssignment() {
        
        var randomWord = words[Math.floor(Math.random() * words.length)];
        
        var characters = randomWord.split('');
        
        var shuffledCharacters = shuffle(characters);
    
        $('.options .option').each(function(index) {
            $(this).text(shuffledCharacters[index]);
        });
    }
    
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
    
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        return array;
    }
    
    
    randomCharacterAssignment();
    
    
    $('.option').draggable({
        helper: "clone", 
        start: function(event, ui) {
            original = $(this).attr('id'); 
            $(`#${original}`).hide();
            current = $(this).closest('.blank-box');
        },
        stop: function(event, ui) {
            $(`#${original}`).show();
        }
    });
    

    
    $('.blank-box').droppable({
        accept: ".option",
        drop: function(event, ui) {
            var draggableElement = ui.draggable;
            var clonedElement = draggableElement.clone();          
            var existingOption = $(this).children('.option');
            if (existingOption.length > 0) {
                
                var existingOptionClone = existingOption.clone();
                current.empty().append(existingOptionClone);
            }

            
            $(this).empty().append(clonedElement);
            draggableElement.remove();

            
            $('.option').draggable({
                helper: "clone", 
                start: function(event, ui) {
                    original = $(this).attr('id'); 
                    $(`#${original}`).hide();
                    current = $(this).closest('.blank-box');
                },
                stop: function(event, ui) {
                    $(`#${original}`).show();
                }
            });
            
        }
    });

   
    $('#submit').on('click', function() {
        var allAnswered = true;
        var result = '';
    
        $('.answer-boxes .blank-box').each(function() {
            var optionText = $(this).children('.option').text().trim();
            if (optionText === '') {
                allAnswered = false;
                return false;
            }
            result += optionText;
        });
    
        if (allAnswered) {
            console.log("All questions answered. Result: " + result);
            if (words.includes(result)) {
                $('#result').text('Correct answer').css('color', '#08AFEE');
                
                var $options = $('.options .blank-box');
                var $answerBoxes = $('.answer-boxes .option');
        
                setTimeout(function() {

                    $('.options .option').text(''); // Reset text
                    $options.each(function(index) {
                        // Append the corresponding .option div from .answer-boxes
                        $(this).empty().append($answerBoxes.eq(index));
                    });
                    randomCharacterAssignment(); // Call randomCharacterAssignment
                    $('#result').text(''); // Clear result message

                }, 1000);
            } else {
                $('#result').text('Incorrect answer, try again').css('color', 'red');
            }
        } else {
            $('#result').text('Please arrange the letters before submitting').css('color', 'red');
        }
        
    });
    
    
    
});
