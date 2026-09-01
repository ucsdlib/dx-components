import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "one-time-staff-upload.json")),
    "utf-8",
);

const updatedEntries = data.map((staff) => {
    return {
        ...staff,
        AreaName: staff.AreaName.replaceAll(" ", "-").replace("&", "and").toLowerCase(),
        ADTitle: staff.ADTitle.replace("&", "and"),
    };
});

// const updatedEntries = [];
// let count = 0;
// for (const staff of data) {
//     if (count === 10) break;
//     updatedEntries.push({
//         ...staff,
//         AreaName: staff.AreaName.replaceAll(" ", "-").replace("&", "and").toLowerCase(),
//         ADTitle: staff.ADTitle.replace("&", "and"),
//         consultLink: "",
//     });
//     count++;
// }
const collator = new Intl.Collator("en");

updatedEntries.sort((a, b) => collator.compare(a.LastName, b.LastName));

fs.writeFileSync(
    path.join(__dirname, "one-time-staff-upload.json"),
    JSON.stringify(updatedEntries, null, 2),
);
