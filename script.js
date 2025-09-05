// --- Project last updated timers ---
// map project names to last updated times (null = N/A)
const projectTimes = {
  'opti-input': new Date('2025-07-11T20:40:00'),
  'NihilOS': null
};

// helper function to format elapsed milliseconds as "Xd Yhr Zmin"
function formatElapsed(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  let remainder = totalSeconds % 86400;
  const hours = Math.floor(remainder / 3600);
  remainder %= 3600;
  const minutes = Math.floor(remainder / 60);

  let parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}hr`);
  parts.push(`${minutes}min`);

  return `Last updated: ${parts.join(' ')}`;
}

// updates all project timers
function updateProjectTimers() {
  document.querySelectorAll('.project-item').forEach(item => {
    const title = item.querySelector('h3').childNodes[0].textContent.trim();

    let timerSpan = item.querySelector('.project-timer');
    if (!timerSpan) {
      timerSpan = document.createElement('span');
      timerSpan.className = 'project-timer';
      timerSpan.style.fontSize = '0.9em';
      timerSpan.style.fontWeight = '400';
      timerSpan.style.color = '#041006';
      timerSpan.style.marginLeft = '10px';
      timerSpan.style.fontStyle = 'italic';
      item.querySelector('h3').appendChild(timerSpan);
    }

    const lastUpdated = projectTimes[title];
    if (!lastUpdated) {
      timerSpan.textContent = 'Last updated: N/A';
    } else {
      const diff = new Date() - lastUpdated;
      timerSpan.textContent = formatElapsed(diff);
    }
  });
}

// initial update and interval
updateProjectTimers();
setInterval(updateProjectTimers, 1000);

// --- Cheeky rotating tooltips for project titles ---
document.querySelectorAll('.project-item h3').forEach(title => {
  const messages = [
    "Click 'View Project' to see my masterpiece 😏",
    "Hovering here won't get you extra points… maybe",
    "I swear there's a secret somewhere",
    "Code so clean even your grandma would approve"
  ];

  // initially pick a random message
  let randMsg = messages[Math.floor(Math.random() * messages.length)];
  title.title = randMsg;

  // rotate messages every 5 seconds
  setInterval(() => {
    randMsg = messages[Math.floor(Math.random() * messages.length)];
    title.title = randMsg;
  }, 5000);
});

// --- Simple placeholder function for project buttons ---
function viewProject(name) {
  if (name === 'opti-input') {
    window.open('https://github.com/PitchherSys/opti-input', '_blank');
  } else {
    alert('You clicked to view ' + name + '. This will eventually go somewhere.');
    console.log('Button clicked for project:', name);
  }
}
