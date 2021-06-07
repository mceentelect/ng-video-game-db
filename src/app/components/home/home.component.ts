import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort!: string;
  public games!: Array<Game>;
  private routeSub!: Subscription;
  private gameSub!: Subscription;

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params
      .subscribe(
        (params) => {
          if (params['game-search']) {
            this.searchGames('metacrit', params['game-search']);
          }
          else {
            this.searchGames('metacrit');
          }
        }
      );
  }

  searchGames(sort: string, search?: string): void {
    this.gameSub = this.httpService.getGameList(sort, search)
      .subscribe((gameList) => {
        this.games = gameList.results;
      });
  }

  openGameDetails(gameId: number): void {
    console.log(gameId);
    this.router.navigate(['details', gameId]);

  }

}
