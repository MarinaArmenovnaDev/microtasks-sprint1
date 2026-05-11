import type {Tasks} from "./App.tsx";

type DataProps = {
    title: string
    tasks: Tasks[]
    students: string[]
}

type Props = {
    data: DataProps
}


export const List = ({data}: Props) => {
    return (
        <div>
            <h1>{data.title}</h1>
            <ul>
                {data.tasks.map((task: Tasks) => (
                    <li key={task.taskId}>
                        <input type="checkbox" checked={task.isDone}/>
                        {task.title}
                    </li>
                ))}
            </ul>
            <ol>
                {data.students.map((student, index) => (
                    <li key={index}>{student}</li>
                ))}


        </ol>
</div>
)
}
