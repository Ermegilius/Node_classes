import path from "node:path";

function createPaths(ROOT, storageEngineFolder, storageFolder, storageConfig) {
	return {
		ROOT,
		databaseFilePath: path.join(storageEngineFolder, storageConfig.databaseFile),
		sqlStatementsPath: path.join(storageFolder, storageConfig.sqlStatements),
		parameterFunctionsPath: path.join(storageFolder, storageConfig.parameterFunctions),
		adapterPath: path.join(storageFolder, storageConfig.adapterFile),
	};
}

export { createPaths };
