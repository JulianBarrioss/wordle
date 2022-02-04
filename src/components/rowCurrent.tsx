import Box from './box';
import styles from './row.module.scss'

interface RowCurrentProps {
    word: string;
}

export default function RowCurrent({ word }: RowCurrentProps){
    const wordArray = word.split('');

    return (
        <div className={styles.row}>
            {
                wordArray.map((letter, i) => (
                    <Box key={i} value={letter} status='edit'/>
                ))
            }
            {
                Array.from(Array(5 - wordArray.length)).map((letter, i) => (
                    <Box key={i} value={''} status='edit'/>
                ))
            }
        </div>
    )
}