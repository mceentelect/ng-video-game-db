import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  game!: Game;
  gameRating: number = 0;
  gameId!: string;
  routeSub!: Subscription;
  gameSub!: Subscription;

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute) { }
  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }

    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      this.gameId = params['gameId'];
      this.getGameDetalis(this.gameId);
    })
  }

  getGameDetalis(gameId: string) {
    this.gameSub = this.httpService.getGameDetails(gameId).subscribe((gameResponse) => {
      this.game = gameResponse;
      setTimeout(() => {
        this.gameRating = this.game.metacritic;
      }, 1000)
    });
  }

  getColor(value: number): string {
    let color = "ffffff";

    if (value > 75) {
      color = "#5ee432"
    } else if (value > 50) {
      color = "#fffa50"
    } else if (value > 35) {
      color = "#f7aa38"
    } else {
      color = "#ef4655"
    }

    return color;
  }
}
