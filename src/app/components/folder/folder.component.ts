import { Component, Input, OnInit } from '@angular/core';
import { loremIpsum, LoremIpsum } from 'lorem-ipsum';
import { Files, Folder } from 'src/app/models/folder.model';
import { FolderService } from 'src/app/services/folder.service';

class NewFolder implements Folder {
  constructor(
    public folderName: string,
    public isRoot: boolean,
    public files: Array<Files>,
    public folders: Folder[],
    public isSelected: boolean
  ) {}
}

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {

  folderName: string = '';
  fileName: string = '';
  showFolderEdit: boolean = false;
  fileIndex: number = -1;

  @Input() folder: Folder;

  lorem = new LoremIpsum();

  addFile(): void {
    this.folder.files = [...this.folder.files, {name: this.lorem.generateWords(1), isSelected: false, value: loremIpsum()}];
    this.folderService.saveToLocalStorage();
  }

  addFolder(): void {
    this.folder.folders = [...this.folder.folders, new NewFolder(this.lorem.generateWords(1), false, [], [], false)];
    this.folderService.saveToLocalStorage();
  }

  editFolderName(): void {
    this.folderName = this.folder.folderName;
    this.showFolderEdit = true;
    this.folderService.saveToLocalStorage();
  }

  saveFolderName(): void {
    this.folder.folderName = this.folderName;
    this.showFolderEdit = false;
    this.folderService.saveToLocalStorage();
  }

  editFileName(index): void {
    this.fileIndex = index;
    this.fileName = this.folder.files[index].name;
    this.folderService.saveToLocalStorage();
  }

  saveFileName(index): void {
    this.fileIndex = -1;
    this.folder.files[index].name = this.fileName;
    this.folderService.saveToLocalStorage();
  }

  showConten(text): void {
    this.folderService.fileContent = text;
  }

  checkboxSelected(file): void {
    const len = file.value.length;
    file.isSelected ? this.folderService.price += len : this.folderService.price -= len;
    this.folderService.saveToLocalStorage();
  }

  constructor(public folderService: FolderService) { }

  ngOnInit(): void {
  }

}
