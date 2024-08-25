

export const generateText = async (ACCESS_TOKEN, message) => {
	const url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29";
	const headers = {
		"Accept": "application/json",
		"Content-Type": "application/json",
		"Authorization": `Bearer ${ACCESS_TOKEN}`
	};
	const body = {
		input: `Based on the user's request, write the list of elements and animations in JavaScript.


Each shape should follow this schema:
{
  id: "uniqueElementId", // Unique identifier for the element
  type: "rect" | "circle" | "text" | "line" | "arrow", // Type of element (e.g., icon, rectangle, circle, text, line)
  src: "icons/house.png", // Sets an image of the element
  points: [x1, y1, x2, y2], // Points for line and arrow types
  x: 100, // X-coordinate position relative to the parent element
  y: 150, // Y-coordinate position relative to the parent element
  width: 200, // Width of the element (if applicable)
  height: 100, // Height of the element (if applicable)
  radius: 50, // Radius (for circles, optional)
  text: "Hello, World!", // Text content (if type is 'text')
  fontSize: 24, // Font size (if type is 'text')
  color: "#FF0000", // Fill color of the element
  stroke: "#000000", // Border color (optional)
  strokeWidth: 2, // Border thickness (optional)
  lineType: "solid" | "dashed" | "dotted", // Line type for strokes (if applicable)
  opacity: 1, // Opacity of the element (0 to 1)
  rotation: 0, // Rotation angle in degrees
  children: [ // Array of child elements (optional)
    {
      id: "childElementId",
      type: "circle",
      x: 20,
      y: 30,
      radius: 25,
      color: "#0000FF",
      stroke: "#000000",
      strokeWidth: 1,
      opacity: 0.8,
      rotation: 0,
      draggable: true
    }
  ]
}




Each animation should follow this schema:
{
  id: "uniqueAnimationId", // Unique identifier for the animation
  elementId: "uniqueElementId", // The id of the element this animation applies to
  type: "scale" | "translate" | "rotate" | "colorChange" | "opacityChange" | "move" | "resize", // Type of animation
  startTime: 0, // Start time of the animation in milliseconds
  endTime: 1000, // End time of the animation in milliseconds
  from: { 
    x: 100, // Initial X position (for translate/move)
    y: 150, // Initial Y position (for translate/move)
    scaleX: 1, // Initial scale factor (for scale)
    scaleY: 1, // Initial scale factor (for scale)
    rotation: 0, // Initial rotation angle (for rotate)
    color: "#FF0000", // Initial color (for colorChange)
    opacity: 1, // Initial opacity (for opacityChange)
    width: 200, // Initial width (for resize)
    height: 100 // Initial height (for resize)
  },
  to: { 
    x: 300, // Final X position (for translate/move)
    y: 400, // Final Y position (for translate/move)
    scaleX: 2, // Final scale factor (for scale)
    scaleY: 2, // Final scale factor (for scale)
    rotation: 90, // Final rotation angle (for rotate)
    color: "#0000FF", // Final color (for colorChange)
    opacity: 0.5, // Final opacity (for opacityChange)
    width: 300, // Final width (for resize)
    height: 150 // Final height (for resize)
  },
  easing: "easeIn" | "easeOut" | "linear" | "easeInOut", // Easing function for the animation (optional)
  loop: true | false // Whether the animation should loop (optional)
}


EXAMPLE INPUT:
Create a diagram explaining the TLS handshake

EXAMPLE OUTPUT:
Sure thing. I'll create the animation showing how the TLS handshake protocol works.

\`\`\`javascript
elements = [
    {
        id: "clientIcon",
        type: "image",
        src: "icons/client.png",
        x: 370,
        y: 20,
        width: 60,
        height: 60,
    },
    {
        id: "clientText",
        type: "text",
        x: 380,
        y: 85,
        text: "Client",
        fontSize: 16,
        color: "#4CAF50",
    },
    {
        id: "serverIcon",
        type: "image",
        src: "icons/server.png",
        x: 690,
        y: 20,
        width: 60,
        height: 60,
    },
    {
        id: "serverText",
        type: "text",
        x: 695,
        y: 85,
        text: "Server",
        fontSize: 16,
        color: "#4CAF50",
    },
    {
        id: "clientLine",
        type: "line",
        points: [400, 100, 400, 500],
        color: "#FFD700",
        strokeWidth: 2,
        lineType: "solid",
    },
    {
        id: "serverLine",
        type: "line",
        points: [720, 100, 720, 500],
        color: "#FFD700",
        strokeWidth: 2,
        lineType: "solid",
    },
    {
        id: "tcpHandshake",
        type: "rect",
        x: 170,
        y: 120,
        width: 150,
        height: 80,
        color: "transparent",
        stroke: "#00BFFF",
        strokeWidth: 2,
        children: [
            {
                id: "tcpHandshakeText",
                type: "text",
                x: 180,
                y: 135,
                text: "1. TCP\nHandshake",
                fontSize: 14,
                color: "#00BFFF",
            },
        ],
    },
    {
        id: "tcpSyn",
        type: "arrow",
        points: [400, 140, 715, 140],
        color: "#00BFFF",
        strokeWidth: 1,
    },
    {
        id: "tcpSynText",
        type: "text",
        x: 500,
        y: 125,
        text: "TCP SYN",
        fontSize: 12,
        color: "#00BFFF",
    },
    {
        id: "tcpSynAck",
        type: "arrow",
        points: [715, 160, 400, 160],
        color: "#00BFFF",
        strokeWidth: 1,
    },
    {
        id: "tcpSynAckText",
        type: "text",
        x: 500,
        y: 145,
        text: "TCP SYN + ACK",
        fontSize: 12,
        color: "#00BFFF",
    },
    {
        id: "tcpAck",
        type: "arrow",
        points: [400, 180, 715, 180],
        color: "#00BFFF",
        strokeWidth: 1,
    },
    {
        id: "tcpAckText",
        type: "text",
        x: 500,
        y: 165,
        text: "TCP ACK",
        fontSize: 12,
        color: "#00BFFF",
    },
    {
        id: "connectionEstablished",
        type: "line",
        points: [355, 200, 745, 200],
        color: "#FFD700",
        strokeWidth: 1,
        lineType: "dashed",
    },
    {
        id: "connectionEstablishedText",
        type: "text",
        x: 500,
        y: 200,
        text: "connection established",
        fontSize: 12,
        color: "#FFD700",
    },
    {
        id: "certificateCheck",
        type: "rect",
        x: 170,
        y: 220,
        width: 150,
        height: 80,
        color: "transparent",
        stroke: "#4CAF50",
        strokeWidth: 2,
        children: [
            {
                id: "certificateCheckText",
                type: "text",
                x: 180,
                y: 235,
                text: "2. Certificate\nCheck",
                fontSize: 14,
                color: "#4CAF50",
            },
        ],
    },
    {
        id: "clientHello",
        type: "arrow",
        points: [400, 240, 715, 240],
        color: "#4CAF50",
        strokeWidth: 1,
    },
    {
        id: "clientHelloText",
        type: "text",
        x: 500,
        y: 225,
        text: "Client Hello",
        fontSize: 12,
        color: "#4CAF50",
    },
    {
        id: "serverHello",
        type: "arrow",
        points: [715, 260, 400, 260],
        color: "#4CAF50",
        strokeWidth: 1,
    },
    {
        id: "serverHelloText",
        type: "text",
        x: 500,
        y: 245,
        text: "Server Hello",
        fontSize: 12,
        color: "#4CAF50",
    },
    {
        id: "certificate",
        type: "arrow",
        points: [715, 280, 400, 280],
        color: "#4CAF50",
        strokeWidth: 1,
    },
    {
        id: "certificateText",
        type: "text",
        x: 500,
        y: 265,
        text: "Certificate",
        fontSize: 12,
        color: "#4CAF50",
    },
    {
        id: "serverHelloDone",
        type: "arrow",
        points: [715, 300, 400, 300],
        color: "#4CAF50",
        strokeWidth: 1,
    },
    {
        id: "serverHelloDoneText",
        type: "text",
        x: 500,
        y: 285,
        text: "Server Hello Done",
        fontSize: 12,
        color: "#4CAF50",
    },
    {
        id: "keyExchange",
        type: "rect",
        x: 170,
        y: 320,
        width: 150,
        height: 120,
        color: "transparent",
        stroke: "#2196F3",
        strokeWidth: 2,
        children: [
            {
                id: "keyExchangeText",
                type: "text",
                x: 180,
                y: 335,
                text: "3. Key\nExchange",
                fontSize: 14,
                color: "#2196F3",
            },
        ],
    },
    {
        id: "clientKeyExchange",
        type: "arrow",
        points: [400, 340, 715, 340],
        color: "#2196F3",
        strokeWidth: 1,
    },
    {
        id: "clientKeyExchangeText",
        type: "text",
        x: 500,
        y: 325,
        text: "Client Key Exchange",
        fontSize: 12,
        color: "#2196F3",
    },
    {
        id: "changeCipherSpec",
        type: "arrow",
        points: [400, 360, 715, 360],
        color: "#2196F3",
        strokeWidth: 1,
    },
    {
        id: "changeCipherSpecText",
        type: "text",
        x: 500,
        y: 345,
        text: "Change Cipher Spec",
        fontSize: 12,
        color: "#2196F3",
    },
    {
        id: "finished",
        type: "arrow",
        points: [400, 380, 715, 380],
        color: "#2196F3",
        strokeWidth: 1,
    },
    {
        id: "finishedText",
        type: "text",
        x: 500,
        y: 365,
        text: "Finished",
        fontSize: 12,
        color: "#2196F3",
    },
    {
        id: "serverChangeCipherSpec",
        type: "arrow",
        points: [715, 400, 400, 400],
        color: "#2196F3",
        strokeWidth: 1,
    },
    {
        id: "serverChangeCipherSpecText",
        type: "text",
        x: 500,
        y: 385,
        text: "Change Cipher Spec",
        fontSize: 12,
        color: "#2196F3",
    },
    {
        id: "serverFinished",
        type: "arrow",
        points: [715, 420, 400, 420],
        color: "#2196F3",
        strokeWidth: 1,
    },
    {
        id: "serverFinishedText",
        type: "text",
        x: 500,
        y: 405,
        text: "Finished",
        fontSize: 12,
        color: "#2196F3",
    },
    {
        id: "asymmetricEncryption",
        type: "rect",
        x: 750,
        y: 220,
        width: 120,
        height: 40,
        color: "#4CAF50",
        stroke: "#2E7D32",
        strokeWidth: 2,
        children: [
            {
                id: "asymmetricEncryptionText",
                type: "text",
                x: 760,
                y: 232,
                text: "Asymmetric\nEncryption",
                fontSize: 12,
                color: "white",
            },
        ],
    },
    {
        id: "keyIcon",
        type: "image",
        src: "icons/key.png",
        x: 880,
        y: 225,
        width: 30,
        height: 30,
    },
    {
        id: "sessionKeyClient",
        type: "rect",
        x: 120,
        y: 380,
        width: 100,
        height: 30,
        color: "#FFD700",
        stroke: "#FFA000",
        strokeWidth: 2,
        children: [
            {
                id: "sessionKeyClientText",
                type: "text",
                x: 130,
                y: 390,
                text: "session key",
                fontSize: 12,
                color: "black",
            },
        ],
    },
    {
        id: "encryptedSessionKeyClient",
        type: "rect",
        x: 230,
        y: 380,
        width: 100,
        height: 30,
        color: "#FF6347",
        stroke: "#D32F2F",
        strokeWidth: 2,
        children: [
            {
                id: "encryptedSessionKeyClientText",
                type: "text",
                x: 240,
                y: 390,
                text: "encrypted\nsession key",
                fontSize: 10,
                color: "white",
            },
        ],
    },
    {
        id: "keyIconClient",
        type: "image",
        src: "icons/key.png",
        x: 200,
        y: 400,
        width: 30,
        height: 30,
    },
    {
        id: "encryptedSessionKeyServer",
        type: "rect",
        x: 760,
        y: 400,
        width: 100,
        height: 30,
        color: "#FF6347",
        stroke: "#D32F2F",
        strokeWidth: 2,
        children: [
            {
                id: "encryptedSessionKeyServerText",
                type: "text",
                x: 770,
                y: 410,
                text: "encrypted\nsession key",
                fontSize: 10,
                color: "white",
            },
        ],
    },
    {
        id: "sessionKeyServer",
        type: "rect",
        x: 870,
        y: 400,
        width: 100,
        height: 30,
        color: "#FFD700",
        stroke: "#FFA000",
        strokeWidth: 2,
        children: [
            {
                id: "sessionKeyServerText",
                type: "text",
                x: 880,
                y: 410,
                text: "session key",
                fontSize: 12,
                color: "black",
            },
        ],
    },
    {
        id: "keyIconServer",
        type: "image",
        src: "icons/key.png",
        x: 840,
        y: 420,
        width: 30,
        height: 30,
    },
];

animations = [
    // TCP Handshake
    {
        elementId: "tcpSyn",
        type: "move",
        from: { points: [400, 140, 400, 140] },
        to: { points: [400, 140, 715, 140] },
        startTime: 0,
        endTime: 1000,
        easing: "easeInOut",
    },
    {
        elementId: "tcpSynAck",
        type: "move",
        from: { points: [715, 160, 715, 160] },
        to: { points: [715, 160, 400, 160] },
        startTime: 1000,
        endTime: 2000,
        easing: "easeInOut",
    },
    {
        elementId: "tcpAck",
        type: "move",
        from: { points: [400, 180, 400, 180] },
        to: { points: [400, 180, 715, 180] },
        startTime: 2000,
        endTime: 3000,
        easing: "easeInOut",
    },
    {
        elementId: "connectionEstablished",
        type: "opacityChange",
        from: { opacity: 0 },
        to: { opacity: 1 },
        startTime: 3000,
        endTime: 3500,
        easing: "easeIn",
    },

    // Certificate Check
    {
        elementId: "clientHello",
        type: "move",
        from: { points: [400, 240, 400, 240] },
        to: { points: [400, 240, 715, 240] },
        startTime: 4000,
        endTime: 5000,
        easing: "easeInOut",
    },
    {
        elementId: "serverHello",
        type: "move",
        from: { points: [715, 260, 715, 260] },
        to: { points: [715, 260, 400, 260] },
        startTime: 5000,
        endTime: 6000,
        easing: "easeInOut",
    },
    {
        elementId: "certificate",
        type: "move",
        from: { points: [715, 280, 715, 280] },
        to: { points: [715, 280, 400, 280] },
        startTime: 6000,
        endTime: 7000,
        easing: "easeInOut",
    },
    {
        elementId: "serverHelloDone",
        type: "move",
        from: { points: [715, 300, 715, 300] },
        to: { points: [715, 300, 400, 300] },
        startTime: 7000,
        endTime: 8000,
        easing: "easeInOut",
    },

    // Key Exchange
    {
        elementId: "clientKeyExchange",
        type: "move",
        from: { points: [400, 340, 400, 340] },
        to: { points: [400, 340, 715, 340] },
        startTime: 9000,
        endTime: 10000,
        easing: "easeInOut",
    },
    {
        elementId: "changeCipherSpec",
        type: "move",
        from: { points: [400, 360, 400, 360] },
        to: { points: [400, 360, 715, 360] },
        startTime: 10000,
        endTime: 11000,
        easing: "easeInOut",
    },
    {
        elementId: "finished",
        type: "move",
        from: { points: [400, 380, 400, 380] },
        to: { points: [400, 380, 715, 380] },
        startTime: 11000,
        endTime: 12000,
        easing: "easeInOut",
    },
    {
        elementId: "serverChangeCipherSpec",
        type: "move",
        from: { points: [715, 400, 715, 400] },
        to: { points: [715, 400, 400, 400] },
        startTime: 12000,
        endTime: 13000,
        easing: "easeInOut",
    },
    {
        elementId: "serverFinished",
        type: "move",
        from: { points: [715, 420, 715, 420] },
        to: { points: [715, 420, 400, 420] },
        startTime: 13000,
        endTime: 14000,
        easing: "easeInOut",
    },

    // Session Key Animation
    {
        elementId: "sessionKeyClient",
        type: "opacityChange",
        from: { opacity: 0 },
        to: { opacity: 1 },
        startTime: 14500,
        endTime: 15000,
        easing: "easeIn",
    },
    {
        elementId: "encryptedSessionKeyClient",
        type: "opacityChange",
        from: { opacity: 0 },
        to: { opacity: 1 },
        startTime: 15000,
        endTime: 15500,
        easing: "easeIn",
    },
    {
        elementId: "encryptedSessionKeyServer",
        type: "opacityChange",
        from: { opacity: 0 },
        to: { opacity: 1 },
        startTime: 15500,
        endTime: 16000,
        easing: "easeIn",
    },
    {
        elementId: "sessionKeyServer",
        type: "opacityChange",
        from: { opacity: 0 },
        to: { opacity: 1 },
        startTime: 16000,
        endTime: 16500,
        easing: "easeIn",
    },

    // Highlight Asymmetric Encryption
    {
        elementId: "asymmetricEncryption",
        type: "colorChange",
        from: { color: "#4CAF50" },
        to: { color: "#FF5722" },
        startTime: 16500,
        endTime: 17000,
        easing: "easeInOut",
    },
    {
        elementId: "asymmetricEncryption",
        type: "colorChange",
        from: { color: "#FF5722" },
        to: { color: "#4CAF50" },
        startTime: 17500,
        endTime: 18000,
        easing: "easeInOut",
    },
];
\`\`\`


INPUT:
${message}

OUTPUT:`,
		parameters: {
			decoding_method: "greedy",
			max_new_tokens: 1000,
			min_new_tokens: 0,
			stop_sequences: [],
			repetition_penalty: 1
		},
		model_id: "ibm/granite-20b-code-instruct",
		project_id: "5b52165b-bda4-4880-8178-3b2fb9f5289f"
	};

	const response = await fetch(url, {
		headers,
		method: "POST",
		body: JSON.stringify(body)
	});

	if (!response.ok) {
		throw new Error("Non-200 response");
	}

	return await response.json();
}