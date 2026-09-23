import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import { useIpTracker } from "./hooks/useIpTracker";

function App() {
  const { isLoading, searchIp } = useIpTracker();

  return (
    <main>
      <Header>
        <SearchForm
          isLoading={isLoading}
          onSearch={searchIp}
        />
      </Header>
    </main>
  );
}

export default App;