"use client";
import './shaking-animation.css';
import { Grid } from "@/components/wordle/Grid";
import { KeyBoard } from "@/components/wordle/KeyBoard";
import { GameState, WordleGame } from "@/utils/Game";
import { useEffect, useState } from "react";



export default function Home() {
  useEffect(()=>{
    const func = (event: KeyboardEvent) => {
      if (!event.ctrlKey){
        wordleGame[0].keyPressEventListener(event.key);
      }
    };
    addEventListener("keydown", func);
    return () => removeEventListener("keydown", func);
  })
  const [wordleGame, setWordleGame] = useState([new WordleGame()]);
  wordleGame[0].setWordleGame = setWordleGame;
  wordleGame[0].enableGameMode();

  return (
    <div is-game="true" className="flex flex-col items-center justify-around gap-10 dark:bg-background-night bg-background-day min-h-dvh">
      <h1 className="text-center text-3xl font-black">POMMSLE</h1>
      <Grid wordleGame={wordleGame}/>
      { wordleGame[0].gameModeState == GameState.Playing ? <KeyBoard wordleGame={wordleGame}/> : null}
      { wordleGame[0].gameModeState == GameState.Won ?
        <p className="text-green-600 text-xl font-[1000]">YOU WON</p>
        : null}
      { wordleGame[0].gameModeState == GameState.Lost ?
        <div>
          <p className="text-center text-red-600 text-xl font-[1000]">YOU LOST</p>
          <p className="text-center text-xl">the solution was <strong className="text-green-600 text-xl font-[1000]">{wordleGame[0].gameModeSolution}</strong></p>
        </div>
        : null}
    </div>
  );
}
