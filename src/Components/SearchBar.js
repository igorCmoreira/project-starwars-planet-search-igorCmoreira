import React, { useContext } from 'react';
import PlanetsContext from '../Context/PlanetsContext';
/* Para este requisito (Requisito 2) consultei os seguintes repositorios e materiais:
https://pt-br.reactjs.org/docs/hooks-effect.html
https://pt-br.reactjs.org/blog/2018/03/27/update-on-async-rendering.html
https://www.alura.com.br/artigos/criando-um-autocomplete-com-javascript
da forma como desenvolvi estava acontecendo um atraso de resposta desta forma a tabela sempre atualizava um caracter atrasado.
Para tentar entender o problema consultei o repositorios dos seguintes colgas:
Apolo Wilker: https://github.com/tryber/sd-015-a-project-starwars-planets-search/pull/17/commits/c334310092a3d4180b9abd510a5bd19e4f2457b0
Arthur Simões: https://github.com/tryber/sd-015-a-project-starwars-planets-search/pull/89/commits/d2eb5ea9a29b234f204c1a9e74d7ed564801ed6f
refatorei o codigo transferindo a logica da filtragem para o componente da tabela
*/
const SearchBar = () => {
  const { handleChange, filterByName } = useContext(PlanetsContext);
  return (
    <input
      data-testid="name-filter"
      name="name"
      type="text"
      value={ filterByName.name }
      onChange={ handleChange }
      placeholder="Search"
    />
  );
};

export default SearchBar;
