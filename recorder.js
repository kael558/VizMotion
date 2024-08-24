let recordedChunks = [];

document.getElementById("playPauseBtn").addEventListener("click", () => {
	if (isRecording) {
		cancelAnimationFrame(animationFrameId);
		console.log("Stopping animation and MediaRecorder in 5 seconds");

		document.getElementById("playPauseBtn").textContent = "Play";
		isRecording = false;
		animation.stop();
		mediaRecorder.stop();
		console.log("Animation and MediaRecorder stopped");

		return;
	}

	console.log("Starting animation and MediaRecorder");

	//startTime = performance.now() - (cursor.offsetLeft / timeline.offsetWidth) * endDuration * 1000;

	document.getElementById("playPauseBtn").textContent = "Pause";

	recordedChunks = []; // Clear previous recordings
	isRecording = true;

	let stream;
	try {
		recordingCanvas = document.createElement("canvas");
		recordingCanvas.width = stage.width();
		recordingCanvas.height = stage.height();
		recordingContext = recordingCanvas.getContext("2d");

		stream = recordingCanvas.captureStream(30);
		//stream = canvas.captureStream(30); // 30 FPS
		console.log("Stream created:", stream);
	} catch (error) {
		console.error("Error creating stream:", error);
		return;
	}

	const options = { mimeType: "video/webm; codecs=vp9" };
	if (!MediaRecorder.isTypeSupported(options.mimeType)) {
		console.warn(`${options.mimeType} is not supported, trying "video/webm"`);
		options.mimeType = "video/webm";
	}

	try {
		mediaRecorder = new MediaRecorder(stream, options);
		console.log("MediaRecorder created:", mediaRecorder);
	} catch (error) {
		console.error("Error creating MediaRecorder:", error);
		return;
	}

	mediaRecorder.ondataavailable = (event) => {
		console.log("Data available event:", event);
		if (event.data.size > 0) {
			recordedChunks.push(event.data);
			console.log("Chunk added, total chunks:", recordedChunks.length);
		}
	};

	mediaRecorder.start(1000);
	console.log("MediaRecorder started");

	animation = new Konva.Animation(animate, layer);
	animation.start();
});
document.getElementById("downloadBtn").addEventListener("click", async () => {
	if (recordedChunks.length === 0) {
		console.error("No data recorded");
		return;
	}

	console.log("Creating blob from", recordedChunks.length, "chunks");
	const originalBlob = new Blob(recordedChunks, { type: "video/webm" });
	console.log("Original Blob created:", originalBlob);

	// Convert Blob to ArrayBuffer
	const arrayBuffer = await originalBlob.arrayBuffer();

	// Modify the duration in the WebM container
	const view = new DataView(arrayBuffer);

	const duration = endDuration; // Keep duration in seconds

	// Find the Duration element in the WebM container
	let pos = 0;
	while (pos < view.byteLength - 12) {
		if (view.getUint32(pos) === 0x4489 && view.getUint32(pos + 4) === 0x4444) {
			view.setFloat64(pos + 8, duration, false); // false for big-endian
			break;
		}
		pos++;
	}

	// Create a new Blob with the modified data
	const modifiedBlob = new Blob([arrayBuffer], { type: "video/webm" });
	console.log("Modified Blob created:", modifiedBlob);
	console.log("Modified Blob size:", modifiedBlob.size, "bytes");

	const url = URL.createObjectURL(modifiedBlob);
	const a = document.createElement("a");
	document.body.appendChild(a);
	a.style = "display: none";
	a.href = url;
	a.download = "animation.webm";
	a.click();
	window.URL.revokeObjectURL(url);
	console.log("Download initiated");
});
