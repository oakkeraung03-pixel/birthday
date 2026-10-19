const $ = (q, root=document) => root.querySelector(q);
const $$ = (q, root=document) => [...root.querySelectorAll(q)];
const scenes = $$(".scene");
function go(id){scenes.forEach(s=>s.classList.toggle("active",s.id===id));window.scrollTo({top:0,behavior:"smooth"});if(id==="letter"&&musicOn)switchMusic("piano");}
$$("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));

let musicOn=false;
const cuteMusic=$("#cuteMusic"), pianoMusic=$("#pianoMusic"), musicBtn=$("#musicBtn");
async function switchMusic(kind){const active=kind==="piano"?pianoMusic:cuteMusic;const other=kind==="piano"?cuteMusic:pianoMusic;other.pause();if(!musicOn)return;try{active.volume=.52;await active.play();}catch(e){musicBtn.textContent="♫ Tap for music";}}
musicBtn.addEventListener("click",async()=>{musicOn=!musicOn;musicBtn.setAttribute("aria-pressed",String(musicOn));musicBtn.textContent=musicOn?"♫ Music On":"♫ Music Off";if(!musicOn){cuteMusic.pause();pianoMusic.pause();}else{await switchMusic($("#letter").classList.contains("active")?"piano":"cute");}});

// Gift box event
const giftBox=$("#giftBox"), giftMsg=$("#giftMsg"), giftReveal=$("#giftReveal"), openGift=$("#openGift");
function openTheGift(){giftBox.classList.add("open");giftMsg.textContent="Surprise! မင်းအတွက် ချစ်ခြင်းမေတ္တာလေးတစ်ခု 💗";giftReveal.classList.remove("hidden");openGift.classList.add("hidden");burstHearts(18);}
openGift.addEventListener("click",openTheGift);
giftBox.addEventListener("click",openTheGift);
giftBox.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openTheGift();}});

// 5 reasons cards
$$(".reason").forEach(card=>card.addEventListener("click",()=>{ $$(".reason").forEach(c=>c.classList.remove("revealed"));card.classList.add("revealed");$("#reasonText").textContent=card.dataset.reason;burstHearts(3);}));

// Cake event with strict button order
let cakeStep=0;const cake=$("#cakeArt"), cakeStatus=$("#cakeStatus");
const light=$("#lightCandles"), wish=$("#makeWish"), blow=$("#blowCandles"), cakeNext=$("#cakeNext");
light.addEventListener("click",()=>{if(cakeStep!==0)return;cake.classList.add("lit");cake.classList.remove("blown");cakeStatus.textContent="ဖယောင်းတိုင်လေးတွေ လင်းသွားပြီ ✨ ဆုတောင်းလေးတစ်ခု တောင်းနော်။";cakeStep=1;light.disabled=true;wish.disabled=false;wish.focus();});
wish.addEventListener("click",()=>{if(cakeStep!==1)return;cakeStatus.textContent="မျက်လုံးလေးမှိတ်ပြီး မင်းရဲ့ဆုတောင်းကို စိတ်ထဲမှာ တိတ်တိတ်လေးတောင်းလိုက်နော် 🤍";cakeStep=2;wish.disabled=true;blow.disabled=false;blow.focus();});
blow.addEventListener("click",()=>{if(cakeStep!==2)return;cake.classList.remove("lit");cake.classList.add("blown");cakeStatus.textContent="Wish made! မင်းရဲ့ဆုတောင်းလေးတွေ ပြည့်ဝလာပါစေ။ Happy Birthday! 🎉";cakeStep=3;blow.disabled=true;cakeNext.classList.remove("hidden");burstHearts(25);});
cakeNext.addEventListener("click",()=>go("wishes"));

// Photo memory lightbox
$$(".polaroid").forEach(card=>card.addEventListener("click",()=>{const img=$("img",card);if(!img||!img.getAttribute("src")||!img.complete||img.naturalWidth===0)return;$("#largePhoto").src=img.src;$("#photoCaption").textContent=$(".caption",card)?.textContent||"little memory ♡";$("#lightbox").classList.remove("hidden");}));
function closePhoto(){$("#lightbox").classList.add("hidden");$("#largePhoto").src="";}
$("#closePhoto").addEventListener("click",closePhoto);$("#lightbox").addEventListener("click",e=>{if(e.target.id==="lightbox")closePhoto();});document.addEventListener("keydown",e=>{if(e.key==="Escape")closePhoto();});

