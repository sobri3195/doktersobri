export const STORAGE_VERSION=1;

export function readStorage(key,defaultValue,validate=()=>true){
 try{
  const raw=localStorage.getItem(key);
  if(raw===null)return defaultValue;
  const parsed=JSON.parse(raw);
  // Data lama (array/string langsung) tetap dapat dimigrasikan tanpa membuat app gagal.
  const value=parsed?.version===STORAGE_VERSION&&Object.hasOwn(parsed,'value')?parsed.value:parsed;
  return validate(value)?value:defaultValue;
 }catch{
  return defaultValue;
 }
}

export function writeStorage(key,value){
 try{localStorage.setItem(key,JSON.stringify({version:STORAGE_VERSION,value}));return true}catch{return false}
}

export const isStringArray=value=>Array.isArray(value)&&value.every(item=>typeof item==='string');
export const isHistory=value=>Array.isArray(value)&&value.every(item=>item&&typeof item.name==='string'&&typeof item.result==='string');
