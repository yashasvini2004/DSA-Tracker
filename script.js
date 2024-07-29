// Array to store topics
let topics = [];

// Function to add a new topic
function addTopic() {
    const newTopicInput = document.getElementById("new-topic");
    const topicName = newTopicInput.value.trim();

    if (topicName !== "") {
        topics.push({ name: topicName, completed: false });
        newTopicInput.value = "";
        displayTopics();
    }
}

// Function to mark a topic as completed
function toggleCompletion(index) {
    topics[index].completed = !topics[index].completed;
    displayTopics();
}

// Function to delete a topic
function deleteTopic(index) {
    topics.splice(index, 1);
    displayTopics();
}

// Function to display topics
function displayTopics() {
    const topicList = document.getElementById("topic-list");
    topicList.innerHTML = "";

    topics.forEach((topic, index) => {
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = topic.completed;
        checkbox.addEventListener("change", () => toggleCompletion(index));
        const topicText = document.createElement("span");
        topicText.textContent = topic.name;
        if (topic.completed) {
            topicText.classList.add("completed");
        }
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteTopic(index));

        listItem.appendChild(checkbox);
        listItem.appendChild(topicText);
        listItem.appendChild(deleteButton);
        topicList.appendChild(listItem);
    });
}

// Initial display
displayTopics();