// Small quiz: answers are intentionally playful, not scored as facts about her

 // မြန်မာဘာသာ Quiz
 const quizData = [
    {
      q: "ကိုယ်က မင်းရဲ့ ဘယ်အရာလေးကို အချစ်ဆုံးလဲ။",
      options: [
        "မင်းရဲ့ အပြုံးလေး",
        "မင်းရဲ့ စိတ်ထားကောင်းလေး",
        "မင်းရဲ့ ရယ်မောသံလေး",
        "အဲ့ဒီအရာလေးတွေအားလုံး ♡"
      ],
      answer: 3,
      feedback: "ဟုတ်တယ်လေ။ မင်းရဲ့အရာလေးတွေအားလုံးကို ကိုယ်တန်ဖိုးထားတယ်။ ♡"
    },
    {
      q: "ဒီမွေးနေ့မှာ မင်းအတွက် ကိုယ်ဘာဆုတောင်းပေးချင်လဲ။",
      options: [
        "မင်း ပိုပျော်ရွှင်လာဖို့",
        "မင်းရဲ့အိပ်မက်တွေ ပြည့်ဝလာဖို့",
        "စိတ်ချမ်းသာတဲ့ နေ့ရက်လေးတွေ ပိုင်ဆိုင်ဖို့",
        "အဲ့ဒီဆုတောင်းလေးတွေအားလုံး 🌷"
      ],
      answer: 3,
      feedback: "မင်းအတွက် အကောင်းဆုံးအရာလေးတွေအားလုံး ဖြစ်လာပါစေလို့ ကိုယ်ဆုတောင်းပေးတယ်။ 💗"
    },
    {
      q: "ကိုယ်တို့ရဲ့ နောက်လာမယ့်အခန်းသစ်လေးက ဘယ်လိုမျိုး ဖြစ်စေချင်လဲ။",
      options: [
        "အလျင်မလိုဘဲ ရိုးသားကြမယ်",
        "တစ်ယောက်ကိုတစ်ယောက် နားလည်လေးစားကြမယ်",
        "ပျော်ရွှင်စရာ အမှတ်တရလေးတွေ ဖန်တီးကြမယ်",
        "အဲ့ဒီအရာလေးတွေအားလုံး 🤍"
      ],
      answer: 3,
      feedback: "အလျင်မလိုဘဲ တစ်ယောက်ကိုတစ်ယောက် နားလည်ပေးရင်း အမှတ်တရကောင်းလေးတွေ အတူဖန်တီးချင်တယ်။ 🤍"
    }
  ];
  
  let quizIndex = 0;
  let quizAnswered = false;
  
  function renderQuiz() {
    const d = quizData[quizIndex];
  
    $("#quizCount").textContent =
      `မေးခွန်း ${["၁", "၂", "၃"][quizIndex]} / ${["၁", "၂", "၃"].length}`;
  
    $("#quizQuestion").textContent = d.q;
    $("#quizOptions").innerHTML = "";
  
    d.options.forEach((option, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = option;
      b.addEventListener("click", () => answerQuiz(i));
      $("#quizOptions").appendChild(b);
    });
  
    $("#quizFeedback").textContent =
      "အဖြေလေးတစ်ခု ရွေးပေးနော်။ 🥰";
  
    $("#quizNext").classList.add("hidden");
  
    $("#quizNext").textContent =
      quizIndex === quizData.length - 1
        ? "ကိုယ်တို့ရဲ့ အမှတ်တရဇာတ်လမ်းလေး →"
        : "နောက်မေးခွန်းတစ်ခု →";
  
    quizAnswered = false;
  }
  
  function answerQuiz(i) {
    if (quizAnswered) return;
  
    quizAnswered = true;
  
    const d = quizData[quizIndex];
  
    $$("button", $("#quizOptions")).forEach((b, n) => {
      b.disabled = true;
  
      if (n === i) {
        b.classList.add("selected");
      }
    });
  
    $("#quizFeedback").textContent = d.feedback;
    $("#quizNext").classList.remove("hidden");
  }
  
  $("#quizNext").addEventListener("click", () => {
    if (!quizAnswered) return;
  
    if (quizIndex < quizData.length - 1) {
      quizIndex++;
      renderQuiz();
    } else {
      go("story");
    }
  });
  
  renderQuiz();
  
