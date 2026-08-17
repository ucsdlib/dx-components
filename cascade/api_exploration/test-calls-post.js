import { configDotenv } from "dotenv";
configDotenv();

const cascadeKey = process.env.CASCADE_API_KEY;

const baseUrl = "https://ucsd.cascadecms.com/api/v1/create";

const payload = {
    asset: {
        page: {
            name: "jane-doe",
            parentFolderPath: "/__dev/cl-dev/test-staff",
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
                                text: "Jane",
                                recycled: false,
                            },
                            {
                                type: "text",
                                identifier: "LastName",
                                text: "Doe",
                                recycled: false,
                            },
                            {
                                type: "text",
                                identifier: "ADTitle",
                                text: "Reference Librarian",
                                recycled: false,
                            },
                            {
                                type: "text",
                                identifier: "AreaName",
                                text: "Research Services",
                                recycled: false,
                            },
                            {
                                type: "text",
                                identifier: "ConsultLink",
                                text: "https://library.ucsd.edu/consult/jane-doe",
                                recycled: false,
                            },
                            {
                                type: "text",
                                identifier: "Email",
                                text: "jdoe@ucsd.edu",
                                recycled: false,
                            },
                            {
                                type: "text",
                                identifier: "PreferredPronouns",
                                text: "she/her",
                                recycled: false,
                            },
                        ],
                        recycled: false,
                    },
                ],
            },
            metadata: {
                title: "Jane Doe",
            },
        },
    },
};

const data = await fetch(baseUrl, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${cascadeKey}`,
        "Content-Type": "application-json",
    },body: JSON.stringify(payload)
});
const response = await data.json();

console.log(response.success)
