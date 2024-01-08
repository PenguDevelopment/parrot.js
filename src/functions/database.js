import Database from 'better-sqlite3';

class CustomDatabase {
    constructor(databasePath, logging) {
        const customLogger = logging ? console.log : () => {};
        this.db = new Database(databasePath, { verbose: (msg) => customLogger(msg) });
    }

    add(tableName, data) {
        const keys = Object.keys(data);
        const values = keys.map((key) => data[key]);
    
        const placeholders = keys.map(() => '?').join(', ');
        const columns = keys.join(', ');
    
        if (!this.tableExists(tableName)) {
            this.createTable(tableName, keys);
        }
    
        const stmt = this.db.prepare(`INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`);
        const result = stmt.run(values);
    
        return result.lastInsertRowid;
    }
    
    tableExists(tableName) {
        const stmt = this.db.prepare("SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name=?");
        const result = stmt.get(tableName);
    
        return result.count > 0;
    }

    delete(tableName, condition) {
        const keys = Object.keys(condition);
        const values = keys.map((key) => condition[key]);

        const placeholders = keys.map((key) => `${key} = ?`).join(' AND ');

        const stmt = this.db.prepare(`DELETE FROM ${tableName} WHERE ${placeholders}`);
        const result = stmt.run(values);

        return result.changes;
    }

    update(tableName, data, condition) {
        const setClause = Object.keys(data).map((key) => `${key} = ?`).join(', ');
        const values = [...Object.values(data), ...Object.values(condition)];

        const stmt = this.db.prepare(`UPDATE ${tableName} SET ${setClause} WHERE ${this.buildConditionClause(condition)}`);
        const result = stmt.run(values);

        return result.changes;
    }

    get(tableName, condition) {
        const stmt = this.db.prepare(`SELECT * FROM ${tableName} WHERE ${this.buildConditionClause(condition)}`);
        return stmt.get(Object.values(condition));
    }

    createTable(tableName, columns) {
        const stmt = this.db.prepare(`CREATE TABLE IF NOT EXISTS ${tableName} (${columns.join(', ')})`);
        stmt.run();
    }

    deleteTable(tableName) {
        const stmt = this.db.prepare(`DROP TABLE IF EXISTS ${tableName}`);
        stmt.run();
    }

    buildConditionClause(condition) {
        return Object.keys(condition).map((key) => `${key} = ?`).join(' AND ');
    }

    close() {
        this.db.close();
    }
}

export function handleDatabase(databaseValues) {
    const { path, logging } = databaseValues
    if (!path) {
        throw new Error('Database path is required');
    }
    const relativePath = path.replace(process.cwd(), '.');
    return new CustomDatabase(relativePath, logging);
}
