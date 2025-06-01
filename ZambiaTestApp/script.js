// Save original body HTML to restore later
let originalBodyHTML = document.body.innerHTML;
const pageHistory = [];
let currentTOCType = 'eyes'; // <-- add this global
let searchContainer; 

// Onboarding
function completeOnboarding() {
  const username = document.getElementById('username').value;
  const job = document.getElementById('jobSelect').value;
  const language = document.getElementById('splashLanguageDropdown').value;

  console.log({ username, job, language });

  if (!username || !job || !language || language === "What's your preferred language?") {
    alert("Please complete all fields.");
    return;
  }

  alert("Welcome! You're now registered to Arclight Eye and Ear Care App!");
  showPage('selectModule');
}


// Navigation
function goToDashboard() {
  showPage('dashboard');
}

function goToEarsDashboard() {
  showPage('earsDashboard');
}

function showEarsLearningModules() {
  showPage('earsLearningModules');
}


function showLearningModules() {
  showPage('learningModules');
}


function showCoreClinicalOphthalmicExamination() {
  showPage('coreClinicalOphthalmicExamination');
}

function showDiseases() {
  showPage('diseasesPage');
}



function goToAtomsCard(type = 'eyes') {
  showPage('atomsCardPage');
  openTOC();

  const atomsImageContainer = document.getElementById('atomsImageContainer');
  if (atomsImageContainer) atomsImageContainer.innerHTML = '';

  showTOC(type);        // 👈 showTOC('eyes') or showTOC('ears')
}



function openTOC() {
  const dropdown = document.getElementById('tocDropdown');
  dropdown.classList.remove('hidden');
  dropdown.classList.remove('slide-up');
  dropdown.classList.add('active');

  const closeTOCBtn = document.getElementById('closeTOCBtn');
  const tocToggleBtn = document.getElementById('tocToggleBtn');
  closeTOCBtn.style.display = 'block';
  closeTOCBtn.style.opacity = '1';
  tocToggleBtn.style.display = 'none';  // Hide ☰
}

function closeTOC() {
  const dropdown = document.getElementById('tocDropdown');
  dropdown.classList.add('slide-up');
  dropdown.classList.remove('active');

  const closeTOCBtn = document.getElementById('closeTOCBtn');
  const tocToggleBtn = document.getElementById('tocToggleBtn');

  setTimeout(() => {
    dropdown.classList.add('hidden');
    dropdown.classList.remove('slide-up');
  }, 300);

  closeTOCBtn.style.transition = 'opacity 0.3s ease';
  closeTOCBtn.style.opacity = '0';
  setTimeout(() => {
    closeTOCBtn.style.display = 'none';
    tocToggleBtn.style.display = 'block';  // Show ☰ after close completes
  }, 300);
}





// Set up navigation and module clicks after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.scroll-item').forEach(item => {
    if (item.textContent.includes('Core Clinical Ophthalmic Examination')) {
      item.addEventListener('click', showCoreClinicalOphthalmicExamination);
    }
  });

  const rapdVideoCard = document.getElementById('rapdVideoCard');
if (rapdVideoCard) {
  rapdVideoCard.addEventListener('click', () => showPage('rapdTestVideoPage'));
}


  const card = document.getElementById('ophthalmoscopyCard');
  if (card) {
    card.addEventListener('click', () => showPage('directOphthalmoscopy'));
  }

  attachEventListeners();

  // Add event listeners for TOC toggle, back, close buttons
  const tocTabButtons = document.querySelectorAll('.toc-tab button');
  const tocToggleBtn = document.getElementById('tocToggleBtn');
if (tocToggleBtn) {
  tocToggleBtn.addEventListener('click', () => {
  openTOC();
  
  
});



 tocTabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tocTabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

}


  const closeTOCBtn = document.getElementById('closeTOCBtn');
  if (closeTOCBtn) {
   closeTOCBtn.addEventListener('click', () => {
  closeTOC();
});

  }





  const backToEyesBtn = document.getElementById('backToEyesBtn');
  if (backToEyesBtn) {
    backToEyesBtn.addEventListener('click', () => {
      showPage('dashboard');
      const dropdown = document.getElementById('tocDropdown');
      if (dropdown) dropdown.classList.remove('active');
    });
  }

  // Home button listener
  const homeBtn = document.getElementById('homeBtn');
  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      showPage('dashboard');
    });
  }
});

// Back button listener
const backBtnGlobal = document.getElementById('backBtnGlobal');
if (backBtnGlobal) {
  backBtnGlobal.addEventListener('click', () => {
  const prevPage = pageHistory.pop();
  if (prevPage) {
    showPage(prevPage, true);   // ← pass true so no re-push
  } else {
    alert("No previous page found.");
  }
});

}

// Eyes / Ears tab click handlers
const eyesBtn = document.getElementById('eyesTab');
const earsBtn = document.getElementById('earsTab');

if (eyesBtn && earsBtn) {
  eyesBtn.addEventListener('click', () => {
    showTOC('eyes');
    eyesBtn.classList.add('active');
    earsBtn.classList.remove('active');
  });

  earsBtn.addEventListener('click', () => {
    showTOC('ears');
    earsBtn.classList.add('active');
    eyesBtn.classList.remove('active');
  });
}



