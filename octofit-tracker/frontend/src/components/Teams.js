
const Teams = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const protocol = codespace === 'localhost' ? 'http' : 'https';
  const apiUrl = `${protocol}://${codespace}-8000.app.github.dev/api/teams/`;
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Teams API endpoint:', apiUrl);
        console.log('Fetched teams:', results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [apiUrl]);

  return (
    <div className="card shadow p-4 mb-4 bg-white rounded">
      <h2 className="mb-4 text-primary">Teams</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Team Name</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>{team.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teams;
