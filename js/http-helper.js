function getURL(filePath) {
    return (IS_DEV_ENVIRONMENT ? DEV_ORIGIN : PROD_ORIGIN) + filePath;
}

async function fetchJSON(filePath) {
    return await fetch(getURL(filePath)).then(async (res) => await res.json());
}