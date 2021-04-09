import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.css']
})
export class PokeDetailComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  pokemon: any = '';
  pokemonType = [];
  pokemonImg = '';
  pokemonSpecies = '';
  img : any;
  pokemonEvoChain = '';
   evolutions = '';
  Pokevolutions:any = [];
  data:any[] = [];
  dataSource = new MatTableDataSource<any>(this.Pokevolutions);

  constructor(private pokemonService: PokemonService, private activatedRouter: ActivatedRoute,private router: Router,) {
    this.activatedRouter.params.subscribe(
      params => {
          this.getPokemon(params['id']);
      }
    )
    this.img = [];

   }

  ngOnInit(): void {
  }

  evolutionRecursive(){

  }
  
  getPokemon(id){
    this.pokemonService.getPokemons(id).subscribe(
      res => {
        console.log(res);
        this.pokemon = res;
        this.pokemonImg = this.pokemon.sprites.front_default;
        this.pokemonType = this.pokemon.types[0].type.name;
        /* Obtenemos la especie y luego cadena evolutiva desde PokeApi */
        this.pokemonSpecies = this.pokemon.species.name;
        this.pokemonService.getSpecies(this.pokemonSpecies).subscribe(
          res =>{
            /*Necesitamos la url de la cadena de evoluciones*/ 
            this.pokemonEvoChain = res.evolution_chain.url
            console.log("especie");
            console.log(this.pokemonEvoChain);
            this.pokemonService.getEvoChain(this.pokemonEvoChain).subscribe(
              res =>{
                var evoData = res.chain;
                /* llenamos el array de las evoluciones */
                do {
                var evoDetails = evoData['evolution_details'][0];
                /*image for evolutions
                Aqui logre obtener la url de la imagen de cada evolucion pero no la pude pasar al source de la tabla
                */
                 
                var idpokedex = '';
                this.pokemonService.getPokemons(evoData.species.name).subscribe(
                  res =>{
                      console.log(res.sprites.front_default);
                      this.img =res.sprites.front_default;
                      console.log("la image es: "+this.img);
                  }
                )

                this.Pokevolutions.push( {
                  'image':this.img,
                  'name':evoData.species.name
                  });
                evoData = evoData['evolves_to'][0];
                } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
                console.log("evo");
                console.log(this.Pokevolutions);
                this.dataSource = new  MatTableDataSource<any>(this.Pokevolutions);

              },err =>{

              }
            )
          },
          err =>{

          }
        )
      },
      err =>{
console.log(err);
      }
    );

  }

  getRow(row){
    //this.router.navigateByUrl(`pokeDetail/$(row.position)`);
    this.router.navigateByUrl(`/pokeDetail/${row.position}`)
  }

}
