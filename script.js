class Password {
    constructor() {
        this._upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this._lowerLetters = "abcdefghijklmnopqrstuvwxyz";
        this._numbers = "0123456789";
        this._symbols = "!@#$%^&*?";
        this._easyToSayIgnoreChars = "1liIoO05Ss4AQ";

        const _charsTypes = document.querySelectorAll(".chars-type input");
        const _len = document.querySelector("#pass-length__input-range");
        const _passTypes = document.getElementsByName("pass-types");
        let _ignoreValues;


        _passTypes.forEach( el => {
            if(el.checked && el.value === "easy-to-read")
                _ignoreValues = this._easyToSayIgnoreChars.split("");
        });


        this.properties = {
            upperLetters: (_charsTypes[0].checked) ? true : false,
            lowerLetters: (_charsTypes[1].checked) ? true : false,
            numbers: (_charsTypes[2].checked) ? true : false,
            symbols: (_charsTypes[3].checked) ? true : false,
            passLength: _len.value,
            ignore: _ignoreValues ? _ignoreValues : false,
        }
    }

    generate() {
        let password = "";
        const {upperLetters, lowerLetters, numbers, symbols, passLength, ignore} = this.properties;
        let chars = "";

        if(upperLetters) chars += this._upperLetters;
        if(lowerLetters) chars += this._lowerLetters;
        if(numbers) chars += this._numbers;
        if(symbols) chars += this._symbols;
        chars = chars.split("");

        if(ignore) {
            for(let ignoredElement of ignore) {
                chars.forEach( char => {
                    let index = chars.findIndex( el => el === ignoredElement);
                    if(index !== -1)
                        delete chars[index];
                });
            }

            chars = chars.filter( char => char !== undefined)
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
        }

        for(let i = 0; i < passLength; i++) {
            let currentRandom = getRandomInt(0, chars.length);
            password += chars[currentRandom];
        }

        return password;
    }
}

// synchronize input range with number
const lengthRangeBar = document.querySelector('section.pass-length input[type="range"]');
const lengthInput = document.querySelector('section.pass-length input[type="number"]')
lengthRangeBar.addEventListener("input", () => {
    lengthInput.value = lengthRangeBar.value;
});
lengthInput.addEventListener("input", () => {
    lengthRangeBar.value = lengthInput.value;
});

// validation password length
lengthInput.addEventListener("blur", () => {
    if(lengthInput.value > 50) {
        lengthInput.value = 50;
        lengthRangeBar.value = 50;
    } else if(lengthInput.value < 1) {
        lengthInput.value = 1;
        lengthRangeBar.value = 1;
    }
});

// configuration types of password
const charsTypesCheckboxes = document.querySelectorAll('article.preferences .setting-wrapper input[type="checkbox"]');
const passTypesRadios = document.getElementsByName("pass-types");

passTypesRadios[0].addEventListener("change", () => {
    if(charsTypesCheckboxes[0].checked === false)
        charsTypesCheckboxes[0].checked = true;
    
    if(charsTypesCheckboxes[1].checked === false)
        charsTypesCheckboxes[1].checked = true;

    if(!charsTypesCheckboxes[2].hasAttribute("disabled")) {
        charsTypesCheckboxes[2].checked = false;
        charsTypesCheckboxes[2].setAttribute("disabled", "disabled");
    } else {
        charsTypesCheckboxes[2].checked = false;
        charsTypesCheckboxes[2].disabled = true;
    }

    if(!charsTypesCheckboxes[3].hasAttribute("disabled")) {
        charsTypesCheckboxes[3].checked = false;
        charsTypesCheckboxes[3].setAttribute("disabled", "disabled");
    } else {
        charsTypesCheckboxes[3].checked = false;
        charsTypesCheckboxes[3].disabled = true;
    }
});

passTypesRadios[1].addEventListener("change", () => {
    if(charsTypesCheckboxes[0].checked === false)
        charsTypesCheckboxes[0].checked = true;
    
    if(charsTypesCheckboxes[1].checked === false)
        charsTypesCheckboxes[1].checked = true;

    
    if(charsTypesCheckboxes[2].checked === false)
        charsTypesCheckboxes[2].checked = true;
    if(charsTypesCheckboxes[2].disabled === true)
        charsTypesCheckboxes[2].disabled = false;
    
    if(charsTypesCheckboxes[3].checked === true)
        charsTypesCheckboxes[3].checked = false;
    if(charsTypesCheckboxes[3].disabled === false)
        charsTypesCheckboxes[3].disabled = true;
});

passTypesRadios[2].addEventListener("change", () => {
    charsTypesCheckboxes.forEach( el => {
        if(el.checked === false)
            el.checked = true;
        
        if(el.hasAttribute("disabled"))
            el.disabled = false;
    });
});

// copy password
const copyBtn = document.querySelector("#copy");
copyBtn.addEventListener("click", () => {
    const copyInput = document.querySelector("#generatedPassField");
    navigator.clipboard.writeText(copyInput.value)
});

window.onload = function() {
    const regeneradeBtn = document.querySelector("#regenerate");
    const passLength = document.querySelectorAll(".pass-length input");
    const preferences = document.querySelectorAll(".setting-wrapper input");

    function showPass() {
        let currentPass = new Password();
        const passwordDisplay = document.querySelector("#generatedPassField");
        passwordDisplay.value = currentPass.generate();
    }

    showPass();

    regeneradeBtn.addEventListener("click", showPass);
    passLength.forEach( el => el.addEventListener("input", showPass));
    preferences.forEach( el => el.addEventListener("change", showPass));

    
}

