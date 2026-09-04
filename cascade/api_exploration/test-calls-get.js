import { configDotenv } from "dotenv";
configDotenv();

const cascadeKey = process.env.CASCADE_API_KEY;
const assetId = "2570987b0a0000953be115e104e95930"
const baseUrl = "https://ucsd.cascadecms.com/api/v1/edit";

// 1. Read the existing asset first
const readRes = await fetch(`https://ucsd.cascadecms.com/api/v1/read/page/${assetId}`, {
    headers: { "Authorization": `Bearer ${cascadeKey}` }
});
const readData = await readRes.json();

if (!readData.success) {
    console.log("Read error:", readData.message);
}else{
    console.log(JSON.stringify(readData.asset, null, 4))
}