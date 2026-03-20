
const Activities = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const protocol = codespace === 'localhost' ? 'http' : 'https';
  const apiUrl = `${protocol}://${codespace}-8000.app.github.dev/api/activities/`;
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Activities API endpoint:', apiUrl);
        console.log('Fetched activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [apiUrl]);

  return (
    <div className="card shadow p-4 mb-4 bg-white rounded">
      <h2 className="mb-4 text-primary">Activities</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">User</th>
              <th scope="col">Activity</th>
              <th scope="col">Duration (min)</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>{activity.user}</td>
                <td>{activity.activity}</td>
                <td>{activity.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activities;
