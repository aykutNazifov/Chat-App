import Login from '../components/Login'
import Register from '../components/Register'

const AuthPage = () => {
    return (
        <div className='flex h-full divide-x divide-white/30'>
            <div className='flex-1'><Login /></div>
            <div className='flex-1'><Register /></div>
        </div>
    )
}

export default AuthPage