function showPage(pageId, skipHistory = false) {
  const currentActive = document.querySelector('.page.active');
  if (currentActive && currentActive.id !== pageId && !skipHistory) {
  pageHistory.push(currentActive.id);
}

// Pause all videos on page switch (global solution)
document.querySelectorAll('video').forEach(video => {
  if (!video.paused) {
    video.pause();
  }
});

const pupilCards = document.querySelectorAll('#pupilsPage .module-card');
pupilCards.forEach(card => {
  const title = card.querySelector('h3').textContent.trim();

  card.addEventListener('click', () => {
   switch (title) {
  case 'Pupil Full Examination':
    showPage('pupilFullExamPage');
    break;
  case 'Primary Eye Care Examination':
    showPage('pupilExamPECPage');
    break;
  case 'RAPD Test':
    showPage('rapdPage');
    break;
  case 'Pupil Montage':
    showPage('pupilMontagePage');
    break;
  case 'Pupil Pathways Explained':
    showPage('pupilPathwaysPage');
    break;
}

  });
});

const childhoodCards = document.querySelectorAll('#childhoodEyeScreeningPage .module-card');
childhoodCards.forEach(card => {
  const title = card.querySelector('h3').textContent.trim();

  card.addEventListener('click', () => {
    switch (title) {
      case 'How to Use the Arclight':
        showPage('howToArclightPage');
        break;
      case 'Assessment of Eyes and Vision':
        showPage('assessmentVisionPage');
        break;
      case 'Normal and Abnormal Findings':
        showPage('normalAbnormalPage');
        break;
    }
  });
});




  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  const page = document.getElementById(pageId);
  if (page) page.classList.add('active');

    // Re-bind switch after page change (so DOM element exists)
   // Update switch state & color after page changes
  // --- DASHBOARD TOGGLE LOGIC ---------------------------------
const eyesSwitch  = document.getElementById('eyesToEarsSwitch');
const earsSwitch  = document.getElementById('earsToEyesSwitch');

// Eyes dashboard
if (pageId === 'dashboard' && eyesSwitch) {
  eyesSwitch.checked = false;                      // knob left
  eyesSwitch.nextElementSibling.style.backgroundColor = 'blue';
  eyesSwitch.onchange = () => showPage('earsDashboard');
}

// Ears dashboard
if (pageId === 'earsDashboard' && earsSwitch) {
  earsSwitch.checked = true;                       // knob right
  earsSwitch.nextElementSibling.style.backgroundColor = 'green';
  earsSwitch.onchange = () => showPage('dashboard');
}



  

  const homeBtnContainer = document.getElementById('homeButtonContainer');
  searchContainer = document.getElementById('fixedSearchContainer');
  if (searchContainer) {
    searchContainer.style.display = ['dashboard', 'earsDashboard'].includes(pageId) ? 'block' : 'none';

  }

  const showHomePages = [
  'dashboard',
  'earsDashboard', 
  'learningModules',
  'coreClinicalOphthalmicExamination',
  'diseasesPage',
  'childhoodEyeScreeningPage',
  'howToUseArclightVideoPage',
  'directOphthalmoscopy',
  'atomsCardPage',
  'anteriorSegmentQuizPage',
  'frontOfEyePage',
  'anteriorSegmentVideoPage',
  'pupilsPage',
  'rapdTestPage',
  'pupilExamPage',
  'pupilExamPECPage',
  'pupilMontagePage',
  'pupilPathwaysPage',
  'howToArclightPage',
  'assessmentVisionPage',
  'normalAbnormalPage',
  'earsLearningModules',
  'coreClinicalOphthalmicExamination',
  'otoscopyPage',
  'earHealthPage',
  'howToExamineEarPage',
  'earConditionsPage',
  'earFlowchartPage',
  'pupilFullExamPage',
  'rapdPage',
  'rapdTestVideoPage',



];





  homeBtnContainer.style.display = showHomePages.includes(pageId) ? 'flex' : 'none';

  const backBtnContainer = document.getElementById('backButtonContainer');
  if (backBtnContainer) {
    backBtnContainer.style.display = showHomePages.includes(pageId) ? 'flex' : 'none';
  }

}

const homeBtnContainer = document.getElementById('homeButtonContainer');
homeBtnContainer.style.display = 'flex'; 






// Toolbar setup
function attachEventListeners() {
  const backBtn = document.getElementById('backBtn');
  if (backBtn) backBtn.onclick = () => showPage('learningModules');

  const timestampBtn = document.getElementById('timestampBtn');
  if (timestampBtn) timestampBtn.onclick = showTimestamps;

  const noteBtn = document.getElementById('noteBtn');
  if (noteBtn) noteBtn.onclick = showNote;

  const folderBtn = document.getElementById('folderBtn');
  if (folderBtn) folderBtn.onclick = showFiles;

  const infoBtn = document.getElementById('infoBtn');
  if (infoBtn) infoBtn.onclick = showDefaultInfo;

  const quizBtn = document.getElementById('quizBtn');
  if (quizBtn) quizBtn.onclick = launchQuiz;
}

