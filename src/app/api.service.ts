import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CrawlerUrls {
  title: string;
  url: string;
  depth: string;
  status: string;
  internalStatus: string;
  scraping: string;
  createdOn: string;
  error: string;
  image_count: Number;
  links_count: Number;
}
export interface ScrapedUrls {
  title: string;
  parentUrl: string;
  relatedUrl: string;
  url: string;
  depth: string;
  scraping: string;
  createdOn: string;
  error: string;
}
export interface ImageUrls {
  parentUrl: string;
  url: string;
  pageUrl: string;
  createdOn: string;
}
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private dataURL = 'http://localhost:8080/api/';
  constructor(private httpClient: HttpClient) { }
  fetchCrawlerUrls(): Observable<CrawlerUrls[]> {
    return <Observable<CrawlerUrls[]>>this.httpClient.get(this.dataURL + 'sources');
  }
  fetchScrapedUrls(): Observable<ScrapedUrls[]> {
    return <Observable<ScrapedUrls[]>>this.httpClient.get(this.dataURL + 'levels');
  }
  fetchImageUrls(): Observable<ImageUrls[]> {
    return <Observable<ImageUrls[]>>this.httpClient.get(this.dataURL + 'images');
  }
  deleteCrawlerUrl(id): Observable<any> {
    return <Observable<any>>this.httpClient.post(this.dataURL + 'images', {id: id});
  }
  createCrawlerUrl(data): Observable<CrawlerUrls> {
    return <Observable<CrawlerUrls>>this.httpClient.post(this.dataURL + 'source/', {url: data.url, title: data.title, depth: data.depth});
  }
}
