import Header from './components/Header'
import GetProducts from './components/GetProducts'
import './assets/scss/Main.scss'

function App() {
  return (
    <div className="App">
      <Header />
      <GetProducts brand="Gallant" />
    </div>
  );
}

export default App;