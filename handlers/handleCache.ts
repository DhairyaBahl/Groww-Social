export function handleCache() {
    const setCache = ({key, value, expiration}: any) => {
        const data = {
            value,
            expiration: Date.now() + expiration * 1000,
        };
        localStorage.setItem(key, JSON.stringify(data));
    };

    const getCache = (key: any) => {
        const stringData = localStorage.getItem(key);
        if (!stringData) {
            return null;
        }

        const data = JSON.parse(stringData);

        if(data.expiration < Date.now()) {
            localStorage.removeItem(key);
            return null;
        }

        return data.value;
    };

    const clearCache = (key: any) => {
        localStorage.removeItem(key);
    }

    return {
        setCache,
        getCache,
        clearCache,
    }
}