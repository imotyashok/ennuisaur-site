var timeoutRefs = [];
async function sleep(ms) {
    return new Promise(resolve => timeoutRefs.push(setTimeout(resolve, ms)));
}

let createQuestionMarks = false

function getRandomNumber(minSize, maxSize) {
    randomSize = (Math.random() * (maxSize - minSize) + minSize).toFixed(2);
    return(randomSize)
}

function isSmallScreen() {
    var media_value = window.matchMedia("(max-width: 1000px)")
    if (media_value.matches) {
      return true;
    } else {
      return false;
    }
  }

async function toggleQuestionMarks(is_hide){
    let questionMarkList = document.getElementById('question-mark-list');

    if (is_hide) {
        createQuestionMarks = false
        console.log("Cleaning up question marks..")
        console.log(questionMarkList)
        console.log(questionMarkList.length)
        await cleanupQuestionMarks(questionMarkList)
    } else {
        createQuestionMarks = true
        console.log("Generating question marks...");
        for(let i = 0; i < 30 && createQuestionMarks; i ++) {
            const newQuestionMark = document.createElement('h1')
            newQuestionMark.className = "question-mark"
            newQuestionMark.id = `question-mark-${i}`
            newQuestionMark.innerHTML = "?"
            newQuestionMark.style.zIndex = 1;
    
            var dX;
            var dY; 
            var fontSize; 
            if (isSmallScreen()) {
                dX = getRandomNumber(-35, 20)
                dY = getRandomNumber(35, 65)
                fontSize = getRandomNumber(1.0, 10.0)
            } else {
                dX = getRandomNumber(-10, 10)
                dY = getRandomNumber(10, 20)
                fontSize = getRandomNumber(1.0, 5.0)
            }
            newQuestionMark.style.left = dX + "vw";
            newQuestionMark.style.top = dY + "vw";
            newQuestionMark.style.fontSize = fontSize + "vw";
    
            questionMarkList.appendChild(newQuestionMark); 

            await new Promise(r => setTimeout(r, 200));
        }
    }
}

async function cleanupQuestionMarks(questionMarkList) {
    var children = questionMarkList.children;
    for(var i=0; i<children.length; i++){
        var child = children[i];
        child.className = "hidden";
        await new Promise(r => setTimeout(r, 1000 / children.length)); 
    }
    questionMarkList.innerHTML = ''
}

function toggleLightSwitch(){
    var ennuisaurLogo = document.getElementById("ennuisaur-logo"); 
    if (ennuisaurLogo.classList.contains("repeating-glow")){
        ennuisaurLogo.classList.remove("repeating-glow");
    } else {
        ennuisaurLogo.classList.add("repeating-glow");
    }
}

function toggleMainButtonsAnimationOn(label){
    // if (label.classList.contains('highlight-glow')){
    //     label.classList.remove('highlight-glow');
    // } else {
    //     label.classList.add('highlight-glow');
    // }

    // var buttonId = label.getAttribute('data-btnType');
    // var mainButton = document.getElementById(buttonId);
    // if (mainButton.classList.contains('pink-glitchy-glow')){
    //     mainButton.classList.remove('pink-glitchy-glow');
    // } else {
    //     mainButton.classList.add('pink-glitchy-glow');
    // }

    label.classList.add('highlight-glow');
    var buttonId = label.getAttribute('data-btnType');
    var mainButton = document.getElementById(buttonId);
    mainButton.classList.add('pink-glitchy-glow');
}

function toggleMainButtonsAnimationOff(label){
    label.classList.remove('highlight-glow');
    var buttonId = label.getAttribute('data-btnType');
    var mainButton = document.getElementById(buttonId);
    mainButton.classList.remove('pink-glitchy-glow');
}

/********** LISTENERS ************/ 
let snozzButton = document.getElementById('snozz');
snozzButton.addEventListener('mouseover', (e) => toggleQuestionMarks(false)); 
snozzButton.addEventListener('mouseout', (e) => toggleQuestionMarks(true)); 

let lightSwitch = document.getElementById('lightswitch');
lightSwitch.addEventListener('click', toggleLightSwitch);

let mainSectionLabels = document.getElementsByClassName('main-section-label');
console.log(mainSectionLabels);
for (var i=0; i <mainSectionLabels.length; i++){
    var label = mainSectionLabels[i];
    label.addEventListener('mouseover', (e) => toggleMainButtonsAnimationOn(e.target)); 
    label.addEventListener('mouseout', (e) => toggleMainButtonsAnimationOff(e.target)); 
}