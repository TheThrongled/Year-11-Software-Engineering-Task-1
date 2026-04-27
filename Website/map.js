const milestones = [
    { id: 1, x: 14, y: 48, title: "Intro to Logic" },
    { id: 2, x: 33, y: 37, title: "Variables 101" },
    { id: 3, x: 31, y: 85, title: "Functions" },
    { id: 4, x: 57, y: 64, title: "Iterations" },
    { id: 5, x: 76, y: 79, title: "Objects" },
    { id: 6, x: 87, y: 40, title: "Heuristics" }
];

const nodesLayer = document.getElementById('nodes-layer');
const svg = document.getElementById('mapSvg');

// draw line and circle
milestones.forEach((m, i) => {
    // "makes" a circle
    const node = document.createElement('div');
    node.className = 'circle-node';
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

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('scroll-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        });
    }
});