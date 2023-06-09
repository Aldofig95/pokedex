import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FavoritesService } from '../favorites.service';

interface Pokemon {
  name: string;
  sprites: any;
  abilities: { ability: { name: string } }[];
  game_indices: { version: { name: string } }[];
  types: { type: { name: string } }[];
}

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.sass']
})
@Injectable()
export class PokemonDetailComponent implements OnInit {
  pokemonId: number = 0;
  pokemon: Pokemon = {
    name: '',
    sprites: {},
    abilities: [],
    game_indices: [],
    types: []
  };

  constructor(private route: ActivatedRoute, private http: HttpClient, private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pokemonId = params['id'];
      this.loadPokemonDetail();
    });
  }

  loadPokemonDetail(): void {
    const url = `https://pokeapi.co/api/v2/pokemon/${this.pokemonId}`;
    this.http.get<Pokemon>(url).subscribe(data => {
      this.pokemon = data;
    });
  }
  
}
