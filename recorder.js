let mediaRecorder;
let recordedChunks = [];
let isRecording = false;
let recordingCanvas, recordingContext;

let animation;



document.getElementById("playPauseBtn").addEventListener("click", () => {
    if (isRecording){
    
        console.log("Stopping animation and MediaRecorder in 5 seconds");
       // setTimeout(() => {
            document.getElementById("playPauseBtn").textContent = "Play";
            isRecording = false;
            animation.stop();
            mediaRecorder.stop();
            console.log("Animation and MediaRecorder stopped");
            document.getElementById("downloadBtn").disabled = false;
        //}, 5000);
        return;
    }

    document.getElementById("playPauseBtn").textContent = "Pause";


    // Reset the animation state
    squares.forEach((square) => {
        square.width(0);
        square.height(0);
    });
    texts.forEach((text) => {
        text.opacity(0);
    });
    lines.forEach((line) => {
        const points = line.points();
        line.points([points[0], points[1], points[0], points[1]]);
    });

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
        console.warn(
            `${options.mimeType} is not supported, trying "video/webm"`
        );
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

document.getElementById("downloadBtn").addEventListener("click", () => {
    if (recordedChunks.length === 0) {
        console.error("No data recorded");
        return;
    }

    console.log("Creating blob from", recordedChunks.length, "chunks");
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    console.log("Blob created:", blob);

    console.log("Blob size:", blob.size, "bytes");

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "animation.webm";
    a.click();
    //window.URL.revokeObjectURL(url);
    //console.log("Download initiated");
});