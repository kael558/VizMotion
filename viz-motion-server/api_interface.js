const generateText = async (ACCESS_TOKEN, message) => {
	const url =
		"https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29";
	const headers = {
		Accept: "application/json",
		"Content-Type": "application/json",
		Authorization: `Bearer ${ACCESS_TOKEN}`,
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
Can you create a diagram explaining the watercycle?

EXAMPLE OUTPUT:
Sure thing! Here's the elements and animations showcasing the watercycle.

\`\`\`javascript
elements = [
	{
		id: "sky",
		type: "rect",
		x: 0,
		y: 0,
		width: 800,
		height: 300,
		color: "#87CEEB",
	},
	{
		id: "sun",
		type: "circle",
		x: 700,
		y: 80,
		radius: 50,
		color: "#FFD700",
	},
	{
		id: "cloud1",
		type: "image",
		src: "icons/cloud.png",
		x: 100,
		y: 50,
		width: 100,
		height: 60,
	},
	{
		id: "cloud2",
		type: "image",
		src: "icons/cloud.png",
		x: 500,
		y: 30,
		width: 120,
		height: 70,
	},
	{
		id: "mountain",
		type: "image",
		src: "icons/mountain.png",
		x: 100,
		y: 200,
		width: 300,
		height: 200,
	},
	{
		id: "ground",
		type: "rect",
		x: 0,
		y: 350,
		width: 800,
		height: 150,
		color: "#8B4513",
	},
	{
		id: "river",
		type: "image",
		src: "icons/river.png",
		x: 100,
		y: 350,
		width: 800,
		height: 150,
		

	},
	{
		id: "raindrops",
		type: "image",
		src: "icons/raindrops.png",
		x: 450,
		y: 150,
		width: 100,
		height: 100,
		opacity: 0,
	},
	{
		id: "evaporationArrows",
		type: "image",
		src: "icons/arrows-up.png",
		x: 600,
		y: 300,
		width: 100,
		height: 100,
		opacity: 0,
	},
	{
		id: "condensationText",
		type: "text",
		x: 300,
		y: 100,
		text: "Condensation",
		fontSize: 18,
		color: "#000000",
		opacity: 0,
	},
	{
		id: "precipitationText",
		type: "text",
		x: 500,
		y: 100,
		text: "Precipitation",
		fontSize: 18,
		color: "#000000",
		opacity: 0,
	},
	{
		id: "evaporationText",
		type: "text",
		x: 650,
		y: 250,
		text: "Evaporation",
		fontSize: 18,
		color: "#000000",
		opacity: 0,
	},
];

animations = [
	{
		id: "sunRotation",
		elementId: "sun",
		type: "rotate",
		from: { rotation: 0 },
		to: { rotation: 360 },
		startTime: 0,
		endTime: 10000,
		easing: "linear",
		loop: true,
	},
	{
		id: "cloud1Movement",
		elementId: "cloud1",
		type: "translate",
		from: { x: 100, y: 50 },
		to: { x: 300, y: 50 },
		startTime: 0,
		endTime: 5000,
		easing: "easeInOut",
		loop: true,
	},
	{
		id: "cloud2Movement",
		elementId: "cloud2",
		type: "translate",
		from: { x: 500, y: 30 },
		to: { x: 300, y: 30 },
		startTime: 0,
		endTime: 6000,
		easing: "easeInOut",
		loop: true,
	},
	{
		id: "evaporationAppear",
		elementId: "evaporationArrows",
		type: "opacityChange",
		from: { opacity: 0 },
		to: { opacity: 1 },
		startTime: 1000,
		endTime: 2000,
		easing: "easeIn",
	},
	{
		id: "evaporationDisappear",
		elementId: "evaporationArrows",
		type: "opacityChange",
		from: { opacity: 1 },
		to: { opacity: 0 },
		startTime: 3000,
		endTime: 4000,
		easing: "easeOut",
	},
	{
		id: "rainAppear",
		elementId: "raindrops",
		type: "opacityChange",
		from: { opacity: 0 },
		to: { opacity: 1 },
		startTime: 5000,
		endTime: 6000,
		easing: "easeIn",
	},
	{
		id: "rainDisappear",
		elementId: "raindrops",
		type: "opacityChange",
		from: { opacity: 1 },
		to: { opacity: 0 },
		startTime: 7000,
		endTime: 8000,
		easing: "easeOut",
	},
	{
		id: "condensationTextAppear",
		elementId: "condensationText",
		type: "opacityChange",
		from: { opacity: 0 },
		to: { opacity: 1 },
		startTime: 2000,
		endTime: 3000,
		easing: "easeIn",
	},
	{
		id: "precipitationTextAppear",
		elementId: "precipitationText",
		type: "opacityChange",
		from: { opacity: 0 },
		to: { opacity: 1 },
		startTime: 5000,
		endTime: 6000,
		easing: "easeIn",
	},
	{
		id: "evaporationTextAppear",
		elementId: "evaporationText",
		type: "opacityChange",
		from: { opacity: 0 },
		to: { opacity: 1 },
		startTime: 1000,
		endTime: 2000,
		easing: "easeIn",
	},
];
\`\`\`


INPUT:
${message}

OUTPUT:`,
		parameters: {
			decoding_method: "greedy",
			max_new_tokens: 4096,
			min_new_tokens: 0,
			stop_sequences: [],
			repetition_penalty: 1,
            stop_sequences: ["INPUT"],
		},
		model_id: "ibm/granite-34b-code-instruct",
		project_id: "5b52165b-bda4-4880-8178-3b2fb9f5289f",

	};

	const response = await fetch(url, {
		headers,
		method: "POST",
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		throw new Error("Non-200 response");
	}

	return await response.json();
};

module.exports = { generateText };
