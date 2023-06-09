import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../favorites.service';
import { Pokemon } from '../pokemon-list/pokemon-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-favorites',
  templateUrl: './pokemon-favorites.component.html',
  styleUrls: ['./pokemon-favorites.component.sass']
})

export class PokemonFavoritesComponent implements OnInit {
  favorites: Pokemon[] = [];

  constructor(private favoritesService: FavoritesService, private router: Router) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  async loadFavorites(): Promise<void> {
    this.favorites = await this.favoritesService.getFavorites();
  }

  addFavorite(pokemon: Pokemon): void {
    this.favorites.push(pokemon);
  }

  async removeFavorite(pokemon: Pokemon): Promise<void> {
    await this.favoritesService.removeFavorite(pokemon);
    this.loadFavorites();
  }

  getFavorites(): Pokemon[] {
    return this.favorites;
  }

  isFavorite(pokemon: Pokemon): boolean {
    return this.favorites.some(p => p.name === pokemon.name);
  }

  getPokemonId(url: string): number {
    const urlParts = url.split('/');
    return +urlParts[urlParts.length - 2];
  }

  goToPokemonDetail(id: number): void {
    this.router.navigate(['pokemon-detail', id]);
  }
}