// YouTube API
let video = null;
let lastPauseTime = null;

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('customVideo');
  const contentBox = document.getElementById('contentBox'); // Ensure this exists

  if (!video || !contentBox) return;

  video.addEventListener('timeupdate', () => {
    const time = Math.floor(video.currentTime);

    if (time === 22 && lastPauseTime !== 'eye-info') {
      lastPauseTime = 'eye-info';
      video.pause();
      contentBox.innerHTML = `
        <h4>Eye Anatomy</h4>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Eye_anatomy_diagram.svg/1200px-Eye_anatomy_diagram.svg.png"
        style="width: 100%; border-radius: 5px; margin-top: 10px;" />
        <ul><li>Periorbita</li><li>Eyelids</li><li>Eyes</li></ul>
      `;
    }

    if (time === 23 && lastPauseTime !== 23) {
      lastPauseTime = 23;
      video.pause();
      contentBox.innerHTML = '<h4>Pause Only</h4><p>Just pausing here briefly...</p>';
      setTimeout(() => video.play(), 5000);
    }

    if (time === 32 && lastPauseTime !== 32) {
      lastPauseTime = 32;
      video.pause();
      contentBox.innerHTML = `
        <h4>Arclight Device Overview</h4>
        <img src="images/arclight_device.png" style="width: 100%; border-radius: 5px;" />
      `;
      setTimeout(() => video.play(), 5000);
    }
  });
});


// Toolbar content
const contentBox = document.getElementById('contentBox');

function showTimestamps() {
  setActive('timestampBtn');
  contentBox.innerHTML = `
    <h4>Time stamp</h4>
    <p><a href="#" onclick="seekTo(0)">0:00 General Inspection</a></p>
    <p><a href="#" onclick="seekTo(28)">0:28 Arclight Setup</a></p>
    <p><a href="#" onclick="seekTo(47)">0:47 Fundal Reflex</a></p>
    <p><a href="#" onclick="seekTo(67)">1:07 Optic Nerve</a></p>
    <p><a href="#" onclick="seekTo(102)">1:42 Retinal Vessels</a></p>
  `;
}

function showNote() {
  setActive('noteBtn');
  contentBox.innerHTML = '<textarea placeholder="Type your notes here..."></textarea>';
}

function showFiles() {
  setActive('folderBtn');
  contentBox.innerHTML = `
    <h4>Attached Files</h4>
    <p><a class="link" href="#">Arclight_Device_Practice.pdf</a></p>
    <p><a class="link" href="#">Fundal_Reflex.pdf</a></p>
    <p><a class="link" href="#">Ophthalmoscopy_Exercise.docx</a></p>
  `;
}

function showDefaultInfo() {
  setActive('infoBtn');
  contentBox.innerHTML = `
    <h4>Additional Information</h4>
    <p>This video shows how to prepare and use the Arclight ophthalmoscope.</p>
  `;
}

function showEyeAnatomy() {
  contentBox.innerHTML = `
    <h4>Eye Anatomy</h4>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Eye_anatomy_diagram.svg/1200px-Eye_anatomy_diagram.svg.png"
    style="width: 100%; border-radius: 5px; margin-top: 10px;" />
    <ul><li>Periorbita</li><li>Eyelids</li><li>Eyes</li></ul>
  `;
}

function showDeviceImage() {
  contentBox.innerHTML = `
    <h4>Arclight Device Overview</h4>
    <img src="images/arclight_device.png" style="width: 100%; border-radius: 5px;" />
  `;
}

function setActive(id) {
  document.querySelectorAll('.toolbar button, .header button').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(id);
  if (activeBtn) activeBtn.classList.add('active');
}

function seekTo(sec) {
  const video = document.getElementById('customVideo');
  if (video) {
    video.currentTime = sec;
    video.play();
    lastPauseTime = null; // reset pause tracking
  }
}

function setActiveTab(type) {
  const eyesBtn = document.getElementById('eyesTab');
  const earsBtn = document.getElementById('earsTab');
  if (!eyesBtn || !earsBtn) return;

  eyesBtn.classList.toggle('active', type === 'eyes');
  earsBtn.classList.toggle('active', type === 'ears');
}



