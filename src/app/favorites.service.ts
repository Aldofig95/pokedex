import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon-list/pokemon-list.component';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'favorite_pokemon';

  constructor() { }

  addFavorite(pokemon: Pokemon): void {
    const favorites = this.getFavoritesFromStorage();
    favorites.push(pokemon);
    this.saveFavoritesToStorage(favorites);
  }

  removeFavorite(pokemon: Pokemon): void {
    const favorites = this.getFavoritesFromStorage();
    const index = favorites.findIndex(fav => fav.name === pokemon.name);
    if (index !== -1) {
      favorites.splice(index, 1);
      this.saveFavoritesToStorage(favorites);
    }
  }

  getFavorites(): Pokemon[] {
    return this.getFavoritesFromStorage();
  }

  private getFavoritesFromStorage(): Pokemon[] {
    const favoritesJson = localStorage.getItem(this.STORAGE_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  }

  private saveFavoritesToStorage(favorites: Pokemon[]): void {
    const favoritesJson = JSON.stringify(favorites);
    localStorage.setItem(this.STORAGE_KEY, favoritesJson);
  }

  isFavorite(pokemon: Pokemon): boolean {
    const favorites = this.getFavoritesFromStorage();
    return favorites.some(fav => fav.name === pokemon.name);
  }
}
