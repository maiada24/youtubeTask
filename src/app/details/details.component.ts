import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { YoutubeService } from "src/app/youtube.service";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  videoId: string;
  videoData: any = null;
  currentRate: number;
  isFavorite: boolean;
  videos: any;

  constructor(private route: ActivatedRoute, private youTubeService: YoutubeService, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.videoId = this.route.snapshot.paramMap.get('id');
    this.getVideoDetails(this.videoId);
    // this.youTubeService.getVideos().subscribe(data => {
    //   // console.log(data);
    //   this.videos = data.map(e => {
    //     return {
    //       ...e.payload.doc.data()
    //     };
    //   })
    //   console.log(this.videos);
    // })
    const collection = this.firestore.collection('/videos');
    const doc = collection.doc(this.videoId);
    let self = this;
    doc.ref.get().then(function (doc) {
      //if doc exists in firestore, get it's data
      if (doc.exists) {
        self.currentRate = doc.data().rate;
        self.isFavorite = doc.data().favorite;
      } else { //else create new one
        collection.doc(self.videoId).set({
          favorite: false,
          rate: 0
        });
      }
    });
  }

  formatTimeUnit(input, unit) {
    var index = input.indexOf(unit);
    var output = "00"
    if (index < 0) {
      return output; // unit isn't in the input
    }

    if (isNaN(input.charAt(index - 2))) {
      return '0' + input.charAt(index - 1);
    } else {
      return input.charAt(index - 2) + input.charAt(index - 1);
    }
  }

  ISO8601toDuration(input) {
    var H = this.formatTimeUnit(input, 'H');
    var M = this.formatTimeUnit(input, 'M');
    var S = this.formatTimeUnit(input, 'S');

    if (H == "00") {
      H = "";
    } else {
      H += ":"
    }

    return H + M + ':' + S;
  }
  getVideoDetails(videoId) {
    this.youTubeService.getVideosDetails(videoId).subscribe(video => {
      this.youTubeService.getVideosLikes(videoId).subscribe(videoStatistics => {
        this.youTubeService.getVideosDuration(videoId).subscribe(videoContentDetails => {
          this.videoData = { ...video["items"][0]["snippet"], ...videoStatistics["items"][0]["statistics"], ...videoContentDetails["items"][0]["contentDetails"] };
          // console.log(this.videoData);
        });
      });
    });
  }

  rateChanged(rate) {
    const collection = this.firestore.collection('/videos');
    const doc = collection.doc(this.videoId);
    collection.doc(this.videoId).set({
      favorite: this.isFavorite,
      rate: rate
    });
  }

  addToFavorite(isFavorite) {
    this.isFavorite = isFavorite;
    const collection = this.firestore.collection('/videos');
    const doc = collection.doc(this.videoId);
    collection.doc(this.videoId).set({
      favorite: this.isFavorite,
      rate: this.currentRate
    });
  }
}
