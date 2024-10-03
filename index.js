const fromText = document.querySelector(".form-text");
const toText = document.querySelector(".to-text");
const exchangeBtn = document.querySelector('.exchange');
const selectTags = document.querySelectorAll("select");
const tanslateBtn = document.querySelector("#tanslateBtn");
const icons = document.querySelectorAll('.icons');

selectTags.forEach((tag, id) => {
  for (const country_code in countries) {
    let selected;
    if (id == 0 && country_code == "en-GB") selected = "selected";
    else if (id == 1 && country_code == "hi-IN") selected = "selected";
    const option = `<option value="${countries[country_code]}" ${selected}>${countries[country_code]}</option>`;
    tag.innerHTML += option;
  }
});

tanslateBtn.addEventListener("click", async () => {
  let text = fromText.value;
  const translateFrom = selectTags[0].value.slice(0,2);
  const translateTo = selectTags[1].value.slice(0,2);
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=${translateFrom}&tl=${translateTo}&q=${text}`;

  const response = await fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const sentencesArray = await response.json();
  let sentences = "";

  for (const s of sentencesArray[0]) {
    sentences += s[0] ? s[0] : "";
  }
  toText.value = sentences;
});


exchangeBtn.addEventListener('click',()=>{
    console.log("exchange")
    let tempText = fromText.value;
    fromText.value = toText.value;
    toText.value = tempText;
    
    let tempSelect = selectTags[0].value;
    selectTags[0].value = selectTags[1].value;
    selectTags[1].value = tempSelect;
})

icons.forEach((icon,id)=>{
    icon.addEventListener('click',({target})=>{
        if(target.classList.contains('fa-copy')){
            if(id==0)
                copyText(fromText.value);
            else if(id==1)
                copyText(toText.value);
        }
        else{
            if(id == 0){
                speakSentence(fromText.value)
            }else if(id == 1){
                speakSentence(toText.value)
            }
        }
    })
})

const copyText = (text) =>{
    navigator.clipboard.writeText(text);
}

const speakSentence = (text) =>{
    const synths = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synths.speak(utterance);
}