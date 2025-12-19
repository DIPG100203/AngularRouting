/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { tap, map } from 'rxjs';
import { environment } from '../../../environments/environment';

interface File {
  originalname: string;
  fileName: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private API_URL = `${environment.APIURL}/api/v1/files`;

  constructor(
    private http: HttpClient
  ) { }

  getFiles(name: string, url: string, type: string) {
    return this.http.get(url, {responseType: 'blob'})
    .pipe(
      tap(content => {
        const blob = new Blob([content], {type})
        saveAs(blob, name);
      }),
      map(() => true)
    )
  }

  uploadFile(file: Blob) {
    const dto = new FormData();
    dto.append('file', file);
    return this.http.post<File>(`${this.API_URL}/upload`, dto, {
      /* headers: {
        'Content-Type': "multipart/form-data"
      } */
    })
  }
}
