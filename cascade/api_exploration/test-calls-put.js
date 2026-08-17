import { configDotenv } from "dotenv";
configDotenv();

const cascadeKey = process.env.CASCADE_API_KEY;
const assetId = "1159296a0a00009534f75c904c845fb1"
const baseUrl = "https://ucsd.cascadecms.com/api/v1/edit";

// 1. Read the existing asset first
const readRes = await fetch(`https://ucsd.cascadecms.com/api/v1/read/page/${assetId}`, {
    headers: { "Authorization": `Bearer ${cascadeKey}` }
});
const readData = await readRes.json();

if (!readData.success) {
    console.log("Read error:", readData.message);
} else {
    // 2. Modify the fields you want to change
    const asset = readData.asset;
    const nodes = asset.page.structuredData.structuredDataNodes[0].structuredDataNodes;
    const emailNode = nodes.find(n => n.identifier === "Email");
    if (emailNode) emailNode.text = "eggsAndHam@ucsd.edu";

    // 3. Send the whole asset back via edit
    const editRes = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${cascadeKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ asset })
    });
    const editData = await editRes.json();

    if (editData.success) {
        console.log("Updated successfully");
    } else {
        console.log("Edit error:", editData.message);
    }
}