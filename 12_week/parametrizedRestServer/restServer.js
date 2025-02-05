"use strict";

const path = require("path");

const errorMessage = `
################################
Usage: node restServer <configFileName>

For example:
node restServer config.json
################################
`;

if (process.argv.length < 3) {
	console.log(errorMessage);
	process.exit(1);
} else {
	const [, , configFileName] = process.argv;
	try {
		const config = require(path.join(__dirname, configFileName));

		startServer(config);
	} catch (err) {
		console.log(`Config file '${configFileName}' was not found.`);
		console.error(err.message); // Log the error message for debugging
		process.exit(1);
	}
} //main program ends here

function startServer(config) {
	const express = require("express");
	const app = express();

	const cors = require("cors");

	console.log(config);

	const { port, host, engineFolder, storageEngine, allStoragesFolder, storage: storageConfig } = config;
	if (!port) console.error("Missing 'port' in configuration.");
	if (!host) console.error("Missing 'host' in configuration.");
	if (!engineFolder) console.error("Missing 'engineFolder' in configuration.");
	if (!storageEngine) console.error("Missing 'storageEngine' in configuration.");
	if (storageEngine && !storageEngine.folder) console.error("Missing 'storageEngine.folder' in configuration.");
	if (!allStoragesFolder) console.error("Missing 'allStoragesFolder' in configuration.");
	if (!storageConfig) console.error("Missing 'storage' in configuration.");
	if (storageConfig && !storageConfig.folder) console.error("Missing 'storage.folder' in configuration.");

	if (
		!port ||
		!host ||
		!engineFolder ||
		!storageEngine ||
		!storageEngine.folder ||
		!allStoragesFolder ||
		!storageConfig ||
		!storageConfig.folder
	) {
		console.error("Invalid configuration file. Please check the required fields.");
		process.exit(1);
	}

	const storageEnginePath = path.join(__dirname, config.engineFolder, config.storageEngine.folder);
	console.log(storageEnginePath);
	const dataStoragePath = path.join(storageEnginePath, config.storageEngine.dataStorageFile);
	console.log(dataStoragePath);
	const storagePath = path.join(__dirname, config.allStoragesFolder, config.storage.folder);
	console.log(storagePath);

	const Datastorage = require(dataStoragePath);
	const storage = new Datastorage(storagePath, config.storage.storageConfigFile);

	app.use(cors());
	app.use(express.json());

	app.get("/api", (req, res) => res.json(storage.RESOURCE));

	app.get(`/api/${storage.RESOURCE}`, (req, res) => storage.getAll().then((result) => res.json(result)));

	app.get(`/api/${storage.RESOURCE}/:id`, (req, res) =>
		storage.get(req.params.id).then((result) => res.json(result))
	);

	app.post(`/api/${storage.RESOURCE}`, (req, res) =>
		storage
			.insert(req.body)
			.then((result) => res.json(result))
			.catch((err) => res.json(err))
	);

	app.put(`/api/${storage.RESOURCE}`, (req, res) =>
		storage
			.update(req.body)
			.then((result) => res.json(result))
			.catch((err) => res.json(err))
	);

	app.get(`/api/${storage.RESOURCE}/keys`, (req, res) => storage.KEYS.then((result) => res.json(result)));

	app.delete(`/api/${storage.RESOURCE}/:id`, (req, res) =>
		storage
			.remove(req.params.id)
			.then((result) => res.json(result))
			.catch((err) => res.json(err))
	);

	app.get(`/api/${storage.RESOURCE}/keys`, (req, res) => storage.KEYS.then((result) => res.json(result)));
	app.all("*", (req, res) => res.json("not supported"));

	app.listen(port, host, () => console.log(`RestServer ${host}:${port} serving`));
}
