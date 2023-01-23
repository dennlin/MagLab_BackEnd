import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default function readSummaryData() {
    let summaryFolderPath = path.join(__dirname, '..', 'latestPniFiles');
    return readAllData(summaryFolderPath);
}

// path MUST BE FULL PATH (e.g. ../path/directory)
export function readAllData(fullPath) {
    try {
        let allData = [];
        let files = fs.readdirSync(fullPath);
        files.forEach(file => {
            let filePath = fullPath + '/' + file;
            let fileData = parseData(readFile(filePath));
            allData.push(fileData);
        })
        return allData;
    }
    catch (error) {
        throw Error("Read all data function has failed!")
    }
}

//Expect the directory holding PNI file data is named pni_[sensorId]
export function readOneData(sensorId) {
    //Date, value
    try {
        let oneMagFolderPath = path.join(__dirname, '..', `pni_${sensorId}`);
        return readAllData(oneMagFolderPath);
    } catch (error) {
        throw Error("Folder path not valid");
    }
}

//@param - list of alternating dates values
// function pairDateVal(valueData, datesData) {
//     let formattedData = [];
//     let i = 0;
//     if (valueData.length !== datesData.length) {
//         console.log(valueData.length, datesData.length);
//         throw Error("data and datesData aren't the same length");
//     }
//     while (i < valueData.length) {
//         formattedData.push({ "date": datesData[i], "value": valueData[i] });
//     }
//     return formattedData;
// }

function readFile(filePath) {
    //Need to by synchronous API call to ensure JSON being returned is available
    const data = fs.readFileSync(filePath, 'utf8');
    return data;
}

const translator = {
    "user_id": "id",
    "user_name": "username",
    "datetime": "datetime",
    "duration": "duration",
    "lat": "lat",
    "long": "long",
    "pniFilename": "pniFilename",
    "gpsFilename": "gpsFilename",
}

function fileSize(fileName) {
    let pniDataFilePath = path.join(__dirname, '..', 'testPniFiles', fileName);
    var stats = fs.statSync(pniDataFilePath);
    var fileSizeInBytes = stats.size;
    return fileSizeInBytes.toString();
}

//@param data: string
function parseData(data) {
    let dataSplit = data.split("\n");
    let jsonData = {};
    dataSplit.forEach(attribute => {
        let attributeList = attribute.split("=");
        let value = attributeList[1];
        if (translator[attributeList[0]] === "pniFilename") {
            value = fileSize(attributeList[1]);
        }
        jsonData[translator[attributeList[0]]] = value;
    });
    return jsonData;
}