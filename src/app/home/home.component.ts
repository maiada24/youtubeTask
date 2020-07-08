import { Component, OnInit, ViewChild } from '@angular/core';
import { YoutubeService } from "src/app/youtube.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'youtube';
  videos: any = [];
  temp: any = [];
  channelId: string = 'UC9trsD1jCTXXtN3xIOIU8gg';
  maxResults: number = 15;
  channel: string = "";
  dataLoaded: boolean = false;
  myGroup: FormGroup;

  constructor(private youTubeService: YoutubeService, private router: Router) {
    this.myGroup = new FormGroup({
      channel: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    if (localStorage.getItem("videos")) {
      this.videos = JSON.parse(localStorage.getItem("videos"));
      this.temp = [...this.videos];
      this.dataLoaded = true;
    }
    else {
      this.getVideos(this.channelId, this.maxResults);
    }
  }

  getVideos(channelId, maxResults) {
    this.dataLoaded = false;
    this.videos = [];
    this.youTubeService.getVideosForChannel(channelId, maxResults).subscribe(videoList => {
      for (let element of videoList["items"]) {
        this.videos.push(element);
      }
      localStorage.setItem('videos', JSON.stringify(this.videos));
      this.temp = [...this.videos];
      this.dataLoaded = true;
    },
      error => {
        this.dataLoaded = true;
        alert(error.error.error.message);
      });
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.snippet.title.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.videos = temp;
  }
}
