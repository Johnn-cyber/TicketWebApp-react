import { Link } from 'react-router-dom';
import { WaveBackground } from '../components/WaveBackground';

export default function Landing() {
  return (
    <div className="relative min-h-screen bg-white">
      <WaveBackground />
      
      {/* Decorative circles */}
      <div className="absolute right-10 top-32 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
      <div className="absolute -left-10 top-48 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative container-max pt-20 pb-16 sm:pt-24 sm:pb-20">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-16">
          <div className="text-2xl font-bold text-gray-900">TicketApp</div>
          <div className="space-x-4">
            <Link to="/auth/login" className="btn-secondary">
              Log in
            </Link>
            <Link to="/auth/signup" className="btn-primary">
              Sign up
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Simplify Your Support Workflow
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Streamline your customer support with our intuitive ticket management system. 
            Track, manage, and resolve issues efficiently all in one place.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/auth/signup" className="btn-primary">
              Get started
            </Link>
            <a href="#features" className="text-sm font-semibold leading-6 text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="mt-32">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-md transition-shadow">
                <div className="text-primary-600 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: 'Real-time Updates',
    description: 'Track ticket status changes and updates in real-time, ensuring your team stays synchronized.',
    icon: '📊',
  },
  {
    title: 'Smart Organization',
    description: 'Categorize and prioritize tickets efficiently with our intuitive organizational tools.',
    icon: '🎯',
  },
  {
    title: 'Detailed Analytics',
    description: 'Get insights into your support performance with comprehensive analytics and reporting.',
    icon: '📈',
  },
];