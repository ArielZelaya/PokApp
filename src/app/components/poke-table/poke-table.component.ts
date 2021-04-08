import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.css']
})
export class PokeTableComponent implements OnInit {
  displayedColumns: string[] = ['position','image','name','tipo','generacion'];
  data:any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  pokemons = [];
  
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  constructor(private pokeService: PokemonService,private router: Router) { }

  ngOnInit(): void {
    this.getPokemons();
  }


  getPokemons(){
    let pokemonData;
   

    /* Para cargar los pokemon itero hasta el numero en la podex deseado  
    Exa: La tercera generacion llega hasta el numero 386
    */

    for(let i = 1; i <= 725; i++){

      /* Para obtener la generacion no pude encontrar una forma mediante 
      la API (de seguro no revise bien) 
      asi que las defini segun su id en la pokedex */
      let generation;
      if(i>=1 && i<=150 ){
        generation = "primera Generacion";
      }else if(i>=151 && i<=251){
        generation = "Segunda Generacion";
      }else if(i>=252 && i<=386){
        generation = "Tercera Generacion";
      }
      else if(i>=387 && i<=493){
        generation = "Cuarta Generacion";
      }
      else if(i>=494 && i<=649){
        generation = "Quinta Generacion";
      }
      else if(i>=650 && i<=721){
        generation = "Sexta Generacion";
      }
      
      this.pokeService.getPokemons(i).subscribe(
        res =>{
          pokemonData = {
            position: i,
            image: res.sprites.front_default,
            tipo: res.types[0].type.name,
            name: res.name,
            
            

            generacion: generation

          }
          this.data.push(pokemonData);
          this.dataSource = new  MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
          console.log(res);
        },
        err => {
          console.log("error");
        }
      );
    }
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRow(row){
    //this.router.navigateByUrl(`pokeDetail/$(row.position)`);
    this.router.navigateByUrl(`/pokeDetail/${row.position}`)
  }

}
