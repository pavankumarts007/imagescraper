import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CrawlerUrls {
  id: Number;
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
  id: Number;
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
  id: Number;
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
  fetchImageUrls(id): Observable<ImageUrls[]> {
    return <Observable<ImageUrls[]>>this.httpClient.get(this.dataURL + `images?parent=${id}`);
  }
  deleteCrawlerUrl(id): Observable<any> {
    return <Observable<any>>this.httpClient.delete(this.dataURL + `source/?parent=${id}`);
  }
  createCrawlerUrl(data): Observable<CrawlerUrls> {
    return <Observable<CrawlerUrls>>this.httpClient.post(this.dataURL + 'source/', {url: data.url, title: data.title, depth: data.depth});
  }
}
