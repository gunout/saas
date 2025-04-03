// components/ProjectTimeline.js
const ProjectTimeline = ({ phases }) => {
  return (
    <View>
      {phases.map((phase, index) => (
        <TimelinePhase
          key={phase.id}
          title={phase.name}
          startDate={phase.startDate}
          endDate={phase.endDate}
          status={phase.status}
          isLast={index === phases.length - 1}
        />
      ))}
    </View>
  );
};

// Utilisation avec données réelles
const ConstructionPhases = ({ quoteId }) => {
  const [phases, setPhases] = useState([]);
  
  useEffect(() => {
    const fetchPhases = async () => {
      const response = await api.get(`/quotes/${quoteId}/timeline`);
      setPhases(response.data);
    };
    fetchPhases();
  }, [quoteId]);

  return <ProjectTimeline phases={phases} />;
};