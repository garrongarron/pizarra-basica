class LocalStorage
{
    getLocal(key, defaultValue){
        return JSON.parse(localStorage.getItem(key))  || defaultValue || {}
    }

    setLocal(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }
}

const Storage = new LocalStorage();
export default Storage;
console.log('LocalStorage Loaded')