import { configDotenv } from "dotenv";
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from "url";
configDotenv();

// global variables needed
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const staffDataSource = JSON.parse(fs.readFileSync(path.join(__dirname,'one-time-staff-upload.json')),'utf-8') // data from source of truth service-desk tool manually copied onto disk
const cascadeKey = process.env.CASCADE_API_KEY;
const assetReadUrl = 'https://ucsd.cascadecms.com/api/v1/read/page'
const editUrl = "https://ucsd.cascadecms.com/api/v1/edit";

// Batch read all staff assets at cms directory (doesn't return structured data of assets, only metadata)
const readRes = await fetch(`https://ucsd.cascadecms.com/api/v1/read/folder/Library/_resources/lpw-data/structured-content/temp-staff`, {
    headers: { "Authorization": `Bearer ${cascadeKey}` }
});
const readData = await readRes.json();


if (!readData.success) {
    console.log("Batch read error:", readData.message);
} else {
    // ids from batch read metadata to edit each asset by cms id
    for(const metadataChild of readData.asset.folder.children){
        const actualAsset = await fetch(`${assetReadUrl}/${metadataChild.id}`,{headers: {"Authorization":`Bearer ${cascadeKey}`}});
        const cmsAsset = await actualAsset.json();
        const nodes = cmsAsset.asset.page.structuredData.structuredDataNodes[0].structuredDataNodes;
        // find cms asset's EmployeeID to match service-desk staff's EmployeeID
        const idNode = nodes.find(n => n.identifier === "EmployeeID");
        const StaffPrime = staffDataSource.find(staff => staff.EmployeeID === Number(idNode.text));
        if (!StaffPrime) throw new Error("Staff not found in service desk source")
        // At match update all cms fields with service-desk staff fields
        nodes.forEach(node =>{
            node.text = String(StaffPrime[node.identifier])
        })
        // Not needed for routine updates 
        /*cmsAsset.asset.page.metadata.displayName = `${StaffPrime.FirstName} ${StaffPrime.LastName}`
        cmsAsset.asset.page.metadata.title = `${StaffPrime.FirstName} ${StaffPrime.LastName}`
        cmsAsset.asset.page.metadata.summary = "..."
        cmsAsset.asset.page.metadata.author = "CLL"*/
        
        // Edit Operation/Cascade API Edit Endpoint
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