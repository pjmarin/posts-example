import { Component, OnInit } from '@angular/core';
import { Hero } from './../hero';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  heroes2: Observable<Hero[]>;
  selectedHero: Hero;
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    // this.heroes = this.heroService.getHeroes();
    // this.heroService.getHeroes()
      // .subscribe(heroes => this.heroes = heroes);
    this.heroes2 = this.heroService.getHeroes();
  }

}
