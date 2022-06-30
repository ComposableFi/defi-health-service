export default function Settings() {
  const [bridges, setBridges] = React.useState<Bridge[] | []>([]);

  const [filteredBridges, setFilteredBridges] = React.useState<Bridge[] | []>(bridges);

  function searchFiltering(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    const filtered = filterBridges({ text: value, bridges });
    setFilteredBridges(filtered);
  }
  const fetchBridgeData = async () => {
    if (process.env.NODE_ENV === 'development') {
      setBridges(_bridges);
      setFilteredBridges(_bridges);
      return;
    }
    const { bridges } = await retrieveAllBridges();
    setBridges(bridges);
    setFilteredBridges(bridges);
  };

  React.useEffect(() => {
    fetchBridgeData();
  }, []);

  return (
    <main>
      <p>settings</p>
    </main>
  );
}
