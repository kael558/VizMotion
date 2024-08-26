//import { Pinecone } from '@pinecone-database/pinecone';
const { Pinecone } = require("@pinecone-database/pinecone");

/*
const fs = require("fs");
const path = require("path");
*/

/*(async () => {
    await pc.createIndex({
        name: 'images',
        dimension: 384, // Replace with your model dimensions
        metric: 'cosine', // Replace with your model metric
        spec: { 
            serverless: { 
                cloud: 'aws', 
                region: 'us-east-1' 
            }
        } 
    });
})();*/

const pc = new Pinecone({
	apiKey: process.env.PINECONE_API_KEY
});
const index = pc.index("images");

async function embed(text) {
	const url = "https://api.cohere.com/v1/embed";

	const payload = {
		texts: Array.isArray(text) ? text : [text],
		model: "embed-english-light-v3.0",
		input_type: "search_query",
	};

	const headers = new Headers({
		"Content-Type": "application/json",
		Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
		Accept: "application/json",
	});

	const options = {
		method: "POST",
		headers: headers,
		body: JSON.stringify(payload),
	};

	try {
		const response = await fetch(url, options);
	
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data.embeddings;
	} catch (error) {
		console.error("Error getting embeddings:", error);
		throw error; // Re-throw the error for better error handling
	}
}

async function search(text) {
    const embeddings = await embed(text);

    const embedding = embeddings[0];

    const results = await index.query({
       vector: embedding,
       topK: 1,
       includeMetadata: true,

    });

    return results;
}

module.exports = { search };


/*

search("cat").then((results) => {
    console.log("Search results:", JSON.stringify(results, null, 2));
});


function getBrandFilenames() {
	const directoryPath = path.join(__dirname, "brands");

	return new Promise((resolve, reject) => {
		fs.readdir(directoryPath, (err, files) => {
			if (err) {
				console.error("Error reading directory:", err);
				return reject(err);
			}
			resolve(files);
		});
	});
}

(async () => {
	const BATCH_SIZE = 96;
	let filenames = await getBrandFilenames();

	for (let i = 0; i < filenames.length; i += BATCH_SIZE) {
		// Get the next batch of filenames
		let batchFilenames = filenames.slice(i, i + BATCH_SIZE);

		const batchFilenames_ = batchFilenames.map(
			(filename) => filename.split(".")[0]
		);
		console.log(
			`Processing batch ${i / BATCH_SIZE + 1}, size: ${batchFilenames.length}`
		);

		let batchEmbeddings = await embed(batchFilenames_);

		console.log("Batch embeddings:", batchEmbeddings);

		// Convert to array of objects
		let embeddingsObjects = batchFilenames_.map((filename, j) => ({
			id: `${i + j}`,
			values: batchEmbeddings[j],
			metadata: {
				filename: batchFilenames[j],
			},
		}));

		console.log("Embeddings objects:", embeddingsObjects);

		// Upsert the batch
		await index.upsert(embeddingsObjects);

		console.log(`Batch ${i / BATCH_SIZE + 1} upserted`);
	}
})();
*/