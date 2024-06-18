const IS_DEV_ENVIRONMENT = false;
const PROD_ORIGIN = "https://thehamester.github.io/";
const DEV_ORIGIN = "http://localhost:5500/";

function getURL(filePath) {
    return (IS_DEV_ENVIRONMENT ? DEV_ORIGIN : PROD_ORIGIN) + filePath;
}