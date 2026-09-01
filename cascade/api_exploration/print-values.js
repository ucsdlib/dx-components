import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const staffEntries = JSON.parse(fs.readFileSync(path.join(__dirname,"one-time-staff-upload.json")),"utf-8")

const unitNames = new Set()

staffEntries.forEach(staff=>{
    unitNames.add(staff.AreaName)
})

for(const unit of unitNames){
    console.log(unit)
}