// Deep romantic letter: typing effect and switch to piano for ending
const letterText=`အသေးလေးရေ… ❤️

Happy Birthday ပါကွယ်။

တစ်ခါတလေ ကိုယ့်ရင်ထဲမှာရှိတဲ့ ခံစားချက်တွေကို စကားလုံးတွေနဲ့ ပြောပြဖို့ တကယ်ခက်တယ်။ မင်းအကြောင်းဆို ပိုဆိုးတာပေါ့။ ပြောချင်တာတွေ အများကြီးရှိပေမဲ့ ဘယ်ကစပြောရမှန်းတောင် မသိဘူး။

ကိုယ့်ဘဝထဲကို မင်းရောက်လာခဲ့တဲ့အချိန်ကစပြီး အမှတ်တရတွေ အများကြီးရှိခဲ့တယ်နော်။ အတူရယ်မောခဲ့ကြတာတွေ၊ စိတ်ကောက်ခဲ့ကြတာတွေ၊ မင်းရဲ့အပြုံးလေးတွေ၊ ကိုယ့်ကို မျက်စောင်းလှလှလေးထိုးတတ်တဲ့ မင်းရဲ့ပုံစံတွေ… အဲဒါတွေအားလုံးက ကိုယ်ပြန်တွေးမိတိုင်း ပြုံးမိနေတတ်တဲ့ အမှတ်တရလေးတွေပါပဲ။

အချိန်တွေကြာလာတော့ ကိုယ်တို့လည်း အရင်ကလို ကလေးတွေ မဟုတ်ကြတော့ဘူး။ ဘဝအကြောင်း ပိုနားလည်လာတယ်။ အရင်က ကိုယ်မကောင်းခဲ့တဲ့အရာတွေကိုလည်း ပြန်မြင်တတ်လာတယ်။

ဒါပေမဲ့ မပြောင်းလဲသေးတာတစ်ခုရှိတယ်။

အရင်က မင်းအပြုံးလေးကို မြင်ရရင် ပျော်နေတတ်တဲ့ ကောင်လေးက အခုထိ မင်းပျော်နေတာကို မြင်ချင်နေတုန်းပဲ။

မင်းကို အခုချက်ချင်း ဘာဆုံးဖြတ်ချက်မှ ချစေချင်တာ မဟုတ်ပါဘူး။ ကိုယ်တို့ရဲ့အနာဂတ်ကိုလည်း အလျင်လိုပြီး အဖြေရှာမနေချင်ဘူး။ မင်းရဲ့ခံစားချက်တွေကို နားလည်ပေးရင်း အရင်ကထက် ပိုရင့်ကျက်တဲ့လူတစ်ယောက်အဖြစ် မင်းကို ပိုကောင်းကောင်း ချစ်တတ်ချင်သေးတယ်။

မင်းပျော်တဲ့နေ့တွေမှာ မင်းနဲ့အတူ ရယ်မောချင်တယ်။ မင်းပင်ပန်းတဲ့နေ့တွေမှာ မင်းပြောချင်တာတွေကို နားထောင်ပေးချင်တယ်။ မင်းရဲ့အိပ်မက်တွေကို အားပေးချင်တယ်။ မင်းကိုယ်မင်း ယုံကြည်မှုနည်းနေတဲ့နေ့တွေမှာလည်း မင်းဟာ ဘယ်လောက်တန်ဖိုးရှိတဲ့သူလဲဆိုတာ သတိပေးပေးချင်တယ်။

ဒါပေမဲ့ ဒီနေ့အတွက်တော့ ကိုယ်အလိုချင်ဆုံးအရာက ရိုးရိုးလေးပါပဲ။

မင်းပျော်နေဖို့။

မင်းရဲ့မွေးနေ့လေးမှာ စိတ်ညစ်စရာတွေထက် ရယ်မောစရာတွေ ပိုများပါစေ။ မင်းလိုချင်တဲ့ အိပ်မက်လေးတွေ တစ်ခုပြီးတစ်ခု ပြည့်ဝလာပါစေ။ မင်းကိုချစ်တဲ့သူတွေရဲ့ မေတ္တာတွေကြားမှာ စိတ်အေးချမ်းစွာ နေနိုင်ပါစေ။

ပြီးတော့ မင်းရဲ့အပြုံးလေးကို ဘဝရဲ့အခက်အခဲတွေက မခိုးယူသွားနိုင်ပါစေနဲ့။

အသေးလေးရေ…

ဒီနေ့ မင်းမွေးဖွားလာခဲ့တာကို ကိုယ်တကယ်ဝမ်းသာတယ်။ ဘာလို့လဲဆိုတော့ တစ်ချိန်က အချစ်ဆိုတာ ဘာမှန်းမသိသေးတဲ့ ကောင်လေးတစ်ယောက်ဟာ မင်းကြောင့်ပဲ လူတစ်ယောက်ကို ဒီလောက်ထိ ချစ်တတ်ခဲ့တာမို့လို့ပါ။

တစ်နေ့နေ့မှာ မင်းလည်း ဆန္ဒရှိလာမယ်ဆိုရင် ကိုယ်တို့ရဲ့ဇာတ်လမ်းလေးကို အတိတ်ကအမှားတွေကနေ သင်ယူပြီး နောက်တစ်မျက်နှာ ပြန်ရေးကြည့်ချင်သေးတယ်။

အဲဒီနေ့ ဘယ်တော့ရောက်လာမလဲဆိုတာ ကိုယ်မသိပါဘူး။ ဒါပေမဲ့ ဒီနေ့မှာတော့ ကိုယ့်အချစ်ဦးလေးကို ပျော်ရွှင်စရာမွေးနေ့လေး ဖြစ်စေချင်ရုံပါပဲ။

Happy Birthday, my first love. ❤️

ကိုယ်ချစ်ခဲ့ရတဲ့ အသေးလေးကို အခုလည်း ချစ်နေတုန်းပါပဲ။

မင်းရဲ့အပြုံးလေးတွေရော၊ မျက်စောင်းလေးတွေရော၊ မင်းဖြစ်နေတာလေးကိုပါ ချစ်တယ်ကွာ။

မွေးနေ့မှာ အများကြီးပြုံးပါ။ ကိုယ်သိပ်ချစ်ရတဲ့ အပြုံးလေးမို့လို့။ `;
let letterOpened=false;
$("#openLetter").addEventListener("click",()=>{if(letterOpened)return;letterOpened=true;$("#letterStage").classList.add("open");$("#openLetter").classList.add("hidden");const target=$("#letterText");target.textContent="";const chars=[...letterText];let i=0;function type(){target.textContent+=chars[i++]||"";if(i<chars.length){setTimeout(type,chars[i-1]==="\n"?90:13);}else{$("#ending").classList.remove("hidden");burstHearts(32);if(musicOn)switchMusic("piano");}}setTimeout(type,450);});