// Launch Quiz
function launchQuiz() {
  const previousPage = document.querySelector('.page.active')?.id || 'dashboard';

  const quizPage = document.createElement('div');
  quizPage.id = 'directOphthalmoscopyQuizPage';
  quizPage.className = 'page active';

  const quizPageHTML = `
    <div class="quiz-container">
      <div class="quiz-header small">
        <div class="quiz-header-row centered">
          <button id="backToVideoBtn" class="back-icon" title="Go back">←</button>
          <h2>Quiz</h2>
        </div>
      </div>
      <div class="quiz-scroll" id="quizScroll">
        <form id="quizForm"></form>
      </div>
      <div class="quiz-footer">
        <button type="submit" form="quizForm" class="start-btn">See Results</button>
      </div>
      <div id="quizModal" class="quiz-modal hidden">
        <div class="quiz-modal-content">
          <p id="quizScoreText"></p>
          <button id="seeWhyBtn">See why?</button>
        </div>
      </div>
    </div>
  `;

  quizPage.innerHTML = quizPageHTML;
  document.getElementById('appRoot').appendChild(quizPage);

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  quizPage.classList.add('active');
  document.getElementById('homeButtonContainer').style.display = 'none';

  const questions = [
    {
      q: "1. When starting direct ophthalmoscopy, what is the ideal distance between the examiner and the patient?",
      options: ["5 cm", "10 cm", "15 cm", "Arm’s length"],
      answer: 3
    },
    {
      q: "2. Which of the options describe the best condition to get the view of the retina?",
      options: ["Outdoors with bright sunlight, dilated pupil", "Deem room with dilated pupil", "Indoors with bright light, dilated pupil", "Deem room with constricted pupil"],
      answer: 1
    },
    {
      q: "3. Which eye should you use to examine the patient’s right eye?",
      options: ["Left eye", "Either eye", "Right eye", "Dominant eye"],
      answer: 2
    },
    {
      q: "4. During ophthalmoscopy, which part of the back of the eye should you identify first?",
      options: ["Macula", "Optic disc", "Retinal periphery", "Fovea"],
      answer: 1
    },
    {
      q: "5. What is the name given to pale optic disc?",
      options: ["Normal finding", "Cataract", "Optic atrophy", "Raised intraocular pressure"],
      answer: 2
    },
    {
      q: "6. Which lighting condition is recommended for performing ophthalmoscopy with the Arclight?",
      options: ["Bright daylight", "Dim or darkened room", "Bright room", "Ambient light"],
      answer: 1
    },
    {
      q: "7. What does a cup-to-disc ratio (CDR) of 0.7 or greater typically suggest on fundus examination?",
      options: ["Glaucoma", "Macular degeneration", "Diabetic retinopathy", "Retinal detachment"],
      answer: 0
    }
  ];

  const quizForm = document.getElementById('quizForm');
  questions.forEach((q, i) => {
    let block = `<div class="quiz-block"><p>${q.q}</p>`;
    q.options.forEach((opt, j) => {
      block += `
        <label class="radio-label">
          <input type="radio" name="q${i}" value="${j}" />
          <span>${opt}</span>
        </label>`;
    });
    block += `<p class="answer" style="display:none; margin-top:5px; font-style:italic;">Correct answer: ${q.options[q.answer]}</p>`;
    block += `</div>`;
    quizForm.innerHTML += block;
  });

  quizForm.onsubmit = (e) => {
    e.preventDefault();
    let correct = 0;

    questions.forEach((q, i) => {
      const radios = document.querySelectorAll(`input[name="q${i}"]`);
      const answer = q.answer;
      let selected = null;

      radios.forEach(r => {
        r.disabled = true;
        if (r.checked) selected = parseInt(r.value);
      });

      const labels = radios[0].closest('.quiz-block').querySelectorAll('label');
      labels.forEach((label, index) => {
        if (index === answer) {
          label.classList.add('correct');
        } else if (parseInt(label.querySelector('input').value) === selected) {
          label.classList.add('wrong');
        }
      });

      if (selected === answer) correct++;
    });

    document.getElementById('quizScoreText').innerText = `You got ${correct} out of ${questions.length} correct.`;
    document.getElementById('quizModal').classList.remove('hidden');
  };

  document.addEventListener('click', (e) => {
    if (e.target.id === 'seeWhyBtn') {
      document.getElementById('quizModal').classList.add('hidden');
      document.querySelectorAll('.answer').forEach(a => a.style.display = 'block');
    }
    if (e.target.id === 'backToVideoBtn') {
      document.getElementById('appRoot').removeChild(quizPage);
      showPage(previousPage);
      document.getElementById('homeButtonContainer').style.display = 'flex';
    }
  });
}

// TOC Overlay Logic for Atoms Card Page
function showTOC(type = 'eyes') {
  currentTOCType = type;                // track which module we’re on
  setActiveTab(type); // <- handle colour highlighting here
  
  const tocList = document.getElementById('tocList');
  tocList.innerHTML = '';               // clear previous items

  // possible topics for each module
  const eyes = [
    'Anatomy','Arclight','Case Study','Child','Front of Eye',
    'Fundal Reflex','Fundus','Glaucoma','How to Check for Eyeglasses',
    'How to Use','Lens','Pupil','Red Eye','Summary','Vision Loss'
  ];
  const ears = [
    'Anatomy','Childhood Hearing Development','Ear Drum','External Ear: Pinna'
  ];

  // decide which list to show, sort alphabetically, then build <li>’s
  (type === 'eyes' ? eyes : ears).sort().forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    tocList.appendChild(li);
  });

  // reset any image that was showing
  const imgBox = document.getElementById('atomsImageContainer');
  if (imgBox) imgBox.innerHTML = '';

  setupTOCImageSwitch();   // hook up click → image logic
  setupSlideSwitch();      // hook up scroll / swipe logic
}




// Map TOC items to images (single images)
const imageMap = {
  'Eyes: Anatomy': 'Anatomy1.png',  // will handle multi-image switching later
  'Ears: Anatomy': 'EarAnatomy.png',
  'Arclight': 'Arclight.png',
  'Case Study': 'CaseStudy.png',
  'Child': 'Child.png',
  'Front of Eye': 'FrontOfEye.png',
  'Fundal Reflex': 'FundalReflex.png',
  'Fundus': 'Fundus.png',
  'Glaucoma': 'Glaucoma.png',
  'How to Check for Eyeglasses': 'Refract.png',
  'How to Use': 'HowToUse.png',
  'Lens': 'Lens.png',
  'Pupil': 'Pupil.png',
  'Red Eye': 'RedEye.png',
  'Summary': 'Summary.png',
  'Vision Loss': 'Summary.png',
  'Ear Drum': 'Drum.png',
  'External Ear: Pinna': 'Ear.png',
  'Childhood Hearing Development': 'EarChild.png',
};



