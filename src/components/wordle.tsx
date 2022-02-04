import { useEffect, useState } from "react";
import { useWindow } from "../hooks/useWindow";
import { getWordOfTheDay, isValidWord } from "../service/request";
import Keyboard from "./keyboard";
import RowCompleted from "./rowCompleted";
import RowCurrent from "./rowCurrent";
import RowEmpty from "./rowEmpty";
import { GameStatus } from "./types";

import styles from './wordle.module.scss'

const keys = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'Ñ',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
]

export default function Wordle() {
    const [wordOfTheDay, setWordOfTheDay] = useState<string>('');
    const [turn, setTurn] = useState<number>(1);
    const [currentWord, setCurrentWord] = useState<string>('');
    const [completedWords, setCompletedWords] = useState<string[]>([]);
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Playing);

    useWindow('keydown', handleKeyDown);

    useEffect(() => {
        setWordOfTheDay(getWordOfTheDay());
    }, [])

    function handleKeyDown(event: KeyboardEvent) {
        const key = event.key.toUpperCase();

        onKeyPressed(key)
    }

    function onKeyPressed(key:string){
        if(gameStatus !== GameStatus.Playing) {
            return;
        }

        if(key === 'BACKSPACE' && currentWord.length > 0) {
            onDelete();
            return;
        }

        
        if(key=== 'ENTER' && currentWord.length === 5 && turn < 6) {
            onEnter();
            return;
        }

        
        if(currentWord.length > 5) {
            return;
        }

        if(keys.includes(key)) {
            onInput(key);
            return;
        }
    }

    function onInput(letter:string) {
        const newWord = currentWord + letter;
        setCurrentWord(newWord);
    }

    function onDelete() {
        const newWord = currentWord.slice(0, -1);
        setCurrentWord(newWord);
    }

    function onEnter() {
        
        if(currentWord === wordOfTheDay) {
            //win
            setCompletedWords([ ...completedWords, currentWord])
            setGameStatus(GameStatus.Won);
            return
        }

        if(turn === 6) {
            //lose
            setCompletedWords([ ...completedWords, currentWord ])
            setGameStatus(GameStatus.Lost);
            return
        }

        if(currentWord.length === 5 && !isValidWord(currentWord)) {
            alert('Not a valid word')
        }

        setCompletedWords([ ...completedWords, currentWord ]);
        setTurn(turn + 1);
        setCurrentWord('');
    }

    return (
        <>
            <div className={styles.mainContainer}>
                {
                    completedWords.map((word, i) => (
                        <RowCompleted key ={i} word={word} solution={wordOfTheDay} />
                    ))
                }

                {
                    gameStatus === GameStatus.Playing ? (
                        <RowCurrent word={currentWord}/>
                    ) : null
                }

                {
                    Array.from(Array(6 - turn)).map((_, i) => (
                        <RowEmpty key={i} />
                    ))
                }
            </div>

            <Keyboard 
            keys={keys}
            onKeyPressed={onKeyPressed}
            />
        </>


    )
} 