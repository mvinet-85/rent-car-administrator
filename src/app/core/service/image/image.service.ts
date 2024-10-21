import {Injectable} from '@angular/core';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})

export class ImageService {
  private storage = getStorage();

  uploadImage(filePath: string, file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const storageRef = ref(this.storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }
}
