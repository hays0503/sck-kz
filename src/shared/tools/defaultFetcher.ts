const defaultFetcher = async (url: string|null, options?: RequestInit) => {
    if(!url) return null;
    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    } catch (err) {
        console.log(`${url} => ${err}`);
        throw err;
    }
};

export default defaultFetcher;