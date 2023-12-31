import { BrowserRouter } from 'react-router-dom';
import MainNavigation from './MainNavigation';
import Navbar from './components/Navbar';
import { GlobalState } from './contexts/GlobalContext';
import Loader from './components/Loader';
import AlertMessage from './components/AlertMessage';
import { UserState } from './contexts/UserContext';
import { CategoryState } from './contexts/CategoryContext';
import AlertDialog from './components/AlertDialog';
import { BookState } from './contexts/BookContext';
import { CartState } from './contexts/CartContext';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalState>
          <UserState>
            <CategoryState>
              <CartState>
                <BookState>

                  <Navbar />
                  <MainNavigation />
                  <Loader />
                  <AlertMessage />
                  <AlertDialog />

                </BookState>
              </CartState>
            </CategoryState>
          </UserState>
        </GlobalState>
      </BrowserRouter>      
    </>
  )
}

export default App;
