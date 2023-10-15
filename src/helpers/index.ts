import crypto from 'crypto';
import path from "path";
import fs from 'fs';
import { addMonths , differenceInMonths, format, startOfMonth } from 'date-fns';

const currentDir = process.cwd();

const SECRET = 'RENT_MGR';

export const authentification = (salt: string, password: string): string => {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

export const random = () => crypto.randomBytes(128).toString('base64');

const readHTMLFile = (filePath : string)=> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, content) => {
      if (err) {
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
}

export const generateHTML = async (fileName : string,data: Record<string, any>) => {

  const bodyPath = path.resolve(currentDir + '/src/pages', fileName);
  let bodyHTML: string = (await readHTMLFile(bodyPath)).toString();
  
  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      
      const replaceVariable : string = '${' + prop + '}';
      const replaceValue : string = data[prop];
      if(bodyHTML.includes(replaceVariable)){
        console.log(replaceVariable, data[prop] );
        
      }
      
      bodyHTML = bodyHTML.replace(replaceVariable, replaceValue);
    }
    // console.log(bodyHTML);
  }

  return bodyHTML; 
}

export const getDatePayInfo = ()=>{
  const dateNow = new Date();

  const datePaiementLoyer = addMonths(startOfMonth(dateNow), 1);

  const dateQuittance = startOfMonth(dateNow);

  // Formattage de la date de quittance
  const dateQuittanceFormatee = format(dateQuittance, 'yyyy-MM-dd');

  // Formattage de la date de paiement
  const datePaiementFormatee = format(datePaiementLoyer, 'yyyy-MM-dd');

  // Calculer le mois de location
  const moisLocation = format(datePaiementLoyer, 'MMMM yyyy');

  return {
    dateQuittance: dateQuittanceFormatee,
    datePaiement: datePaiementFormatee,
    moisLocation: moisLocation,
  };
}

