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
  formError: string;
  public crowlerurl: FormGroup;
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
    console.log(this.crowlerurl.value);
    this.api.createCrawlerUrl(this.crowlerurl.value).subscribe((data: CrawlerUrls) => {
      console.log(data);
      this.sources.push(data) ;
      this.formError = '';
    }, (err) => {
      console.log(err);
      if (err.status === 400 ) {
        if (err.error.non_field_errors.length > 0) {

          this.formError = err.error.non_field_errors[0];

      }
      }
    });
  }
  removeError() {
    this.formError = '';
  }
  viewContents(id) {

  }
  deleteContents(source) {
    this.api.deleteCrawlerUrl(source.id).subscribe((data: any) => {
      console.log(data);
      this.sources.splice(this.sources.indexOf(source), 1);
    }, (err) => {
      console.log(err);
    });
  }
}
