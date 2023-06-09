import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon-list/pokemon-list.component';

@Injectable()
export class FavoritesService {
  favorites: Pokemon[] = [];

  constructor() { }

  addFavorite(pokemon: Pokemon): void {
    if (!this.isFavorite(pokemon)) {
      this.favorites.push(pokemon);
    }
  }

  removeFavorite(pokemon: Pokemon): void {
    const index = this.favorites.findIndex(p => p.name === pokemon.name);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    }
  }

  getFavorites(): Pokemon[] {
    return this.favorites;
  }

  isFavorite(pokemon: Pokemon): boolean {
    return this.favorites.some(p => p.name === pokemon.name);
  }
}
