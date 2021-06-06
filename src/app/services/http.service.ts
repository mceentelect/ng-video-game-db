import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../models/apiResponse';
import { Game } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl: string = environment.BASE_URL;
  //private apiUrl = 'http://localhost:3000/results';
  constructor(private http: HttpClient) { }

  getGameList(ordering: string, search?: string): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);
    if (search) {
      params.set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${this.apiUrl}/games`, {
      params: params
    });
  }

  getGame(gameId: string): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/games/${gameId}`);
  }

  getGameDetails(gameId: string): Observable<Game> {
    const gameInfoRequest = this.getGame(gameId);
    let movie = `${this.apiUrl}/games/${gameId}/movies`;
    console.log(movie);

    const gameTrailersRequest = this.http.get(movie);
    const gameScreenshotsRequest = this.http.get(`${this.apiUrl}/games/${gameId}/screenshots`);

    gameTrailersRequest.subscribe((res) => {
      console.log(res);
    });

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }

}
