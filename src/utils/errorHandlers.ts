export const returnErrorMessage = (message:string,errorCode:number=500,body={}) => ({body,errorCode,message:message});