// Attach click handlers to TOC items for image switching
function setupTOCImageSwitch() {
  const tocList = document.getElementById('tocList');
  const atomsImageContainer = document.getElementById('atomsImageContainer');
  if (!atomsImageContainer) return;

  // We'll track currentKey and currentIndex for multi-image items
  let currentKey = '';
  let currentIndex = 0;

  // Multi-image items map
  const multiImageMap = {
    'Anatomy': ['Anatomy1.png', 'Anatomy2.png'],
    'Case Study': ['CaseStudy1.png', 'CaseStudy2.png']
  };

  document.getElementById('tocList').addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    const topic = e.target.textContent.trim();
    const container = document.getElementById('atomsImageContainer');

    container.innerHTML = ''; // Clear previous content

    // Special case: Anatomy
    if (topic === 'Anatomy' || topic === 'Eyes: Anatomy' || topic === 'Ears: Anatomy') {

    if (topic === 'Anatomy') {
  if (currentTOCType === 'ears') {
    const img = document.createElement('img');
    img.src = 'images/EarAnatomy.png';
    img.alt = 'Ear Anatomy';
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.objectFit = 'contain';
    img.style.borderRadius = '12px';
    container.appendChild(img);
  } else {
    const images = ['Anatomy1.png', 'Anatomy2.png'];
    images.forEach(imageFile => {
        const img = document.createElement('img');
        img.src = `images/${imageFile}`;
        img.alt = 'Eye Anatomy';
        img.style.maxWidth = '100%';
        img.style.marginBottom = '10px';
        img.style.objectFit = 'contain';
        img.style.borderRadius = '12px';
        container.appendChild(img);
    });
  }
}


}


    
    // Default case: Show one image
    else {
      const img = document.createElement('img');
      const filenameMap = {
      "Anatomy": "Anatomy1.png",
      "Arclight": "Arclight.png",
      "Case Study": "CaseStudy.png",
      "Child": "Child.png",
      "Front of Eye": "FrontOfEye.png",
      "Fundal Reflex": "FundalReflex.png",
      "Fundus": "Fundus.png",
      "Glaucoma": "Glaucoma.png",
      "How to Check for Eyeglasses": "Refract.png",
      "How to Use": "HowToUse.png",
      "Lens": "Lens.png",
      "Pupil": "Pupil.png",
      "Red Eye": "RedEye.png",
      "Summary": "Summary.png",
      "Vision Loss": "Summary.png",
      "Ear Drum": "Drum.png",
      "External Ear: Pinna": "Ear.png",
      "Childhood Hearing Development": "EarChild.png",
    };

const filename = filenameMap[topic] || `${topic.replace(/\s/g, '')}.png`;
img.src = `images/${filename}`;


      // Rotate specific images
    if (['CaseStudy', 'FundalReflex'].includes(topic.replace(/\s/g, ''))) {
      img.style.transform = 'rotate(90deg)';
    }


      img.alt = topic;
      img.style.maxWidth = '100%';
      img.style.maxHeight = '100%';
      img.style.objectFit = 'contain';
      img.style.borderRadius = '12px';
      container.appendChild(img);

    }

    document.getElementById('tocDropdown').classList.remove('active');
  }
});


  // Helper function to update image
  function updateImage(imgName, altText) {
    const existingImg = atomsImageContainer.querySelector('img');
    if (existingImg) {
      existingImg.src = `images/${imgName}`;
      existingImg.alt = altText;
    } else {
      const img = document.createElement('img');
      img.src = `images/${imgName}`;
      img.alt = altText;
      img.style.maxWidth = '100vh';
      img.style.maxHeight = '100vw';
      img.style.transform = 'rotate(90deg)';
      img.style.borderRadius = '12px';
      img.style.objectFit = 'contain';
      atomsImageContainer.innerHTML = '';
      atomsImageContainer.appendChild(img);
    }
  }

  // Expose currentKey and currentIndex for slide switching
  setupSlideSwitch(currentKey, currentIndex, multiImageMap, updateImage);
}

// Slide / scroll switching function
function setupSlideSwitch(currentKeyInit, currentIndexInit, multiImageMap, updateImage) {
  const atomsImageContainer = document.getElementById('atomsImageContainer');
  if (!atomsImageContainer) return;

  // State variables stored in closure
  let currentKey = currentKeyInit || '';
  let currentIndex = currentIndexInit || 0;

  // Listen to wheel event for scroll on desktop
  atomsImageContainer.addEventListener('wheel', (e) => {
    if (!multiImageMap[currentKey]) return;

    e.preventDefault();

    if (e.deltaY > 0) {
      currentIndex = (currentIndex + 1) % multiImageMap[currentKey].length;
    } else {
      currentIndex = (currentIndex - 1 + multiImageMap[currentKey].length) % multiImageMap[currentKey].length;
    }

    updateImage(multiImageMap[currentKey][currentIndex], currentKey);
  }, { passive: false });

  // Touch swipe detection for mobile
  let touchStartY = null;

  atomsImageContainer.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].clientY;
  });

  atomsImageContainer.addEventListener('touchend', (e) => {
    if (touchStartY === null) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diffY = touchStartY - touchEndY;

    if (Math.abs(diffY) > 30) { // threshold
      if (!multiImageMap[currentKey]) return;

      if (diffY > 0) {
        currentIndex = (currentIndex + 1) % multiImageMap[currentKey].length;
      } else {
        currentIndex = (currentIndex - 1 + multiImageMap[currentKey].length) % multiImageMap[currentKey].length;
      }

      updateImage(multiImageMap[currentKey][currentIndex], currentKey);
    }

    touchStartY = null;
  });
}

