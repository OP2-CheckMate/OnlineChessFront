# OnlineChessFront - TypeScript - React Native

### Published in expo.io
https://expo.dev/@samz9n/OnlineChessFront?serviceType=classic&distribution=expo-go 
(This only works for android with Expo Go app!)
Install Expo Go app on Google Play store to get started! Then scan the QR-code from our published link, or follow the provided link to open our application.

## About
This is a schoolproject made by five students. The application is built with React Native, using TypeScript. As a "backend" we used socket.io and node (express), to get realtime game and chat updates.  The goal was to create a multiplayer online chess game, where players can play against friends and random opponents. We also wanted to include a chat for enchanced player experience.

![image](https://user-images.githubusercontent.com/64839531/235620179-86533719-ba50-4b68-b08a-fdfb0bb75390.png) ![image](https://user-images.githubusercontent.com/64839531/235622991-5a6b8ee3-dc2b-4440-9093-bd47f016d6e2.png) ![image](https://user-images.githubusercontent.com/64839531/235623139-37b6e2b0-184d-4dc3-849a-9c28304c9491.png)

<p float="left">
  <img src="https://user-images.githubusercontent.com/64839531/235620179-86533719-ba50-4b68-b08a-fdfb0bb75390.png" width="100" />
  <img src="/img2.png" width="100" /> 
  <img src="/img3.png" width="100" />
</p>

## Components (main screens): 

### Homepage.tsx 

    First page in the app. The player can choose to start a new game, go to settings or go to the board. 
    The navigation will work with stack-navigation.

### Settings.tsx 

    In the settings screen, the player can edit:  
    1. Gameplay options (show possible moves toggle), 
    2. Theme options for the board
    3. Profile settings (changing and setting name) 

### QueuingScreen.tsx 

    Player can either create a new lobby, join an existing lobby with the lobby code or find game against opponents that are ready to play. 

### LobbyCodeScreen.tsx 

    When creating a new lobby player will be redirected 
    to a screen with lobby code visible so they can share it with the opponent 

### Board.tsx 

    Component for the UI of the board 

### Game.tsx 

    Game logic using Chess.js third party library. 
    Also, chess pieces are defined in this component, 
    and the movement of them are done with different animation logic. 

## Chess.js 
   Third party library (https://github.com/jhlywa/chess.js/blob/master/README.md)
 - Validation of moves in frontend 
 - Only validated moves can be sent to backend 
 - Chess piece logic and other gameplay logic (e.g. winner, check and checkmate)

### Install: 

npm install chess.js 

### Example: 

    import { Chess } from 'chess.js' 
    const chess = new Chess() //starts new game 
    console.log(chess.ascii()) //shows all piece placements 
    chess.move({from:'a2', to:'a4'}) //Move PAWN 
    console.log(chess.ascii()) 

## Run app:
### Install packages:
npm install

### Run program:
npm start

### Stop program:
ctrl + c

## Authors
@Lauri-Iivarinen
@Samz9n
@AaltonenSan
@jounijoh
@Juho9

## Acknowledgements
- William Candilon [Chess - “Can it be done in React Native?”](https://youtu.be/JulJJxbP_T0)
- Chess.js library (https://github.com/jhlywa/chess.js/blob/master/README.md)
- We would also like to thank our fellow students in team Rojektipäälliköt for reaviewing and testing our code and giving us valuable ideas for further developement!
