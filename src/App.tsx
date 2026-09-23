import Header from "./components/Header";
import InfoCard from "./components/InfoCard";
import Map from "./components/Map";
import SearchForm from "./components/SearchForm";
import StatusMessage from "./components/StatusMessage";
import { useIpTracker } from "./hooks/useIpTracker";

function App() {
  const {
    ipData,
    isLoading,
    error,
    searchIp,
  } = useIpTracker();

  return (
    <div className="app">
      <Header>
        <SearchForm
          isLoading={isLoading}
          onSearch={searchIp}
        />
      </Header>

      <main>
        <StatusMessage
          isLoading={isLoading}
          error={error}
        />

        {ipData && (
          <>
            <InfoCard ipData={ipData} />

            <Map
              latitude={ipData.location.lat}
              longitude={ipData.location.lng}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;