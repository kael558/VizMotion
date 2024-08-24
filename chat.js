const messages = [
	{
		role: "assistant",
		content: "Hi! Describe the diagram you want and I'll create it for you.",
	},
	/*{
        "role": "user",
        "content": "Can you create a flowchart for a simple login process?"
    }*/
];

function renderMessages() {
	const chat = document.getElementById("chat-messages");
	chat.innerHTML = ""; // Clear existing messages

	messages.forEach((message) => {
		const div = document.createElement("div");
		div.className = `message ${message.role}`;

		const header = document.createElement("div");
		header.className = "message-header";
		header.textContent = message.role === "assistant" ? "Bot:" : "User:";

		const content = document.createElement("div");
		content.textContent = message.content;

		div.appendChild(header);
		div.appendChild(content);
		chat.appendChild(div);
	});

	// Scroll to the bottom of the chat
	chat.scrollTop = chat.scrollHeight;
}

let token = "";

async function getToken() {
	const response = await fetch(
		"https://8mkbzr26h5.execute-api.us-east-1.amazonaws.com/token",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}
	);

	if (!response.ok) {
		const message = `An error has occured: ${response.status}`;
		console.error(message);
		return message;
	}

	const data = await response.json();
	console.log(data);

	return data.access_token;
}

async function chat(message) {
	if (!token) {
		token = await getToken();
	}

	const options = {
		method: "POST",
		body: JSON.stringify({ input: message || "" }),
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
            Authorization: `Bearer ${token}`,
		},
	};

	const response = await fetch(
		"https://8mkbzr26h5.execute-api.us-east-1.amazonaws.com/chat",
		options
	);

	if (!response.ok) {
		const message = `An error has occured: ${response.status}`;
		console.error(message);
		return message;
	}

	const data = await response.json();
	return data.results[0].generated_text;
}

function executeJavaScript(code) {
	try {
        console.log(code);
		return eval(code);
	} catch (error) {
		return `Error executing code: ${error.message}`;
	}
}

document.getElementById("send-msg").addEventListener("click", async (e) => {
	e.preventDefault();
	const input = document.getElementById("msg-input");
	const message = input.value;
	input.value = ""; // Clear input field

	messages.push({ role: "user", content: message });
	renderMessages();

	const response = await chat(message);
    console.log(response);

	// Get the code within ``` ```
	const codeRegex = /```javascript\s*([\s\S]*?)```/g;
	let lastIndex = 0;
	let modifiedResponse = "";

	let match;
	while ((match = codeRegex.exec(response)) !== null) {
		// Append text before the code block
		modifiedResponse += response.slice(lastIndex, match.index);

		const code = match[1].trim();
		const result = executeJavaScript(code);

		// Append the code execution result
		modifiedResponse += `Code execution result:\n${result}\n`;

		lastIndex = codeRegex.lastIndex;
	}

	// Append any remaining text after the last code block
	modifiedResponse += response.slice(lastIndex);

	// Push the modified response to messages
	messages.push({ role: "assistant", content: modifiedResponse });
    renderMessages();
});
renderMessages();
