let word
let typed
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

function typeLetter(ch){
        typed = typed + ch
        event.preventDefault()
        document.getElementById(f(currentFocus)).value = ch
        if (currentFocus[1] < 4) {
            currentFocus[1]++
            console.log('Смена фокуса: ', currentFocus);

            document.getElementById(f(currentFocus)).focus()
            document.getElementById(f(currentFocus)).value = ''
        }

}

function startGame() {
    // инициализация
    
    let randomIndex = Math.floor(Math.random() * words.length);
    word = words[randomIndex]
    console.log(word);
    trial = 0
    typed = ''

    // показ контейнера с игрой
    document.getElementById('gameBoard').style.display = 'inline'
    currentFocus = [trial, 0]
    document.getElementById(f(currentFocus)).focus()
}

function passFocus() {
    if (event.keyCode == 8) {
        // alert("Удоли");
        document.getElementById(f(currentFocus)).value = ''
        typed = typed.slice(0, typed.length-1)
        console.log(typed);
        currentFocus[1] = Math.max(currentFocus[1] - 1, 0);
        // console.log('Возврат: ', currentFocus);
        document.getElementById(f(currentFocus)).focus()
    }

    if (event.keyCode == 13) {

        if (typed.length == 5) {
            check()
        }
        else {
            alert('Вы не ввели полное слово')
        }
    }

    else {
        // значит, обычный ввод, а не удаление
    
        if (letters.includes(event.key)) {
            if (typed.length < 5) {
                event.preventDefault()
                document.getElementById(f(currentFocus)).value = (event.key).toUpperCase()
                typed = typed + (event.key)
                console.log(typed);
                if (currentFocus[1] < 4) {
                    currentFocus[1]++
                    document.getElementById(f(currentFocus)).focus()
                    document.getElementById(f(currentFocus)).value = ''
                }
            }

        }
        else {
            event.preventDefault()
            document.getElementById(f(currentFocus)).value = ''

        }
    }
}


function check() {
    typed = ''
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
                color = 'CadetBlue'
            }
            // не зеленая -- значит оранжевая
            else {
                console.log('Буква ' + guess[index] + ' оранжевая');
                color = 'Coral'
            }
        }
        else {
            console.log('Такой буквы нет: ' + guess[index]);
            color = 'Beige'
        }
        document.getElementById('letter_' + trial + '_' + index).value = (guess[index]).toUpperCase();
        document.getElementById('letter_' + trial + '_' + index).style.backgroundColor = color;

        // document.getElementById('btn_'+ guess[index].toLowerCase()).style.backgroundClip = color;
        document.getElementById('btn_'+ guess[index].toLowerCase()).style.backgroundColor = color;
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

function pressCheck(){
    if (typed.length == 5){
        check()
    }
}

function erase(){

        // alert("Удоли");
        document.getElementById(f(currentFocus)).value = ''
        typed = typed.slice(0, typed.length-1)
        console.log(typed);
        currentFocus[1] = Math.max(currentFocus[1] - 1, 0);
        // console.log('Возврат: ', currentFocus);
        document.getElementById(f(currentFocus)).focus()
}