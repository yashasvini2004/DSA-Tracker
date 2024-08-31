document.getElementById('fileInput').addEventListener('change', function(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, { type: 'array' });
            let sheetName = workbook.SheetNames[0];
            let worksheet = workbook.Sheets[sheetName];
            let jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Remove header row
            jsonData.shift();

            // Process and display topics
            let topics = new Set(jsonData.map(row => row[0]));
            let topicsContainer = document.getElementById('topics');
            topicsContainer.innerHTML = ''; // Clear previous topics
            
            topics.forEach(topic => {
                let button = document.createElement('button');
                button.textContent = topic;
                button.onclick = () => showProblems(topic, jsonData);
                topicsContainer.appendChild(button);
            });
        };
        reader.readAsArrayBuffer(file);
    }
});

function showProblems(topic, data) {
    let filteredProblems = data.filter(row => row[0] === topic);
    let container = document.getElementById('topics');
    container.innerHTML = ''; // Clear existing content

    // Update the heading
    let heading = document.querySelector('h1');
    heading.textContent = `Problems in ${topic}`;

    // Create an unordered list for problems
    let problemsList = document.createElement('ul');
    problemsList.id = 'problems-list';
    problemsList.style.listStyleType = 'none'; // Remove bullet points
    problemsList.style.padding = '0'; // Remove default padding
    problemsList.style.margin = '0'; // Remove default margin
    problemsList.style.position = 'absolute'; // Use absolute positioning
    problemsList.style.right = '500px'; // Move list to the right
    problemsList.style.top = '300px'; // Adjust top position if needed

    filteredProblems.forEach(row => {
        let listItem = document.createElement('li');
        listItem.style.display = 'flex'; // Use flexbox for alignment
        listItem.style.alignItems = 'center'; // Center align items vertically
        listItem.style.marginBottom = '10px'; // Space between list items
        listItem.style.padding = '10px'; // Padding inside each list item
        listItem.style.border = '1px solid #007bff'; // Border around list items
        listItem.style.borderRadius = '5px'; // Rounded corners
        listItem.style.backgroundColor = '#fff'; // Background color

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = row[2] === 'yes';
        checkbox.style.marginRight = '10px'; // Space between checkbox and label

        let label = document.createElement('label');
        label.textContent = row[1];
        label.style.flex = '1'; // Makes label take up available space

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        problemsList.appendChild(listItem);
    });

    container.appendChild(problemsList);
}
