const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all section tags and their line numbers
const lines = html.split('\n');
lines.forEach((line, idx) => {
    if (line.includes('<section') || line.includes('id="pricing"') || line.includes('4,500') || line.includes('2,500') || line.includes('Investment') || line.includes('Tuition')) {
        console.log(`Line ${idx + 1}: ${line.trim().slice(0, 100)}`);
    }
});
