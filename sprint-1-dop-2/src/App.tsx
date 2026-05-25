import './App.css';
import {Modal} from "./components/modal/Modal";


export const App = () => {

    return (
        <div>
            <Modal>
                <h2>info</h2>
                <input type="text" placeholder={"email"}/>
                <input type="text" placeholder={"pass"}/>
                <input type="text" placeholder={"pass"}/>
                <label>
                    <input type="checkbox"/>
                    I agree
                </label>
                <button>send</button>
            </Modal>
        </div>
    );
}
