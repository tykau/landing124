let word
let trial
let currentFocus = [0, 0]
let words = ["кибет", "табак", "кадак", "кабак",
            "кашык", "тарак", "сарай", "малай", 
            "хатын", "бишек", "бодай", "тишек", 
            "вакыт", "санак", "савыт", "дәрес", 
            "беләк", "челән", "сәлам", "терәк", 
            "сәнәк", "үрдәк", "фатир"]
let letters = 'йцукенгшщзхъфывапролджэёячсмитьбюЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЁЯЧСМИТЬБЮәүҗңһөӘҮҖҢҺӨ'
function f(arr) {
    return 'letter_' + arr[0] + '_' + arr[1]
}

function startGame() {
    // инициализация
    
    let randomIndex = Math.floor(Math.random() * words.length);
    word = words[randomIndex]
    console.log(word);
    trial = 0

    // показ контейнера с игрой
    document.getElementById('gameBoard').style.display = 'inline'
    currentFocus = [trial, 0]
    document.getElementById(f(currentFocus)).focus()
}

function passFocus() {
    if (event.keyCode == 8) {
        // alert("Удоли");
        document.getElementById(f(currentFocus)).value = ''
        currentFocus[1] = Math.max(currentFocus[1] - 1, 0);
        console.log('Возврат: ', currentFocus);
        document.getElementById(f(currentFocus)).focus()
    }

    if (event.keyCode == 13) {
        // alert("Удоли");
        if (currentFocus[1] == 4) {
            check()
        }
        else {
            alert('Вы не ввели полное слово')
        }
    }

    else {
        // значит, обычный ввод, а не удаление

        if (letters.includes(event.key)) {
            event.preventDefault()
            document.getElementById(f(currentFocus)).value = (event.key).toUpperCase()
            if (currentFocus[1] < 4) {
                currentFocus[1]++
                console.log('Смена фокуса: ', currentFocus);

                document.getElementById(f(currentFocus)).focus()
                document.getElementById(f(currentFocus)).value = ''
            }
        }
        else {
            event.preventDefault()
            document.getElementById(f(currentFocus)).value = ''

        }
    }
}


function check() {
    let color;
    let guess = ''
    for (let i = 0; i < 5;i++) {
        guess += document.getElementById(f([trial, i])).value

        console.log(guess);
    }
    guess = guess.toLowerCase()
    for (let index = 0;index < 5; index++) {
        // закрашивать ли вообще?
        if (word.includes(guess[index])) {
            // окей, она по крайней мере оранжевая, а зеленая ли?
            if (guess[index] == word[index]) {
                console.log('Буква ' + guess[index] + ' зелёная');
                color = 'green'
            }
            // не зеленая -- значит оранжевая
            else {
                console.log('Буква ' + guess[index] + ' оранжевая');
                color = 'orange'
            }
        }
        else {
            console.log('Такой буквы нет: ' + guess[index]);
            color = 'gray'
        }
        document.getElementById('letter_' + trial + '_' + index).value = (guess[index]).toUpperCase();
        document.getElementById('letter_' + trial + '_' + index).style.backgroundColor = color;
    }
    if (guess.toLowerCase() == word) {
        alert('You are winrar')

    }
    else {
        if (trial > 5) {
            alert('You are loser')
        }
        else {
            trial++
            currentFocus[0] = trial
            currentFocus[1] = 0
            document.getElementById(f(currentFocus)).focus()
        }
    }

}