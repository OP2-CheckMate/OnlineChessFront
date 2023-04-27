# OnlineChessFront - TypeScript - React Native

### Published in expo.io
https://expo.dev/@samz9n/OnlineChessFront?serviceType=classic&distribution=expo-go 
(This only works for android with Expo Go app!)

## About
This is a schoolproject made by five students. The application is built with React Native, using TypeScript. As a "backend" we used socket.io and node (express), to get realtime game and chat updates.  The goal was to create a multiplayer online chess game. 

## Components (in stack order): 

### Homepage.tsx 

    First page in the app. Idea is to have 2 or 3 buttons here 
    (Start Game, Settings and maybe something else). 
    The navigation will work with stack-navigation.

### Settings.tsx 

    In the settings screen, the player can edit:  
    1. gameplay options (still undecided what exactly), 
    2. theme for the board and 3. profile settings (name etc.) 

### QueuingScreen.tsx 

    Player can either create a new lobby or 
    join existing one with a lobby code 

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

 - Validation in frontend 

 - Only validated moves can be sent to backend 

 - Sandbox repository for testing 

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

## Acknowledgements
- William Candilon [Chess - “Can it be done in React Native?”](https://youtu.be/JulJJxbP_T0)
