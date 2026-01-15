// Remove loading after 3s
setTimeout(()=>{ 
  document.getElementById("loadingScreen").style.display="none"; 
}, 3000);

// Webcam Enable
const video = document.getElementById("video");
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
.then(stream => { video.srcObject = stream; });

// Timer
let timer = document.getElementById("timer");
let seconds = 0; 
function startTimer(){
  setInterval(()=>{
    seconds++;
    let m = String(Math.floor(seconds/60)).padStart(2,'0');
    let s = String(seconds%60).padStart(2,'0');
    timer.textContent = `${m}:${s}`;
  },1000);
}

// Interview Questions
const questions = [
  "Tell me about yourself.",
  "Why should we hire you?",
  "What is OOPS in simple words?",
  "Explain a project you built recently.",
  "Where do you see yourself in 5 years?"
];
let q = 0;

document.getElementById("startBtn").onclick = () =>{
  document.getElementById("question").textContent = questions[q++];
  startTimer();

  setInterval(()=>{
    if(q < questions.length){
      document.getElementById("question").textContent = questions[q++];
    }
  },15000);
};
