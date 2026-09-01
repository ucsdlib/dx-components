import { configDotenv } from "dotenv";
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const data = JSON.parse(fs.readFileSync(path.join(__dirname,'one-time-staff-upload.json')),'utf-8');

configDotenv();

const cascadeKey = process.env.CASCADE_API_KEY;

const baseUrl = "https://ucsd.cascadecms.com/api/v1/create";

data.forEach(entry => assetPost(entry))


async function assetPost(entry){
    const payload = {
        asset: {
            page: {
                name: `${entry.LastName.toLowerCase().replaceAll(" ","-")}-${entry.FirstName.toLowerCase().replaceAll(" ","-")}`,
                parentFolderPath: "/_resources/lpw-data/structured-content/temp-staff",
                siteName: "Library",
                contentTypeId: "113ca7310a00009534f75c901bb601fb",
                contentTypePath: "library-staff",
                structuredData: {
                    structuredDataNodes: [
                        {
                            type: "group",
                            identifier: "library-staff",
                            structuredDataNodes: [
                                {
                                    type: "text",
                                    identifier: "FirstName",
                                    text: `${entry.FirstName}`,
                                    recycled: false,
                                },
                                {
                                    type: "text",
                                    identifier: "LastName",
                                    text: `${entry.LastName}`,
                                    recycled: false,
                                },
                                {
                                    type: "text",
                                    identifier: "ADTitle",
                                    text: `${entry.ADTitle}`,
                                    recycled: false,
                                },
                                {
                                    type: "text",
                                    identifier: "AreaName",
                                    text: `${entry.AreaName}`,
                                    recycled: false,
                                },
                                {
                                    type: "text",
                                    identifier: "ConsultLink",
                                    text: `${entry.ConsultLink}`,
                                    recycled: false,
                                },
                                {
                                    type: "text",
                                    identifier: "Email",
                                    text: `${entry.Email}`,
                                    recycled: false,
                                },
                                {
                                    type: "text",
                                    identifier: "PreferredPronouns",
                                    text: "",
                                    recycled: false,
                                },
                                {
                                    type: "text",
                                    identifier: "EmployeeID",
                                    text: `${entry.EmployeeID}`,
                                    recycled: false,
                                },
                            ],
                            recycled: false,
                        },
                    ],
                },
                "shouldBePublished": false,
                "shouldBeIndexed": true,
                metadata: {
                    title: `${entry.FirstName} ${entry.LastName}`
                },
            },
        },
    };
    const data = await fetch(baseUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${cascadeKey}`,
            "Content-Type": "application-json",
        },
        body: JSON.stringify(payload),
    });
    const response = await data.json();
    
    console.log(response.success);
}

