import { Providers } from "./shared/contexts/Providers"
import { AppRouter } from "./shared/routes/AppRouter"

function App() {

  return (
    <Providers>
      <AppRouter/>
    </Providers>
  )
}

export default App
