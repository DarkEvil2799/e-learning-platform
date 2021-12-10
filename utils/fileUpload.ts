import axios from 'axios';
import { API_UPLOAD_URL } from './constants';

export const uploadFile = async (file: any, dir: string) => {
  const fileType = file.name.split(".").at(-1);
  return await requestS3SignedUrl(fileType, dir).then(signedUrl => {
      return uploadFileToS3(signedUrl.uploadURL, file)
        .then((response:any) => (signedUrl.file))
        .catch(error => console.log(error))
    .catch(error => console.log(error));
  }) 
}    

export const requestS3SignedUrl = async (fileType: string, dir: string) => {
  return axios.get(`${API_UPLOAD_URL}/upload`, {
    params: {
      dir: dir,
      fileType: fileType
    }
  })
  .then((response:any) => response.data)
  .catch((error:any) => console.log(error))
}

export const uploadFileToS3 = async (signedUrl:string, file: any) => {
  if (signedUrl && file) {
    return axios.put(signedUrl, file)
            // .then(response => console.log(response))  
            .catch(error => console.log(error)) 
  }
}