import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({children}) => {
    return (
        <div className='w-full max-h-screen h-screen'>
            <Header />
            <div className="flex flex-row h-full w-[100vw]">
                <Sidebar />
                <main className="p-3 w-full overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout;