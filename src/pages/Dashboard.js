import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { logout } = useAuth();

  // Mock statistics data - in a real app, this would come from an API
  const stats = [
    { name: 'Total Tickets', value: '12' },
    { name: 'Open Tickets', value: '5' },
    { name: 'In Progress', value: '3' },
    { name: 'Resolved', value: '4' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="container-max h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">TicketApp</div>
          <div className="flex items-center space-x-4">
            <Link to="/tickets" className="btn-secondary">
              Manage Tickets
            </Link>
            <button onClick={logout} className="btn-primary">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container-max py-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600">
              Overview of your ticket management system
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/tickets/new" className="btn-primary">
              Create New Ticket
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="card">
              <dt className="text-sm font-medium text-gray-600">{stat.name}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="card">
            <div className="divide-y divide-gray-200">
              {recentActivity.map((activity, index) => (
                <div key={index} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start">
                    <span className={`
                      status-tag
                      ${activity.status === 'open' ? 'status-tag-open' : ''}
                      ${activity.status === 'in_progress' ? 'status-tag-in-progress' : ''}
                      ${activity.status === 'closed' ? 'status-tag-closed' : ''}
                    `}>
                      {activity.status}
                    </span>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const recentActivity = [
  {
    title: 'Server Down Issue',
    status: 'open',
    time: '5 minutes ago',
  },
  {
    title: 'Login Page Bug',
    status: 'in_progress',
    time: '1 hour ago',
  },
  {
    title: 'Email Integration',
    status: 'closed',
    time: '2 hours ago',
  },
];