(function(){
  // Scoped selector helper inside quiz container
  const container = document.getElementById('anteriorSegmentQuizModule');
  if (!container) return;

  // Elements inside quiz module
  const caseTitle = container.querySelector("#caseTitle");
  const caseSubtitle = container.querySelector("#caseSubtitle");
  const caseImage = container.querySelector("#caseImage");
  const quizForm = container.querySelector("#quizForm");
  const prevQuestionBtn = container.querySelector("#prevQuestionBtn");
  const nextQuestionBtn = container.querySelector("#nextQuestionBtn");
  const nextCaseBtn = container.querySelector("#nextCaseBtn");
  const scoreCard = container.querySelector("#scoreCard");
  const quizCard = container.querySelector("#quizCard");
  const scoreText = container.querySelector("#scoreText");
  const restartBtn = container.querySelector("#restartBtn");
  const reviewBtn = container.querySelector("#reviewBtn");
  const reviewCard = container.querySelector("#reviewCard");
  const reviewContent = container.querySelector("#reviewContent");
  const closeReviewBtn = container.querySelector("#closeReviewBtn");
  const backBtn = container.querySelector("#anteriorQuizBackBtn");

  // Data - clinical cases and questions (same as original)
  const cases = [
    {
      title: "6 month old baby: 'Eye looks funny'",
      image: "images/case1_eye.png",
      questions: [
        {
          question: "What is the dominant abnormal sign?",
          options: [
            "Hazey/grey cornea",
            "White pupil (leucocoria)",
            "Keratic precipitates",
            "Hypopyon"
          ],
          correctIndex: 1
        },
        {
          question: "What is the most likely diagnosis?",
          options: [
            "Corneal scar",
            "Congenital cataract",
            "Infective keratitis",
            "Limbal dermoid"
          ],
          correctIndex: 1
        },
        {
          question: "What should you do?",
          options: [
            "Prescribe topical antibiotics",
            "Refer urgently to an eye-care professional",
            "Reassure and discharge",
            "Assess for spectacles only"
          ],
          correctIndex: 1
        }
      ]
    },
    // ... include all other cases exactly as in your original quiz JS ...
    // Make sure to copy all cases you provided earlier here!
  ];

  // Copy all the cases here as in your original quiz page

  // State
  let currentCaseIndex = 0;
  let currentQuestionIndex = 0;
  let answers = cases.map(c => new Array(c.questions.length).fill(null));

  // Render question function
  function renderQuestion(caseIndex, questionIndex) {
    const c = cases[caseIndex];
    const q = c.questions[questionIndex];

    caseTitle.textContent = `Case ${caseIndex + 1}`;
    caseSubtitle.textContent = c.title;

    caseImage.src = c.image;
    caseImage.alt = c.title + " image";

    quizForm.innerHTML = "";

    const div = document.createElement("div");
    div.classList.add("question");

    const h3 = document.createElement("h3");
    h3.textContent = `${questionIndex + 1}. ${q.question}`;
    div.appendChild(h3);

    const ul = document.createElement("ul");
    ul.classList.add("options");

    q.options.forEach((opt, optIndex) => {
      const li = document.createElement("li");
      const input = document.createElement("input");
      const id = `case${caseIndex}_q${questionIndex}_opt${optIndex}`;
      input.type = "radio";
      input.name = `q${questionIndex}`;
      input.id = id;
      input.value = optIndex;
      if (answers[caseIndex][questionIndex] === optIndex) {
        input.checked = true;
      }
      input.onchange = () => {
        answers[caseIndex][questionIndex] = parseInt(input.value);
        updateButtons();
      };

      const label = document.createElement("label");
      label.htmlFor = id;
      label.textContent = opt;

      li.appendChild(input);
      li.appendChild(label);
      ul.appendChild(li);
    });

    div.appendChild(ul);
    quizForm.appendChild(div);

    updateButtons();
  }

  // Update nav buttons state and next case button
  function updateButtons() {
    prevQuestionBtn.disabled = currentQuestionIndex === 0;
    nextQuestionBtn.disabled = currentQuestionIndex === cases[currentCaseIndex].questions.length - 1;

    // Show Next Case button if all questions answered for current case
    const allAnswered = !answers[currentCaseIndex].some(a => a === null);
    nextCaseBtn.style.display = allAnswered ? "block" : "none";

    nextCaseBtn.disabled = !allAnswered;
  }

  // Navigation button handlers
  prevQuestionBtn.onclick = () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      renderQuestion(currentCaseIndex, currentQuestionIndex);
    }
  };

  nextQuestionBtn.onclick = () => {
    if (currentQuestionIndex < cases[currentCaseIndex].questions.length - 1) {
      currentQuestionIndex++;
      renderQuestion(currentCaseIndex, currentQuestionIndex);
    }
  };

  nextCaseBtn.onclick = () => {
    currentCaseIndex++;
    currentQuestionIndex = 0;
    if (currentCaseIndex >= cases.length) {
      showScore();
    } else {
      renderQuestion(currentCaseIndex, currentQuestionIndex);
    }
  };

  // Show score page
  function showScore() {
    quizCard.style.display = "none";
    scoreCard.style.display = "block";

    let totalQuestions = 0;
    let correctCount = 0;
    cases.forEach((c, caseIdx) => {
      c.questions.forEach((q, qIdx) => {
        totalQuestions++;
        if (answers[caseIdx] && answers[caseIdx][qIdx] === q.correctIndex) {
          correctCount++;
        }
      });
    });

    scoreText.textContent = `You scored ${correctCount} out of ${totalQuestions} correct.`;
  }

  // Restart quiz
  restartBtn.onclick = () => {
    currentCaseIndex = 0;
    currentQuestionIndex = 0;
    answers = cases.map(c => new Array(c.questions.length).fill(null));
    scoreCard.style.display = "none";
    reviewCard.style.display = "none";
    quizCard.style.display = "block";
    renderQuestion(currentCaseIndex, currentQuestionIndex);
  };

  // Review quiz
  reviewBtn.onclick = () => {
    scoreCard.style.display = "none";
    reviewCard.style.display = "block";
    buildReview();
  };

  closeReviewBtn.onclick = () => {
    reviewCard.style.display = "none";
    scoreCard.style.display = "block";
  };

  // Build review page content
  function buildReview() {
    reviewContent.innerHTML = "";
    cases.forEach((c, caseIdx) => {
      const caseDiv = document.createElement("div");
      caseDiv.classList.add("review-case");

      const h2 = document.createElement("h2");
      h2.textContent = `Case ${caseIdx + 1}`;
      caseDiv.appendChild(h2);

      const subtitle = document.createElement("div");
      subtitle.id = "caseSubtitle";
      subtitle.textContent = c.title;
      caseDiv.appendChild(subtitle);

      const img = document.createElement("img");
      img.className = "case-image";
      img.src = c.image;
      img.alt = c.title + " image";
      caseDiv.appendChild(img);

      c.questions.forEach((q, qIdx) => {
        const qDiv = document.createElement("div");
        qDiv.classList.add("review-question");

        const qH3 = document.createElement("h3");
        qH3.textContent = `${qIdx + 1}. ${q.question}`;
        qDiv.appendChild(qH3);

        const ul = document.createElement("ul");
        ul.classList.add("review-options");

        q.options.forEach((opt, optIdx) => {
          const li = document.createElement("li");

          if (optIdx === q.correctIndex) {
            li.classList.add("correct");
          }
          if (answers[caseIdx][qIdx] === optIdx) {
            li.classList.add("user-selected");
          }

          li.textContent = opt;
          ul.appendChild(li);
        });

        qDiv.appendChild(ul);
        caseDiv.appendChild(qDiv);
      });

      reviewContent.appendChild(caseDiv);
    });
  }

  // Initialize first question display
  function startAnteriorSegmentQuiz() {
    currentCaseIndex = 0;
    currentQuestionIndex = 0;
    answers = cases.map(c => new Array(c.questions.length).fill(null));
    scoreCard.style.display = "none";
    reviewCard.style.display = "none";
    quizCard.style.display = "block";
    renderQuestion(currentCaseIndex, currentQuestionIndex);
  }

  // Back button to return to learning modules
  if (backBtn) backBtn.onclick = () => showPage('coreClinicalOphthalmicExamination');


  // Expose start function globally so it can be called from outside
  window.startAnteriorSegmentQuiz = startAnteriorSegmentQuiz;
})();


