import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl = environment.pokeUrl;
 
  constructor(private http: HttpClient) { }

  getPokemons(index){
    return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`);
  }
  getSpecies(index){
    return this.http.get<any>(`${this.baseUrl}/pokemon-species/${index}`);
  }
  getEvoChain(index){
    return this.http.get<any>(index);
  }
}
