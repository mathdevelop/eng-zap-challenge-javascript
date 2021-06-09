# eng-zap-challenge-javascript

A principal premissa que eu utilizei para construir o projeto, é que independente da rota em que o usuário inicie a aplicação, os dados são buscados uma única vez durante toda execução, evitando requisições desnecessárias. Pensando em otimização, criei uma Store, utilizando o Vuex, que armazena esses imóveis e guarda os anúncios filtrados/paginados de acordo com a regra de negócio do portal. Dessa forma, o filtro é executado novamente somente se o usuário trocar entre Viva Real e Zap Imóveis. Sobre a filtragem, ao invés de ter realizado pequenos filtros para cada regra, resolvi percorrer todos os registros uma única vez, quando uma condição da regra não é satisfeita, pula-se para o próximo item.
Utilizei gráficos vetoriais, pelo tamanho reduzido, qualidade, facilidade na manipulação. As únicas imagens que não estão em .svg, são do Background da Home. Apesar disso, elas não são carregadas no Mobile para diminuir o tempo de carregamento e foram processadas em um otimizador.
Sobre as tecnologias do projeto, resolvi escolher o Vue.js para sair da minha zona de conforto que é o React e pela vaga ser para este Framework. Já no CSS, utilizei o pré-processador SASS com a metodologia BEM.

### Instala as dependências do projeto
```
yarn install
```

### Compila e inicia um servidor local para desenvolvimento
```
yarn serve
```

### Compila e gera um pacote pronto para produção
```
yarn build
```

#### *Continuous Deployment configurado no Netlify (Como tem SSL, utilizei um Proxy para consumir o JSON em produção e nas imagens eu coloquei uma padrão quando ocorrer o erro):
```bash
https://zap-challenge.netlify.app/
```