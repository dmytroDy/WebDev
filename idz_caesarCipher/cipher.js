const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const keyInput = document.getElementById('key');
const language = document.getElementById("lang-mode");
const modeBtn = document.getElementById('encryption-mode');
const start = document.getElementById('go');


const enAlphabetLow = ['a','b','c','d','e','f','g','h','i','j','k','l','m',
                       'n','o','p','q','r','s','t','u','v','w','x','y','z'];

const enAlphabetUp  = ['A','B','C','D','E','F','G','H','I','J','K','L','M',
                       'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

const uaAlphabetLow = ['а','б','в','г','ґ','д','е','є','ж','з','и','і','ї','й',
                       'к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч',
                       'ш','щ','ь','ю','я'];

const uaAlphabetUp = ['А','Б','В','Г','Ґ','Д','Е','Є','Ж','З','И','І','Ї','Й',
                      'К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч',
                      'Ш','Щ','Ь','Ю','Я'];


function encrypt(text, key, lang) {
    let alphabetUp = [];
    let alphabetLow = [];

    if (lang === "en") {
        alphabetUp = enAlphabetUp;
        alphabetLow = enAlphabetLow;
    }
    else if (lang === "ua") {
        alphabetUp = uaAlphabetUp;
        alphabetLow = uaAlphabetLow;
    }
    else 
        return;
    
    let result = [];
    for (let i = 0; i < text.length; ++i) {
        let shiftedCh = text[i];
        const alphLen = alphabetLow.length;
        if (alphabetLow.includes(text[i])) {
            let index = alphabetLow.indexOf(text[i]);
            shiftedCh = alphabetLow[(index + (key % alphLen) + alphLen) % alphLen];
        }
        else if (alphabetUp.includes(text[i])) {
            let index = alphabetUp.indexOf(text[i]);
            shiftedCh = alphabetUp[(index + (key % alphLen) + alphLen) % alphLen];
        }
        result.push(shiftedCh);
    }
    return result.join('');
}

start.onclick = () => {
    const text = inputText.value;
    let key = parseInt(keyInput.value);
    const lang = language.value;
    encryptMode = modeBtn.value;
    key = encryptMode === 'enc' ? key : -key;
    outputText.value = encrypt(text, key, lang);
};
