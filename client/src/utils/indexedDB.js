class IndexedDB {
    constructor(databaseName, storeName, primaryKey) {
        this.databaseName = databaseName;
        this.storeName = storeName;
        this.primaryKey = primaryKey;
    }

    async connect() {
        if (this.database) return this.database;
        const request = indexedDB.open(this.databaseName);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore(this.storeName, { keyPath: this.primaryKey });
        };
        return new Promise((resolve, reject) => {
            request.onerror = (event) => {
                reject(event.target.error);
            };
            request.onsuccess = (event) => {
                this.database = event.target.result;
                resolve(this.database);
            };
        });
    }
    async insertOne(data) {
        const db = await this.connect();
        const transaction = db.transaction(this.storeName, "readwrite");
        const store = transaction.objectStore(this.storeName);

        store.add(data);

        return new Promise((resolve, reject) => {
            transaction.oncomplete = async () => {
                const data = await this.getAll();
                resolve(data);
            };
            transaction.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }
    async insertMany(data) {
        const db = await this.connect();
        const transaction = db.transaction(this.storeName, "readwrite");
        const store = transaction.objectStore(this.storeName);

        for (const item of data) {
            store.add(item);
        }
        return new Promise((resolve, reject) => {
            transaction.oncomplete = async () => {
                const data = await this.getAll();
                resolve(data);
            };
            transaction.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }
    async deleteOne(primaryKey) {
        const db = await this.connect();
        const transaction = db.transaction(this.storeName, "readwrite");
        const store = transaction.objectStore(this.storeName);

        store.delete(primaryKey);

        return new Promise((resolve, reject) => {
            transaction.oncomplete = async () => {
                const data = await this.getAll();
                resolve(data);
            };
            transaction.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }
    async deleteAll() {
        const db = await this.connect();
        const transaction = db.transaction(this.storeName, "readwrite");
        const store = transaction.objectStore(this.storeName);

        store.clear();

        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => {
                resolve([]);
            };
            transaction.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }
    async getOne(primaryKey) {
        const db = await this.connect();
        const transaction = db.transaction(this.storeName, "readonly");
        const store = transaction.objectStore(this.storeName);

        const request = store.get(primaryKey);

        return new Promise((resolve, reject) => {
            request.onsuccess = (event) => {
                resolve(request.result);
            };
            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }
    async getAll() {
        const db = await this.connect();
        const transaction = db.transaction(this.storeName, "readonly");
        const store = transaction.objectStore(this.storeName);

        const request = store.getAll();

        return new Promise((resolve, reject) => {
            request.onsuccess = (event) => {
                if (request.result.length === 0) resolve(null);
                resolve(request.result);
            };
            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }
    async updateOne(updates) {
        const db = await this.connect();
        const transaction = db.transaction(this.storeName, "readwrite");
        const store = transaction.objectStore(this.storeName);

        store.put(updates);

        return new Promise((resolve, reject) => {
            transaction.oncomplete = async () => {
                const data = await this.getAll();
                resolve(data);
            };
            transaction.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }
    async updateMany() {}
}

export const CartDB = new IndexedDB("ShinPay", "cart", "productId");
