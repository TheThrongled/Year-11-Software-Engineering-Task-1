const milestones = [
    { id: 1, x: 14, y: 40, title: "Requirements Definition", quizURL: "quiz.html?id=1" },
    { id: 2, x: 33, y: 30, title: "Determining Specifications", quizURL: "quiz.html?id=2" },
    { id: 3, x: 31, y: 75, title: "Design", quizURL: "quiz.html?id=3" },
    { id: 4, x: 57, y: 57, title: "Development", quizURL: "quiz.html?id=4" },
    { id: 5, x: 76, y: 70, title: "Integration", quizURL: "quiz.html?id=5" },
    { id: 6, x: 87, y: 30, title: "Testing and Debugging", quizURL: "quiz.html?id=6" }
];





const nodesLayer = document.getElementById('nodes-layer');
const svg = document.getElementById('mapSvg');


const userProgress = JSON.parse(localStorage.getItem('userProgress')) || {};

// draw line and circle
milestones.forEach((m, i) => {
    // "makes" a circle
    const node = document.createElement('div');
    node.className = 'circle-node';

    const courseData = userProgress[m.id] || { percentage: 0 };
    const percent = courseData.percentage;

    // 2. Assign a class based on the percentage
    if (percent === 100) {
        node.classList.add('completed');
    } else if (percent > 0) {
        node.classList.add('in-progress');
    } else {
        node.classList.add('not-started');
    }



    node.style.left = m.x + '%';
    node.style.top = m.y + '%';
    node.onclick = () => openPopup(m);
    nodesLayer.appendChild(node);



    // line "next" to circle
    if (milestones[i + 1]) {
        const next = milestones[i + 1];
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", m.x + "%");
        line.setAttribute("y1", m.y + "%");
        line.setAttribute("x2", next.x + "%");
        line.setAttribute("y2", next.y + "%");
        line.setAttribute("stroke", "#3498db");
        line.setAttribute("stroke-width", "5");
        svg.appendChild(line);
    }
});

function openPopup(m) {
    const popup = document.getElementById('map-popup');
    
    // popup adjusted to be centred relative to circle
    popup.style.left = m.x + '%';
    popup.style.top = m.y + '%';
    
    // fill in the popup
    document.getElementById('popup-title').innerText = m.title;
    document.getElementById('start-quiz-link').href = m.quizURL;
    
    popup.style.display = 'block';
}

const milestoneCount = milestones.length; 

// We look at all the values in our storage and count only the ones that = 100
const completedCount = Object.values(userProgress).filter(course => course.percentage === 100).length;


const grandTotal = Math.round((completedCount / milestoneCount) * 100);

// Set the value of the HTML progress element
const progressBar = document.getElementById('grand-progress-bar');
if (progressBar) {
    progressBar.value = grandTotal; 
}

const statusText = document.getElementById('progress-status-text');

if (statusText) {
    if (grandTotal === 0) {
        statusText.innerText = "Scroll down to get started on your journey!";
    } else if (grandTotal < 50) {
        statusText.innerText = `You've completed ${grandTotal}% of courses. Off to a great start!`;
    } else if (grandTotal < 80) {
        statusText.innerText = `You're ${grandTotal}% done. Keep on going!`;

    } else if (grandTotal < 90) {
        statusText.innerText = `Just one more left to do. Finish it!`

    } else {
        statusText.innerText = "100%! You've mastered the Software Development Life Cycle. Good job! ";
    }

}

function renderQuickAccess() {
    const list = document.getElementById('quick-access-list');
    if (!list) return;

    list.innerHTML = ''; // Clear it out
    
    // 1. Filter milestones to only include those "In Progress"
    const inProgressMilestones = milestones.filter(m => {
        const courseProgress = userProgress[m.id]?.percentage || 0;
        return courseProgress > 0 && courseProgress < 100;
    });

    // 2. Handle the "Nothing in progress" state
    if (inProgressMilestones.length === 0) {
        list.innerHTML = '<li class="quick-access-item" style="opacity: 0.6;">No courses in progress. Scroll down to start!</li>';
        return;
    }

    // 3. Render the filtered list
    inProgressMilestones.forEach(m => {
        const li = document.createElement('li');
        li.className = 'quick-access-item';
        
        const courseProgress = userProgress[m.id].percentage;

        li.innerHTML = `
            <span>${m.id}. ${m.title}</span>
            <span class="status-tag">${courseProgress}%</span>
        `;

        li.onclick = () => window.location.href = `quiz.html?id=${m.id}`;
        list.appendChild(li);
    });
}


// Call it at the bottom of script
renderQuickAccess();






