import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FavoritesService } from '../favorites.service';

export interface Pokemon {
  name: string;
  url: string;
}

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  limit = 0;

  constructor(private http: HttpClient, private router: Router, private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.loadPokemonList();
  }

  loadPokemonList(): void {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=100&offset=${this.limit}`;
    this.http.get<any>(url).subscribe(data => {
      this.pokemonList = data.results;
    });
  }

  getPokemonId(url: string): number {
    const urlParts = url.split('/');
    return +urlParts[urlParts.length - 2];
  }

  goToPokemonDetail(id: number): void {
    this.router.navigate(['pokemon-detail', id]);
  }

  loadNextPokemon(): void {
    this.limit += 100;
    this.loadPokemonList();
  }

  loadPreviousPokemon(): void {
    if (this.limit >= 100) {
      this.limit -= 100;
      this.loadPokemonList();
    }
  }

  addToFavorites(pokemon: Pokemon): void {
    this.favoritesService.addFavorite(pokemon);
  }

  isFavorite(pokemon: Pokemon): boolean {
    return this.favoritesService.isFavorite(pokemon);
  }
}