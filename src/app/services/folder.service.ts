import { Injectable } from '@angular/core';
import { Folder } from '../models/folder.model';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor() { }

  fileContent: string = '';
  price: number = 0;

  folder: Folder = {
    folderName: 'root',
    isRoot: true,
    isSelected: false,
    files: [],
    folders: []
  };

  removeSelected() {
    this.filterFolders(this.folder);
    this.saveToLocalStorage();
    this.price = 0;
    this.getDefaultPrice(this.folder);
  }

  saveToLocalStorage() {
    const folder = JSON.stringify(this.folder);
    localStorage.setItem('folder', folder);
  }

  filterFolders(item) {
    item.folders = item.folders.filter(folder => {
      return !folder.isSelected;
    });
    item.files = item.files.filter(file => {
      return !file.isSelected;
    });
    if (item.folders) {
      for (const folder of item.folders) {
        this.filterFolders(folder);
      }
    }
  }

  getDefaultPrice(item) {
    if (item.files) {
      for (const file of item.files) {
        if (file.isSelected) {
          const len = file.value.length;
          this.price += len;
        }
      }
    }

    if (item.folders) {
      for (const folder of item.folders) {
        this.getDefaultPrice(folder);
      }
    }
  }
}
