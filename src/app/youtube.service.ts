import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  apiKey: string = 'AIzaSyD3lW9RahEZRiq0PA0LlcI7OM2R5MiekH8';

  constructor(public http: HttpClient, private firestore: AngularFirestore) { }

  getVideosForChannel(channel, maxResults): Observable<{}> {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }))
  }

  getVideosLikes(videoId): Observable<{}> {
    let url = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + videoId + '&key=' + this.apiKey
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }))
  }
  getVideosDuration(videoId): Observable<{}> {
    let url = 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=' + videoId + '&key=' + this.apiKey
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }))
  }
  getVideosDetails(videoId): Observable<{}> {
    let url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + videoId + '&key=' + this.apiKey
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }))
  }

  // getVideos(): Observable<any> {
  //   return this.firestore.collection('videos').snapshotChanges();
  // }
}