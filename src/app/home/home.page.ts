import { Component, OnInit } from '@angular/core';
import { ApiService, CrawlerUrls, ScrapedUrls } from '../api.service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  sources: Array<CrawlerUrls>;
  levels: Array<ScrapedUrls>;
  private crowlerurl: FormGroup;
  constructor(private api: ApiService, private formBuilder: FormBuilder) {
    this.crowlerurl = this.formBuilder.group({
    title: ['', Validators.compose([Validators.maxLength(100), Validators.required])],
    url: ['', Validators.compose([Validators.maxLength(255), Validators.pattern('https?://.+'), Validators.required])],
    depth: ['', Validators.compose([Validators.max(5), Validators.required])],
  }); }
  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.api.fetchCrawlerUrls().subscribe((data: Array<CrawlerUrls>) => {
      console.log(data);
      this.sources = data;
    }, (err) => {
      console.log(err);
    });
  }
  addForm() {
    this.api.createCrawlerUrl(this.crowlerurl).subscribe((data: CrawlerUrls) => {
      console.log(data);
      this.sources.push(data) ;
    }, (err) => {
      console.log(err);
    });
  }
  viewContents(id) {

  }
  deleteContents(id) {
    this.api.deleteCrawlerUrl(id).subscribe((data: any) => {
      console.log(data);
    }, (err) => {
      console.log(err);
    });
  }
}
