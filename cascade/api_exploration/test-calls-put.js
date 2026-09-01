import { configDotenv } from "dotenv";
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from "url";
configDotenv();
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const staffDataSource = JSON.parse(fs.readFileSync(path.join(__dirname,'one-time-staff-upload.json')),'utf-8')
const cascadeKey = process.env.CASCADE_API_KEY;
const assetReadUrl = 'https://ucsd.cascadecms.com/api/v1/read/page'
const editUrl = "https://ucsd.cascadecms.com/api/v1/edit";

// 1. Read the existing asset first
// const readRes = await fetch(`https://ucsd.cascadecms.com/api/v1/read/page/${assetId}`, {
//     headers: { "Authorization": `Bearer ${cascadeKey}` }
// });
const readRes = await fetch(`https://ucsd.cascadecms.com/api/v1/read/folder/Library/_resources/lpw-data/structured-content/temp-staff`, {
    headers: { "Authorization": `Bearer ${cascadeKey}` }
});
const readData = await readRes.json();

if (!readData.success) {
    console.log("Batch read error:", readData.message);
} else {
    for(const metadataChild of readData.asset.folder.children){
        const actualAsset = await fetch(`${assetReadUrl}/${metadataChild.id}`,{headers: {"Authorization":`Bearer ${cascadeKey}`}});
        const cmsAsset = await actualAsset.json();
        const nodes = cmsAsset.asset.page.structuredData.structuredDataNodes[0].structuredDataNodes;
        const idNode = nodes.find(n => n.identifier === "EmployeeID");
        const StaffPrime = staffDataSource.find(staff => staff.EmployeeID === Number(idNode.text));
        if (!StaffPrime) throw new Error("Staff not found in service desk source")
        // 3. Send the whole asset back via edit
        nodes.forEach(node =>{
            node.text = String(StaffPrime[node.identifier])
        })
        cmsAsset.asset.page.metadata.displayName = `${StaffPrime.FirstName} ${StaffPrime.LastName}`
        cmsAsset.asset.page.metadata.title = `${StaffPrime.FirstName} ${StaffPrime.LastName}`
        cmsAsset.asset.page.metadata.summary = "..."
        cmsAsset.asset.page.metadata.author = "CLL"
        const editRes = await fetch(editUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${cascadeKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cmsAsset)
        });
        const editData = await editRes.json();
    
        if (editData.success) {
            console.log("Updated successfully");
        } else {
            console.log("Edit error:", editData.message);
        }
    }
}