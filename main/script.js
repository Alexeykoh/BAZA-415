let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/'];
const special = ['+/-', '%'];


//screen
const out = document.querySelector('.screen .modal__screen');
const context = document.querySelector('.screen .context__screen');

function allClear () {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
    context.textContent = '_';
    console.log('all clear');
}
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
        console.log('text', a, sign, b)
    }
    if (a !== '' && b !== ''){
        b = b.substring(0, b.length-1)
        out.textContent = b;
        console.log('text', a, sign, b)
    }
    if (a === ''){
        a = 0
        allClear();
    }
    console.log('text', a, sign, b)
    context.textContent = a+" "+sign+" "+b;
}

document.querySelector('.ac').onclick = allClear;
document.querySelector('.modal__screen').onclick = remNumber;

document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('btn')) return;
    if (event.target.classList.contains('ac')) return;
    if (event.target.classList.contains('percent')) return;
    if (event.target.classList.contains('p-m')) return;

    out.textContent = '';
    const key = event.target.textContent;

    if (digit.includes(key)) {
        if ( b === '' && sign === ''){
            a += key;
            out.textContent = a;
            context.textContent = a+" "+sign+" "+b;
        }
        else if (a !== '' && b !== '' && finish){
            b = key;
            finish = false
            out.textContent = b;
        }
        else {
            b += key;
            out.textContent = b;
            context.textContent = a+" "+sign+" "+b;
        }
    }

    // if (special.includes(key)) {
    //     out.textContent = 0;
    //     }

    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        context.textContent = a+" "+sign+" "+b;
        return;
    }

    //calc
    if (key === '='){
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
            case 'X':
                result = (a) * (b)
                break;
        }
        switch (sign){
            case '/':
                if (b === 0 || b === '' || b === '0'){
                    console.log('govno')
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
        out.textContent = result;
        console.log( a, sign, b, ' - result: ', result)
        a = result;

        b = '';
        context.textContent = a+" "+sign;
    }
}