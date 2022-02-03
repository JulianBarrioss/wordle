import { useEffect, useState } from "react";
import { useWindow } from "../hooks/useWindow";
import RowCompleted from "./rowCompleted";
import RowEmpty from "./rowEmpty";
import { GameStatus } from "./types";

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
        setWordOfTheDay("break");
    }, [])

    function handleKeyDown(event: KeyboardEvent) {
        const letter = event.key.toUpperCase();

        if(event.key === 'Backspace' && currentWord.length > 0) {
            onDelete()
            return;
        }

        
        if(event.key === 'Enter') {
            return;
        }

        
        if(currentWord.length > 5) {
            return;
        }

        if(keys.includes(letter)) {
            onInput(letter);
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

    return (
    <div>
        <RowCompleted word='sabia' solution={wordOfTheDay} />
        <RowEmpty />
        <RowEmpty />
        <RowEmpty />
        <RowEmpty />
    </div>
    )
} 