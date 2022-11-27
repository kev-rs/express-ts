import { Router } from "express";
import { readdirSync } from 'fs';

const PATH_ROUTER = `${__dirname}`

const router = Router();

const cleanFileName = (fileName: string) => fileName.split('.').shift();

readdirSync(PATH_ROUTER).forEach(async (fileName) => {
  const route = cleanFileName(fileName);
  if(route !== 'index') router.use(`/api/${route}`, await import(`./${fileName}`).then(route => route.router));
  // if(!fileName.includes('.')) {
  //   return readdirSync(PATH).forEach(file => {
  //     console.log({route: `/${fileName}/${cleanFileName(file)}`});
  //   })
  // }
})

export { router };
