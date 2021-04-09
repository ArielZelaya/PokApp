this.pokemonService.getSpecies(this.pokemonSpecies).subscribe(
    res =>{
      /*Necesitamos la url de la cadena de evoluciones*/ 
      this.pokemonEvoChain = res.evolution_chain.url
      console.log("especie");
      console.log(this.pokemonEvoChain);
      this.pokemonService.getEvoChain(this.pokemonEvoChain).subscribe(
        res =>{
          this.evolutions = res.chain.evolves_to[0].evolves_to[0].species.name;
          console.log("evo");
          console.log(this.evolutions);

        },err =>{

        }
      )
    },
    err =>{

    }
  )