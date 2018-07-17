import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})

export class HeroSearchComponent implements OnInit {
  private searchTerm = new Subject<string>();
  heroes$: Observable<Hero[]>;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroes$ = this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHero(term))
    );
  }

  search(term: string) {
    this.searchTerm.next(term);
  }
}
