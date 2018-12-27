import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, ImageUrls } from '../api.service';
@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  images: Array<ImageUrls>;
  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.fetchData();
  }

  ngOnInit() {
  }
  fetchData() {
    const id: Number = +this.route.snapshot.paramMap.get('id');
    console.log( +this.route.snapshot.paramMap.get('id'));
    this.api.fetchImageUrls(id).subscribe((data: Array<ImageUrls>) => {
      console.log(data);
      this.images = data;
    }, (err) => {
      console.log(err);
    });
  }
}
