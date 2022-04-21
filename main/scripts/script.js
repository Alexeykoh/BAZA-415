let a = ''; // первое число
let b = ''; // второе число
let sign = ''; // параметр
let finish = false; // итог
let version = 'BAZA-415 v0.6' // версия

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']; //список цифр
const action = ['-', '+', 'x', '/']; // список параметров
const special = ['+/-', '%']; // специальные параметры


//screen. Dывод на экран
const out = document.querySelector('.screen .modal__screen');
const context = document.querySelector('.screen .context__screen');

// функция очистки
function allClear () {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
    context.textContent = version;
    console.log('all clear');
}

// функция удаления символов
function remNumber () {
    a = a.toString()
    b = b.toString()
    if (a === '' && b === ''){
        context.textContent = '_';
        return;
    }
    if (a !== '' && b === ''){
        a = a.substring(0, a.length-1)
        out.textContent = a;
        console.log(a+" "+sign+" "+b+" "+finish)
    }
    if (a !== '' && b !== ''){
        b = b.substring(0, b.length-1)
        out.textContent = b;
        console.log(a+" "+sign+" "+b+" "+finish)
    }
    if (a === ''){
        a = 0
        allClear();
    }
    console.log(a+" "+sign+" "+b+" "+finish)
    context.textContent = a+" "+sign+" "+b;
}

document.querySelector('.ac').onclick = allClear;
document.querySelector('.modal__screen').onclick = remNumber;


// стрелочная функция для кнопок
document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('btn')) return;
    if (event.target.classList.contains('ac')) return;

    out.textContent = '';
    const key = event.target.textContent;

    if (digit.includes(key)) {
        if (doubleZero(a, key)){
            return;
        }
        if (doubleZero(b, key)){
            return;
        }


        if ( b === '' && sign === ''){
            if (a.length <= 10 ){
                a += key;
            }
            out.textContent = a;
            context.textContent = a+" "+sign+" "+b;
            console.log(a+" "+sign+" "+b+" "+finish)
        }
        else
            if (a !== '' && b !== '' && finish){
            b += key;
            finish = false
            out.textContent = b;
            context.textContent = a+" "+sign+" "+b;
            console.log(a+" "+sign+" "+b+" "+finish)
        }
        else {
            if (b.length <= 10 ){
                b += key;
            }
            out.textContent = b;
            context.textContent = a+" "+sign+" "+b;
            console.log(a+" "+sign+" "+b+" "+finish)
        }
    }

    // Спец. параметры
    if (special.includes(key)) {
        if (key === "+/-"){
            if (a === '' || b === ''){
                out.textContent = 0;
            }
            if (a !== '' && b === ""){
                a = a * -1
                screenOut(a);
            }
            if (a !== '' && b !== ""){
                b = b * -1
                screenOut(b);
            }
        }

        if (key === '%'){
            if (a === '' || b === ''){
                out.textContent = 0;
            }
            if(a !== '' && b === ''){
                if(sign === ''){
                    a = a / 100
                    screenOut(a);
                }
            }

            if(a !== '' && b !== ''){
                if(sign === '+' || sign === '-'){
                    // out.textContent = '+ %';
                    b = (a / 100) * b;
                    screenOut(b);
                }

                if(sign === 'x' || sign === '/'){
                    b = b / 100;
                    screenOut(b);
                }
            }
        }
        if (a === '' || b === ''){
            context.textContent = key;
        } else {
        context.textContent = a+" "+sign+" "+b;
        }
    }

    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        context.textContent = a+" "+sign+" "+b;
        return;
    }

    //calc result
    if (key === '='){
        if (sign === ''){
            out.textContent = '=';
            return;
        }
        if (a === '' || b === ''){
            out.textContent = 0;
            return;
        }
        switch (sign){
            case '+':
                result = (+a) + (+b)
                break;
        }
        switch (sign){
            case '-':
                result = (+a) - (+b)
                break;
        }
        switch (sign){
            case 'x':
                result = (a) * (b)
                break;
        }
        switch (sign){
            case '/':
                if (b === 0 || b === '' || b === '0'){
                    console.log('govno', finish)
                    out.textContent = 0;
                    context.textContent = 0;
                    result = 0;
                    break;
                } else {
                    result = (a) / (b)
                    break;
                }
        }
        finish = true;
        screenOut(result);

        a = result;
        b = '';
        sign = '';

        context.textContent = a+" "+sign;
    }
}

// функция вывода на экран
function screenOut (scResult) {
    if (scResult.toString().length >= 10){
        out.textContent = (scResult.toString().substring(0, 10)+"...")
    } else{out.textContent = scResult}
}

// двойной ноль
function doubleZero (zero, key){
    if (zero === '0' && key === '0'){
        console.log('A - zero kek');
        out.textContent = zero;
        return true;
    }
}