import SelectFile from '../components/SelectFile';
import LogOut  from '../components/auth/LogOut'

export default function AdminPage(){
    return (
        <div>
            <div>
                <LogOut></LogOut>
            </div>
            <div style={{textAlign: 'center'}}>
                <h1 className="heading-select-file">
                    Add to trial's JSON history
                </h1>
                <br></br>
                <SelectFile></SelectFile>
            </div>
        </div>
    )
}