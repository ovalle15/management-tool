import SelectFile from '../components/SelectFile';

export default function AdminPage(){
    return (
        <div>
            <h1 className="heading-select-file">
                Add to trial's JSON history
            </h1>
            <br></br>
            <SelectFile></SelectFile>
        </div>
    )
}