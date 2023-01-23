import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


export default function downloadData(magId, date) {
    let headerFilePath;
    console.log(magId, date);
    if (date === '-1') {
        headerFilePath = path.join(__dirname, '..', 'latestPniFiles', `pni_${magId}` + '.txt');        
    }
    else {
        headerFilePath = path.join(__dirname, '..', `pni_${magId}`, date + '.txt');
    }
    return headerFilePath;
}