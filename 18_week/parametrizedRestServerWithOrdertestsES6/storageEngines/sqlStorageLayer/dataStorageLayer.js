"use strict";
const path = require("path");
const { CODES, TYPES, MESSAGES } = require("./statuscodes");

let SqlParams;

//Datastorage class

module.exports = class Datastorage {
	#storage;
	#getAllSql;
	#getOneSql;
	#insertSql;
	#updateSql;
	#removeSql;
	#search;
	#adapt;

	#primary_key;
	#resource;

	constructor(storageFolder, storageConfigFile) {
		const storageConfig = require(path.join(storageFolder, storageConfigFile));

		const Database = require(path.join(__dirname, storageConfig.databaseFile));
		this.#storage = new Database(storageConfig.options);
		this.#adapt = require(path.join(storageFolder, storageConfig.adapterFile));

		const sql = require(path.join(storageFolder, storageConfig.sqlStatements));
		SqlParams = require(path.join(storageFolder, storageConfig.parameterFunctions));

		this.#getAllSql = sql.getAll.join(" ");
		this.#getOneSql = sql.getOne.join(" ");
		this.#insertSql = sql.insert.join(" ");
		this.#updateSql = sql.update.join(" ");
		this.#removeSql = sql.remove.join(" ");

		this.#search = sql.search;

		this.#primary_key = sql.primary_key;
		this.#resource = sql.resource;
	}

	//getters
	get RESOURCE() {
		return this.#resource;
	}
	get CODES() {
		return CODES;
	}

	get TYPES() {
		return TYPES;
	}

	get PRIMARY_KEY() {
		return this.#primary_key;
	}

	get KEYS() {
		return Promise.resolve(Object.keys(this.#search));
	}

	async getAll() {
		try {
			const result = await this.#storage.doQuery(this.#getAllSql);
			return Promise.resolve(result.queryResult.map((item) => this.#adapt(item)));
		} catch (error) {
			console.log(error);
			return Promise.resolve([]);
		}
	}

	async get(value, key = this.PRIMARY_KEY) {
		// or this.#primary_key
		// const keys = await this.KEYS;
		// if(!keys.includes(key)){

		if (!(await this.KEYS).includes(key)) {
			return Promise.resolve([]);
		}
		try {
			const sql = this.#search[key].join(" ");
			const result = await this.#storage.doQuery(sql, [value]);
			return Promise.resolve(result.queryResult.map((item) => this.#adapt(item)));
		} catch (error) {
			console.log(error);
			return Promise.resolve([]);
		}
	}

	async insert(item) {
		if (item) {
			if (!item[this.PRIMARY_KEY]) {
				return Promise.reject(MESSAGES.NOT_INSERTED());
			}
			try {
				const result = await this.#storage.doQuery(this.#getOneSql, item[this.PRIMARY_KEY]);
				if (result.queryResult.length > 0) {
					return Promise.reject(MESSAGES.ALLREADY_IN_USE(item[this.PRIMARY_KEY]));
				}
				const status = await this.#storage.doQuery(this.#insertSql, SqlParams.insert(item));
				if (status.queryResult.rowsChanged > 0) {
					return Promise.resolve(MESSAGES.INSERT_OK(this.PRIMARY_KEY, item[this.PRIMARY_KEY]));
				}
			} catch (error) {
				return Promise.reject(MESSAGES.NOT_INSERTED());
			}
		} else {
			return Promise.reject(MESSAGES.NOT_INSERTED());
		}
	} // end of insert

	async update(item) {
		//TODO: make it work.
		if (item) {
			if (!item[this.PRIMARY_KEY]) {
				return Promise.reject(MESSAGES.NOT_UPDATED());
			}
			try {
				const result = await this.#storage.doQuery(this.#getOneSql, item[this.PRIMARY_KEY]);
				if (result.queryResult.length > 0) {
					//Update:
					const upStat = await this.#storage.doQuery(this.#updateSql, SqlParams.update(item));
					if (upStat.queryResult.rowsChanged > 0) {
						return Promise.resolve(MESSAGES.UPDATE_OK(this.PRIMARY_KEY, item[this.PRIMARY_KEY]));
					} else {
						return Promise.resolve(MESSAGES.UPDATE_OK(this.PRIMARY_KEY, item[this.PRIMARY_KEY]));
					}
				} else {
					//Insert:
					try {
						const status = await this.#storage.doQuery(this.#insertSql, SqlParams.insert(item));
						if (status.queryResult.rowsChanged > 0) {
							return Promise.resolve(MESSAGES.INSERT_OK(this.PRIMARY_KEY, item[this.PRIMARY_KEY]));
						} else {
							return Promise.reject(MESSAGES.NOT_INSERTED());
						}
					} catch (error) {
						return Promise.reject(MESSAGES.NOT_INSERTED());
					}
				}
			} catch (error) {
				return Promise.reject(MESSAGES.NOT_UPDATED());
			}
		} else {
			return Promise.reject(MESSAGES.NOT_UPDATED());
		}
	}

	async remove(value) {
		if (!value) {
			return Promise.reject(MESSAGES.NOT_FOUND(this.PRIMARY_KEY, "--empty--"));
		}
		try {
			const result = await this.#storage.doQuery(this.#removeSql, value);
			if (result.queryResult.rowsChanged > 0) {
				return Promise.resolve(MESSAGES.REMOVE_OK(this.PRIMARY_KEY, value));
			}
			return Promise.reject(MESSAGES.NOT_REMOVED(this.PRIMARY_KEY, value));
		} catch (error) {
			return Promise.reject(MESSAGES.NOT_REMOVED(this.PRIMARY_KEY, value));
		}
	}
}; //end of class
