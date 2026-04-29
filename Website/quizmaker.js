const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get('id');

const data = quizData[quizId];

let currentStepIndex = 0;

let progress = JSON.parse(localStorage.getItem('userProgress')) || {};

// If this specific quiz isn't in our progress yet, add it
if (!progress[quizId]) {
    progress[quizId] = {
        completedSteps: [], // List of indexes the user has finished
        percentage: 0
    };
}

function updateProgress(index) {
    const course = progress[quizId];
    
    // Only add the step if it's not already in the list
    if (!course.completedSteps.includes(index)) {
        course.completedSteps.push(index);
        
        // Calculate the percentage: (Steps Done / Total Steps) * 100
        course.percentage = Math.round((course.completedSteps.length / data.steps.length) * 100);
        
        // Save it to the browser's memory
        localStorage.setItem('userProgress', JSON.stringify(progress));
        
        console.log(`Course ${quizId} is ${course.percentage}% complete!`);
    }
}


function renderStep() {
    
    if (!data) return;

    // 1. Get current step data
    const step = data.steps[currentStepIndex];

    // 2. Grab all the HTML "buckets"
    const sidebarTitle = document.getElementById('course-name');
    const sidebarList = document.getElementById('sidebar-list');
    const mainpageHeading = document.getElementById('content-title');
    const mainpageBody = document.getElementById('content-body');
    const nextBtn = document.getElementById('next-btn');

    // 3. Update the Titles
    sidebarTitle.innerText = data.title;
    mainpageHeading.innerText = step.heading || "Quiz Time!";
    mainpageBody.innerHTML = ''; // Clear the main area

    // 4. REBUILD SIDEBAR (Simple version)
    sidebarList.innerHTML = '';
    data.steps.forEach((s, index) => {
        const li = document.createElement('li');
        li.innerText = `${index + 1}. ${s.heading || "Knowledge Check"}`;


        li.onclick = () => {
            currentStepIndex = index; // Move the "bookmark" to this step
            renderStep();             // Redraw the page
        };

        if (index === currentStepIndex) {
            li.style.fontWeight = "bold";
            li.style.color = "#3498db";
        }
        sidebarList.appendChild(li);
    });

    // 5. RENDER MAIN CONTENT (Text or Quiz)
    if (step.type === "text") {
        mainpageBody.innerText = step.content;
        updateProgress(currentStepIndex);
    } 
    else if (step.type === "quiz") {
        const questionText = document.createElement('p');
        questionText.innerText = step.question;
        questionText.style.marginBottom = "20px";
        mainpageBody.appendChild(questionText);

        step.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.innerText = opt;
            btn.className = "quiz-btn";
            btn.onclick = () => checkAnswer(index, step.answer, btn);
            mainpageBody.appendChild(btn);
        });
    }

    // 6. UPDATE NEXT BUTTON TEXT
    nextBtn.innerText = (currentStepIndex === data.steps.length - 1) ? "Finish" : "Next";
}





    


function nextStep() {
    if (currentStepIndex < data.steps.length - 1) {
        currentStepIndex++;
        renderStep();
    } else {
        window.location.href = 'index.html';
    }
}


function checkAnswer(selectedIndex, correctIndex, btn) {
    // 1. Check if the clicked button's index matches the correct answer index
    if (selectedIndex === correctIndex) {
        btn.classList.add('correct');
        btn.innerText += " — Correct!";
        
        
        // 2. Update the progress percentage we just built
        updateProgress(currentStepIndex); 
    } else {
        btn.classList.add('incorrect');
        btn.innerText += " — Try again!";
    }
    
    // 3. Disable all buttons so they can't change their answer
    const buttons = document.querySelectorAll('.quiz-btn');
    buttons.forEach(b => b.disabled = true);
}


renderStep()

