class IndexedDB {
    constructor(databaseName, stores, target) {
        this.databaseName = databaseName;
        this.stores = stores;
        this.target = target;
    }

    async connect() {
        if (this.database) return this.database;
        const request = indexedDB.open(this.databaseName);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            for (const store of this.stores) {
                if (!db.objectStoreNames.contains(store.name)) {
                    db.createObjectStore(store.name, {
                        keyPath: store.keyPath,
                    });
                }
            }
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
        const transaction = db.transaction(this.target, "readwrite");
        const store = transaction.objectStore(this.target);

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
        const transaction = db.transaction(this.target, "readwrite");
        const store = transaction.objectStore(this.target);

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
        const transaction = db.transaction(this.target, "readwrite");
        const store = transaction.objectStore(this.target);

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
        const transaction = db.transaction(this.target, "readwrite");
        const store = transaction.objectStore(this.target);

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
        const transaction = db.transaction(this.target, "readonly");
        const store = transaction.objectStore(this.target);

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
        const transaction = db.transaction(this.target, "readonly");
        const store = transaction.objectStore(this.target);

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
        const transaction = db.transaction(this.target, "readwrite");
        const store = transaction.objectStore(this.target);

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

const stores = [
    { name: "cart", keyPath: "product" },
    { name: "wish_list", keyPath: "product" },
];
export const CartDB = new IndexedDB("ShinPay", stores, "cart");
export const WishListDB = new IndexedDB("ShinPay", stores, "wish_list");
