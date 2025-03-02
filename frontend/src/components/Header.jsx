import logoname from "../assets/logo.png";

function Header({ selectedCDP, setSelectedCDP, indexDocumentation, isLoading }) {
  const CDP_OPTIONS = {
    segment: 'Segment',
    mparticle: 'mParticle',
    lytics: 'Lytics',
    zeotap: 'Zeotap'
  };

  return (
    <header className="bg-blue-600 text-white py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logoname} alt="Logo" className="h-10 w-10 mr-3" />
          <h1 className="text-2xl font-bold">QueryAI</h1>
        </div>
        
      </div>
      
        
      
    </header>
  );
}

export default Header;
