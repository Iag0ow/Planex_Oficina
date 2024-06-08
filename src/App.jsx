import styles from './App.module.css'
import Planex from './page/Planex/Planex'

function App() {
  const newStyle ={
    fontFamily: 'Roboto, sans-serif'
  }

  return (
    <>
      <main className={styles.container}>
        <Planex/>
      </main>
      <footer style={{textAlign: "center",color:"white", marginTop:"1rem",...newStyle}}>
        PkInc ©️ Todos os direitos reservados
      </footer>
    </>
  )
}

export default App
