let word = 'иксап'

function check(){
    let color;
   let  guess = document.getElementById('guess').value

   for (let index = 0; index < 5; index++) {
    // закрашивать ли вообще?
    if (word.includes(guess[index])){
        // окей, она по крайней мере оранжевая, а зеленая ли?
        if (guess[index] == word[index]) {
            console.log('Буква '+guess[index]+' зелёная');
            color = 'green'
        }
        // не зеленая -- значит оранжевая
        else{
            console.log('Буква '+guess[index]+' оранжевая');
            color = 'orange'
        }
    }
    else {
        console.log('Такой буквы нет: '+guess[index]);
        color = 'gray'
    }
    document.getElementById('letter_'+index).value = guess[index];
    document.getElementById('letter_'+index).style.backgroundColor = color;

    
   }



   if (guess == word) {
    alert('Ты угадал слово!')
   }
   else {
    alert('Попробуй еще раз!')
   }
}