// Initial navigation setup after DOM loads
document.addEventListener('DOMContentLoaded', () => {
   // Explicitly trigger initial page logic
  showPage('splashScreen');
  // Click on Anterior Segment card opens quiz iframe page
  const anteriorCard = document.getElementById('anteriorSegmentCard');
  if (anteriorCard) {
    anteriorCard.style.cursor = 'pointer';
    anteriorCard.addEventListener('click', () => {
      showPage('frontOfEyePage');
    });
  }


  const anteriorVideoCard = document.getElementById('anteriorSegmentVideoCard');
if (anteriorVideoCard) {
  anteriorVideoCard.addEventListener('click', () => {
    showPage('anteriorSegmentVideoPage');
  });
}

const caseBasedCard = document.getElementById('caseBasedLearningCard');
if (caseBasedCard) {
  caseBasedCard.addEventListener('click', () => {
    showPage('anteriorSegmentQuizPage');
  });
}

  const pupilsCard = document.getElementById('pupilsCard');
  if (pupilsCard) {
    pupilsCard.addEventListener('click', () => {
      showPage('pupilsPage');
    });
  }


  const childhoodEyeScreeningCard = document.getElementById('childhoodEyeScreeningCard');
    if (childhoodEyeScreeningCard) {
      childhoodEyeScreeningCard.addEventListener('click', () => {
        showPage('childhoodEyeScreeningPage');
      });
    }
  });


  const howToUseArclightCard = document.getElementById('howToUseArclightCard');
  if (howToUseArclightCard) {
    howToUseArclightCard.addEventListener('click', () => {
      showPage('howToUseArclightVideoPage');
    });
  }




  // Back button on iframe quiz page
  const quizBackBtn = document.getElementById('quizBackBtn');
  if (quizBackBtn) {
    quizBackBtn.addEventListener('click', () => {
      showPage('learningModules');
    });
  }

  // Home button returns to dashboard
  const homeBtn = document.getElementById('homeBtn');
  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      showPage('dashboard');
    });
  }

  // ...Other existing event listeners for your app here...

// YouTube iframe API, toolbar functions, and any other app JS go here...

// You can keep all your existing functions as is


// Splash screen logic
window.addEventListener('load', () => {
  const dropdown = document.getElementById('splashLanguageDropdown');
  const languageBox = document.getElementById('languageContainer');

  setTimeout(() => {
    if (languageBox) languageBox.style.display = 'block';
  }, 5000); // 5 seconds after logo fade-in

  if (dropdown) {
  dropdown.addEventListener('change', () => {
    const splash = document.getElementById('splashScreen');
    const onboarding = document.getElementById('onboarding');

    // Add fade-out class
    splash.classList.add('fade-out');

    // After animation ends, show onboarding
    setTimeout(() => {
      splash.classList.remove('active');
      onboarding.classList.add('active');
      splash.classList.remove('fade-out'); // Reset for future use
    }, 500); // Match CSS animation duration
  });
}

});

