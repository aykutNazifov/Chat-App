import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const NotificationContainer = () => {
    return (
        <div>
            <ToastContainer position='bottom-right' />
        </div>
    )
}

export default NotificationContainer