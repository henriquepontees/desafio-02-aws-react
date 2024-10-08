![UOL Compass Logo](https://s3.sa-east-1.amazonaws.com/remotar-assets-prod/company-profile-covers/cl7god9gt00lx04wg4p2a93zt.jpg)

# UOL Comics
O projeto a ser desenvolvido se chama UOL Comics. Se trata de uma plataforma de vendas online onde os usuários poderão visualizar e navegar entre diferentes revistas de quadrinhos e personagens da Marvel, tendo também a possibilidade de adicionar revistas ao carrinho e efetuar compras online das mesmas. O usuário poderá navegar livremente pela loja após logar ou criar sua conta e, caso deseje, comprar um quadrinho.


## Estrutura do Projeto

```bash
/Desafio-02-AWS-REACT
│
├── /public
│   └── vite,svg             
│
├── /src
│   ├── /assets                                     # Arquivos estáticos (imagens, ícones, etc.)
│   │   ├──cart.svg                                 # Página de carrinho vazio
│   │   ├──fluent_ios-arrow-24-filled.svg
│   │   ├──logo-uol-comics.svg
│   │   ├──R.gif
│   │   └──spiderman-image.svg
│   │            
│   ├── /components
│   │   ├──/Cart
│   │   │   ├──Cartitem.tsx
│   │   │   └──EmptyCart.tsx
│   │   │
│   │   ├── /Header                                  # Task do Header
│   │   │   ├──Header.tsx
│   │   │   └──SideBar.tsx
│   │   │
│   │   ├──Commons.ts
│   │   ├──LoadMoreButton.tsx
│   │   ├──PaymentMethod.tsx
│   │   └──Spinner.tsx
│   │   
│   ├──/pages
│   │   ├──Buy.tsx                                  # Página de compra
│   │   ├──Cart.tsx                                 # Página do carrinho com itens
│   │   ├──Characters.tsx                           # Characters List
│   │   ├──CharactersDetails.tsx                    # Character Details
│   │   ├──ComicList.tsx                            # Comics List
│   │   ├──ComicListDetails.tsx                     # Comics Details
│   │   ├──Login.tsx                                # Componentes relacionados ao Login
│   │   ├──Register.tsx                             # Componentes relacionados ao Register
│   │   └──SucessFull.tsx                           # Página de compra bem-sucedida
│   │   
│   ├──/store
│   │   ├──useAddress.tsx
│   │   └──usePayMethod.ts
│   │   
│   ├──/styles                                      # Arquivos de estilo (CSS/SASS)
│   │   ├──Buy.css
│   │   ├──Cart.css
│   │   ├──Characters.css
│   │   ├──CharactersDetails.css
│   │   ├──ComicList.css
│   │   ├──ComicListDetails.css
│   │   ├──global.css                               # Estilos globais
│   │   ├──Header.css
│   │   ├──LoadMoreButton.css
│   │   ├──LoginRegister.css
│   │   ├──Spinner.css
│   │   └──sucessFull.css
│   │   
│   ├──/types
│   │   ├──addressData.ts
│   │   ├──addressStore.ts
│   │   └──paymentStore.ts
│   │   
│   ├──/Utils
│   │   ├──Enums.ts
│   │   ├──Functions.ts
│   │   └──Types.ts
│   │   
│   ├──App.tsx                                      # Arquivo principal da aplicação
│   ├──AppRoutes.tsx
│   └──main.tsx
│
├──.gitignore
├──eslint.config.js
├──index.html                                       # Arquivo principal HTML
├──package-lock.json
├──package.json                                     # Dependências e scripts do projeto
├──README.md                                        # Documentação do projeto
├──tsconfig.app.json
├──tsconfig.json
├──tsconfig.node.json
├──vite.config.ts             
```


## Team
Aqui estão os GitHub dos desenvolvedores que contribuíram 

<table>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/148485241?v=4" width="40" /></td>
    <td><a href="https://github.com/elionGal" style="color: #1E90FF; font-weight: bold;">Elion</a></td>
    <td><img src="https://avatars.githubusercontent.com/u/104809502?v=4" width="40" /></td>
    <td><a href="https://github.com/henriquepontees" style="color: #FF6347; font-weight: bold;">Jose henrique</a></td>
  </tr>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/135551189?v=4" width="40" /></td>
    <td><a href="https://github.com/GabrielSousaM" style="color: #32CD32; font-weight: bold;">Gabriel Martins</a></td>
    <td><img src="https://avatars.githubusercontent.com/u/89105894?v=4" width="40" /></td>
    <td><a href="https://github.com/cassiotakarada-telefonica" style="color: #FFD700; font-weight: bold;">Gabriel Sette</a></td>
  </tr>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/103468557?v=4" width="40" /></td>
    <td><a href="https://github.com/FIDEL7Z" style="color: #32CD32; font-weight: bold;">Jefferson Fidelis</a></td>
  </tr>
 
</table>





## Instrutores

Aqui estão os GitHub dos instrutores que estão me orientando durante o programa:

<table>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/99038035?v=4" width="40" /></td>
    <td><a href="https://github.com/DevMateusmac" style="color: #1E90FF; font-weight: bold;">Mateus Mac</a></td>
    <td><img src="https://avatars.githubusercontent.com/u/67009807?v=4" width="40" /></td>
    <td><a href="https://github.com/JulianeMaran32" style="color: #FF6347; font-weight: bold;">Juliane Maran</a></td>
  </tr>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/40813203?v=4" width="40" /></td>
    <td><a href="https://github.com/faagner7" style="color: #32CD32; font-weight: bold;">Fagner</a></td>
    <td><img src="https://avatars.githubusercontent.com/u/141765025?v=4" width="40" /></td>
    <td><a href="https://github.com/cassiotakarada-telefonica" style="color: #FFD700; font-weight: bold;">Cássio</a></td>
  </tr>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/8907909?v=4" width="40" /></td>
    <td><a href="https://github.com/gabrielttrevisan" style="color: #6A5ACD; font-weight: bold;">Gabriel Trevisan</a></td>
    <td><img src="https://avatars.githubusercontent.com/u/55272383?v=4" width="40" /></td>
    <td><a href="https://github.com/cioatodavid" style="color: #FF1493; font-weight: bold;">David</a></td>
  </tr>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/67022012?v=4" width="40" /></td>
    <td><a href="https://github.com/RafaelNCST" style="color: #20B2AA; font-weight: bold;">Rafael</a></td>
    <td><img src="https://avatars.githubusercontent.com/u/88065559?v=4" width="40" /></td>
    <td><a href="https://github.com/joaoelias1921" style="color: #DAA520; font-weight: bold;">João Elias</a></td>
  </tr>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/20330507?v=4" width="40" /></td>
    <td><a href="https://github.com/cezarmezzalira" style="color: #8A2BE2; font-weight: bold;">Cezar Mezzalira</a></td>
    <td><img src="https://avatars.githubusercontent.com/u/62522451?v=4" width="40" /></td>
    <td><a href="https://github.com/Felipe-15" style="color: #FF4500; font-weight: bold;">Felipe Souza</a></td>
  </tr>
</table>
