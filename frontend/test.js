const API_URL = 'https://silver-space-disco-5g5w6w59pq9gh7rvx-5000.app.github.dev/reshuffle';

let myTasks = [
    { id: 1, title: "Emails", time: "09:00 AM", priority: "P2" },
    { id: 2, title: "Deep Work", time: "09:00 AM", priority: "P1" },
    { id: 3, title: "Gym", time: "12:00 PM", priority: "P3" }
];

const container = document.getElementById('taskContainer');
const btn = document.getElementById('rbutton');

async function triggerReshuffle() {
    if (!btn) return;
    btn.innerText = "Processing...";
    btn.disabled = true;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tasks: myTasks })
        });

        const result = await response.json();
        
        if (result.status === "success") {
            myTasks = result.tasks;
            renderUI();
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    } finally {
        btn.innerText = "Reshuffle My Day";
        btn.disabled = false;
    }
}

function renderUI() {
    if (!container) return;
    container.innerHTML = myTasks.map(task => `
        <div style="border-left: 4px solid ${getPriorityColor(task.priority)}; margin-bottom: 10px; padding: 12px; background: white; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.05); font-family: sans-serif;">
            <div>
                <h3 style="margin: 0; font-size: 1rem; color: #1e293b;">${task.title}</h3>
                <p style="margin: 0; font-size: 0.8rem; color: #64748b;">${task.time}</p>
            </div>
            <span style="font-size: 0.7rem; font-weight: bold; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; color: #475569;">${task.priority}</span>
        </div>
    `).join('');
}

function getPriorityColor(p) {
    if (p === 'P0') return '#ef4444';
    if (p === 'P1') return '#f97316';
    if (p === 'P2') return '#3b82f6';
    return '#94a3b8';
}

if (btn) {
    btn.addEventListener('click', triggerReshuffle);
}

renderUI();