$("#replay").addEventListener("click",()=>{cakeStep=0;cake.classList.remove("lit","blown");cakeStatus.textContent="မင်းအတွက် ကိတ်မုန့်လေး ပြင်ထားတယ် 💗";light.disabled=false;wish.disabled=true;blow.disabled=true;cakeNext.classList.add("hidden");giftBox.classList.remove("open");giftMsg.textContent="သေတ္တာလေးကို နှိပ်ပြီးဖွင့်ကြည့်ပါ ♡";giftReveal.classList.add("hidden");openGift.classList.remove("hidden");$$(".reason").forEach(c=>c.classList.remove("revealed"));$("#reasonText").textContent="နှလုံးလေးတစ်ခုကို ရွေးလိုက်ပါ…";quizIndex=0;renderQuiz();letterOpened=false;$("#letterStage").classList.remove("open");$("#letterText").textContent="";$("#ending").classList.add("hidden");$("#openLetter").classList.remove("hidden");go("home");});

function burstHearts(count=8){const layer=$("#floatLayer");for(let i=0;i<count;i++){const h=document.createElement("span");h.className="float-heart";h.textContent=Math.random()>.5?"♥":"♡";h.style.left=Math.random()*100+"%";h.style.fontSize=(12+Math.random()*22)+"px";h.style.animationDuration=(2.4+Math.random()*2.5)+"s";layer.appendChild(h);setTimeout(()=>h.remove(),5200);}}
setInterval(()=>{if(Math.random()>.6)burstHearts(1);},1900);
