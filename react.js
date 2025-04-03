const ProfessionalDashboard = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('quotes');
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    const fetchStats = async () => {
      const response = await api.get('/professional/stats');
      setStats(response.data);
    };
    fetchStats();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Mon Espace Pro" />
      
      <StatsOverview 
        completedProjects={stats?.completedProjects}
        revenue={stats?.revenue}
        averageRating={stats?.averageRating}
      />
      
      <TabNavigation activeTab={activeTab} onChangeTab={setActiveTab} />
      
      {activeTab === 'quotes' && <QuotesList navigation={navigation} />}
      {activeTab === 'projects' && <ProjectsTimeline />}
      {activeTab === 'inventory' && <InventoryStatus />}
      
      <FloatingActionButton onPress={() => navigation.navigate('NewQuote')} />
    </View>
  );
};