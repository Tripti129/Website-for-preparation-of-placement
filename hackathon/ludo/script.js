const video = document.getElementById('video');
const questionBox = document.getElementById('question');
const startBtn = document.getElementById('startBtn');
const resultBox = document.getElementById('result');

const QUESTIONS = [
  "Tell me about yourself.",
  "Why do you want to work with our company?",
  "Describe one of your technical projects."
];

let current = 0;
let recognition;
let responses = [];

async function initCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({video:true});
  video.srcObject = stream;
  await video.play();
}

async function loadModels(){
  await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
  await faceapi.nets.faceExpressionNet.loadFromUri('/models');
}

async function detectExpression(){
  const result = await faceapi.detectSingleFace(video,new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
  if(result){
    const expr = Object.entries(result.expressions).sort((a,b)=>b[1]-a[1])[0];
    return expr[0]; // most probable expression label
  }
  return "unknown";
}

function askQuestion(){
  if(current >= QUESTIONS.length){
    finishInterview();
    return;
  }
  const q = QUESTIONS[current];
  questionBox.textContent = q;

  // speak the question
  speechSynthesis.speak(new SpeechSynthesisUtterance(q));

  // start speech recognition
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();
  recognition.onresult = async (e)=>{
    const text = e.results[0][0].transcript;
    const expr = await detectExpression();
    responses.push({question:q, answer:text, expression:expr});
    current++;
    askQuestion();
  };
}

function finishInterview(){
  questionBox.textContent = "Interview Finished!";
  video.srcObject.getTracks().forEach(t=>t.stop());
  // simple rule-based feedback
  let summary = "<h3>Feedback</h3><ul>";
  responses.forEach((r,i)=>{
    summary += `<li><b>Q${i+1}:</b> ${r.question}<br>
    <em>Your Expression:</em> ${r.expression}<br>
    <em>Your Answer:</em> ${r.answer}</li>`;
  });
  summary += `</ul><p>Suggestions:<br>
  😊 Maintain steady confidence.<br>
  👀 Keep eyes near the camera for better eye contact.<br>
  🧍‍♀️ Avoid too many head or neck movements.<br>
  🎤 Speak clearly, avoid fillers like 'uh'.</p>";
  resultBox.innerHTML = summary;`
}

startBtn.onclick = async ()=>{
  startBtn.disabled = true;
  await initCamera();
  await loadModels();
  askQuestion();
};
