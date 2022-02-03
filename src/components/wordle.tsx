import RowCompleted from "./rowCompleted";
import RowEmpty from "./rowEmpty";

export default function Wordle() {
    return <div>
        <RowCompleted word='sabio' solution="brake" />
        <RowEmpty />
        <RowEmpty />
        <RowEmpty />
        <RowEmpty />
    </div>
}