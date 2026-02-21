const XLSX = require('xlsx');

// Using forward slashes or double backslashes for path
const workbook = XLSX.readFile('C:/ClodueSpace/NONONO/Learning_Plan_2027.xlsx');

const goals = [
  { name: 'GATE CSE', sheet: 'GATE CS Track' },
  { name: 'GATE DA', sheet: 'GATE DA Track' },
  { name: 'Upskill', sheet: 'Upskilling Track' }
];

const result = [];

goals.forEach(goal => {
  const sheet = workbook.Sheets[goal.sheet];
  if (!sheet) {
    console.error(`Sheet not found: ${goal.sheet}`);
    return;
  }
  
  const data = XLSX.utils.sheet_to_json(sheet);
  
  const subGoals = data.map((row) => {
    const tasks = [];
    
    // Extract Tasks
    if (row['Weekly Goal']) {
        tasks.push({
            title: row['Weekly Goal'],
            description: 'Main weekly objective',
            duration: '1 week',
            frequency: 'Weekly',
            targetEndDate: '' 
        });
    }

    if (row['Practice (Platform + Task)']) {
         tasks.push({
            title: row['Practice (Platform + Task)'],
            description: 'Practice tasks',
            duration: 'Daily',
            frequency: 'Daily',
            targetEndDate: ''
        });
    }
    
    // Parse Dates
    let startDate = '';
    let endDate = '';
    if (row['Date Range']) {
        const parts = row['Date Range'].split('-');
        if (parts.length === 2) {
            startDate = parts[0].trim();
            endDate = parts[1].trim();
        } else {
            startDate = row['Date Range'];
        }
    }

    return {
      title: row['Topic/Domain'] || `Week ${row['Week #']}`,
      description: row['Resources Summary'] || '',
      startDate: startDate,
      endDate: endDate,
      tasks: tasks
    };
  });

  result.push({
    goalName: goal.name,
    subGoals: subGoals
  });
});

console.log(JSON.stringify(result, null, 2));
