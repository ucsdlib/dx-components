import { configDotenv } from "dotenv";
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from "url";

configDotenv();

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const cascadeKey = process.env.CASCADE_API_KEY;
const assetReadUrl = 'https://ucsd.cascadecms.com/api/v1/read/page'

// The column order/headers for the final CSV file.
const CSV_COLUMNS = ['FirstName', 'LastName', 'EmployeeID', 'CmsID'];

// The structured data on each page is a nested tree of "nodes", not a flat
// object, e.g. asset.page.structuredData.structuredDataNodes -> [ { type: 'group',
// identifier: 'library-staff', structuredDataNodes: [ { identifier: 'FirstName', text: '...' }, ... ] } ]
// This helper walks that tree and returns the `text` value for a given identifier.
function findFieldText(nodes, identifier) {
    for (const node of nodes ?? []) {
        if (node.identifier === identifier && node.text !== undefined) {
            return node.text;
        }
        if (node.structuredDataNodes) {
            const found = findFieldText(node.structuredDataNodes, identifier);
            if (found !== undefined) return found;
        }
    }
    return undefined;
}

const readRes = await fetch(`https://ucsd.cascadecms.com/api/v1/read/folder/Library/_resources/lpw-data/structured-content/temp-staff`, {
    headers: { "Authorization": `Bearer ${cascadeKey}` }
});
const readData = await readRes.json();

const rows = [];

if (!readData.success) {
    console.log("Batch read error:", readData.message);
} else {
    for(const metadataChild of readData.asset.folder.children){
        const actualAsset = await fetch(`${assetReadUrl}/${metadataChild.id}`,{headers: {"Authorization":`Bearer ${cascadeKey}`}});
        const cmsAsset = await actualAsset.json();

        if (!cmsAsset.success) {
            console.log(`Skipping ${metadataChild.id}, read error:`, cmsAsset.message);
            continue;
        }

        const nodes = cmsAsset.asset.page.structuredData.structuredDataNodes[0].structuredDataNodes;
        rows.push({
            FirstName: findFieldText(nodes, 'FirstName'),
            LastName: findFieldText(nodes, 'LastName'),
            EmployeeID: findFieldText(nodes, 'EmployeeID'),
            CmsID: metadataChild.id
        });
    }

    const csvContent = toCsv(rows);
    const outputPath = path.join(__dirname, 'cms-staff.csv');
    fs.writeFileSync(outputPath, csvContent);
    console.log(`Wrote ${rows.length} rows to ${outputPath}`);
}

function toCsv(rows) {
    const escape = (value) => {
        const str = value == null ? '' : String(value);
        return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
    };
    const lines = [CSV_COLUMNS.join(',')];
    for (const row of rows) {
        lines.push(CSV_COLUMNS.map((col) => escape(row[col])).join(','));
    }
    return lines.join('\n');
}