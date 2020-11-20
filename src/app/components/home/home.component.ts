import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { FolderService } from 'src/app/services/folder.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
      private http: HttpClient,
      public sanitizer: DomSanitizer,
      public folderService: FolderService
    ) { }

  url: string = 'https://preprod.paymeservice.com/api/generate-sale';
  payUrl: string = '';

  body = { 
    "seller_payme_id": "MPL14985-68544Z1G-SPV5WK2K-0WJWHC7N",
    "sale_price": "10000",
    "currency": "USD",
    "product_name": "Payment for files",
    "installments": "1",
    "language": "en"
  };

  sendPaymentReq(): Observable<any> {
    return this.http.post(this.url, this.body);
  }

  pay(): void {
    this.body.sale_price = this.folderService.price.toString();
    this.sendPaymentReq().subscribe(res => {
      this.payUrl = res['sale_url'];
    });
  }

  ngOnInit(): void {
    const stoderFolder = localStorage.getItem('folder');
    if (stoderFolder) {
      const folder = JSON.parse(stoderFolder);
      this.folderService.folder = folder;
      this.folderService.getDefaultPrice(folder);
    } else {
      const folder = JSON.stringify(this.folderService.folder);
      localStorage.setItem('folder', folder);
    }
  }

}
