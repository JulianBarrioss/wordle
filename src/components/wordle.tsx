import Box from "./box"

export default function Wordle() {
    return <div>
        <Box value="a" status="present" />
        <Box value="b" status="absent" />
        <Box value="c" status="correct"/>
    </div>
}