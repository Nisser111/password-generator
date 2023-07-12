
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