document.addEventListener('DOMContentLoaded', () => {
  const fieldSelect = document.getElementById('fieldSelect');
  const jobSelect = document.getElementById('jobSelect');
  const studentYearSelect = document.getElementById('studentYearSelect');

  const jobOptions = {
    eyes: [
      "Ophthalmologist",
      "Optometrist",
      "Ophthalmic Clinical Officer",
      "Clinical Officer",
      "Community Health Worker",
      "Village Health Worker",
      "Lady Community Health Worker",
      "Primary Health Care Nurse",
      "Medical Student"
    ],
    ears: [
      "ENT Specialist",
      "Audiologist",
      "Ear Care Practitioner",
      "Clinical Officer",
      "Community Health Worker",
      "Village Health Worker",
      "Lady Community Health Worker",
      "Health Extension Worker",
      "Medical Student"
    ],
    skin: [
      "Dermatologist",
      "Skin Specialist Nurse",
      "Community Health Worker",
      "Village Health Worker",
      "Lady Community Health Worker",
      "Health Extension Worker",
      "Clinical Officer",
      "Medical Student"
    ]
  };

  fieldSelect.addEventListener('change', () => {
    const selectedField = fieldSelect.value;
    jobSelect.innerHTML = '<option disabled selected>Select your job role</option>';

    jobOptions[selectedField].forEach(job => {
      const opt = document.createElement('option');
      opt.value = job;
      opt.textContent = job;
      jobSelect.appendChild(opt);
    });

    jobSelect.classList.remove('hidden');
    studentYearSelect.classList.add('hidden');
  });

  jobSelect.addEventListener('change', () => {
    const selectedJob = jobSelect.value;
    if (selectedJob === "Medical Student") {
      studentYearSelect.classList.remove('hidden');
    } else {
      studentYearSelect.classList.add('hidden');
    }
  });
});

searchContainer = document.getElementById('fixedSearchContainer');
if (searchContainer) {
  searchContainer.style.display = pageId === 'dashboard' ? 'block' : 'none';
}


if (searchContainer) {
  searchContainer.style.display = pageId === 'dashboard' ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const atomsImg = document.querySelector('#atomsImageContainer img');
  if (atomsImg) {
    atomsImg.addEventListener('click', () => {
      atomsImg.classList.toggle('zoomed');
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('customVideo');
  if (video) {
    video.addEventListener('timeupdate', () => {
      const time = Math.floor(video.currentTime);

      if (time === 22 && lastPauseTime !== 'eye-info') {
        lastPauseTime = 'eye-info';
        video.pause();
        showEyeAnatomy();
      } else if (time === 23 && lastPauseTime !== 23) {
        lastPauseTime = 23;
        pauseAndShowInfo('pause-only');
      } else if (time === 32 && lastPauseTime !== 32) {
        lastPauseTime = 32;
        pauseAndShowInfo('device');
      }
    });
  }
});

function pauseAndShowInfo(type) {
  const video = document.getElementById('customVideo');
  if (!video) return;

  if (type === 'eye') {
    showEyeAnatomy();
  } else if (type === 'device') {
    showDeviceImage();
  }

  setTimeout(() => {
    video.play();
  }, 20000);
}

let zoomLevel = 1;

document.addEventListener('wheel', function(e) {
  const img = document.getElementById('earHealthImage');
  if (!img || !img.closest('.page.active')) return;

  if (e.deltaY < 0) {
    zoomLevel += 0.1;
  } else {
    zoomLevel = Math.max(0.5, zoomLevel - 0.1);
  }

  img.style.transform = `scale(${zoomLevel})`;
});

document.addEventListener('DOMContentLoaded', () => {
  const eyesToEarsSwitch = document.getElementById('eyesToEarsSwitch');
  if (eyesToEarsSwitch) {
    eyesToEarsSwitch.addEventListener('change', function() {
      if (this.checked) {
        showPage('earsDashboard');
        this.checked = false;  // reset switch when user arrives
      }
    });
  }
});

//service worker
if ('serviceWorker' in navigator) {
  // Check protocol before attempting to register service worker
  if (location.protocol === 'https:' || location.hostname === 'localhost') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js')
        .then(reg => {
          console.log('Service Worker registered successfully.', reg);
        })
        .catch(err => {
          console.error('Service worker registration failed: ', err);
        });
    });
  } else {
    console.log('Service worker not registered because not running on https or localhost.');
  }
}



// ---- INSTALL PROMPT HANDLER ----
// === Install Prompt Handling (added for mobile support) ===
let deferredPrompt = null;
const installPopup = document.getElementById('installPopup');
const installConfirmBtn = document.getElementById('installConfirmBtn');
const installDismissBtn = document.getElementById('installDismissBtn');

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  installPopup.style.display = 'block';
});

installConfirmBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === 'accepted') {
    console.log('User accepted the install prompt');
  } else {
    console.log('User dismissed the install prompt');
  }
  deferredPrompt = null;
  installPopup.style.display = 'none';
});

installDismissBtn.addEventListener('click', () => {
  installPopup.style.display = 'none';
});

// Optional iOS fallback:
if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
  installPopup.style.display = 'block';
}


