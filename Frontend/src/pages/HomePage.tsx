import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Header from '../components/common/Header';
import { CheckIcon } from '../components/icons';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const features = [
        {
            title: 'Smart Issue Management',
            description: 'Organize and prioritize your issues with AI-powered suggestions',
            icon: '🎯',
        },
        {
            title: 'Team Collaboration',
            description: 'Work together seamlessly with your team members',
            icon: '👥',
        },
        {
            title: 'Real-time Sync',
            description: 'Keep everything up-to-date with real-time synchronization',
            icon: '⚡',
        },
        {
            title: 'Analytics & Reports',
            description: 'Get insights into your project progress',
            icon: '📊',
        },
        {
            title: 'Integrations',
            description: 'Connect with your favorite tools and services',
            icon: '🔗',
        },
        {
            title: 'Mobile Ready',
            description: 'Access your projects on the go with mobile support',
            icon: '📱',
        },
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-100">
            {/* Navigation */}
            <Header />

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36">
                <div className="text-center mb-24">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-10 leading-tight">
                        Welcome to <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">JiraBot</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                        Your AI-powered project management companion. Streamline your workflow, collaborate with your team, and deliver projects faster.
                    </p>
                    <div className="flex gap-6 justify-center flex-wrap">
                        <Button variant="primary" size="lg" onClick={() => navigate('/chatbot')}>
                            Try AI Assistant
                        </Button>
                        <Button variant="outline" size="lg">
                            Learn More
                        </Button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-28">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-10 border border-gray-100 h-full hover:border-blue-200"
                        >
                            <div className="text-5xl mb-6">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-base">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-linear-to-r from-blue-600 to-indigo-600 text-white py-28 sm:py-32">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-10 leading-tight">
                        Need help with your projects?
                    </h2>
                    <p className="text-lg mb-12 text-blue-100 leading-relaxed">
                        Chat with our AI assistant to get instant insights and recommendations.
                    </p>
                    <Button
                        variant="primary"
                        size="lg"
                        className="bg-white text-blue-600 hover:bg-gray-100"
                        onClick={() => navigate('/chatbot')}
                        overrideVariant
                    >
                        Start Chatting Now
                    </Button>
                </div>
            </section>

            {/* Features List */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-20 text-center leading-tight">
                    Why Choose JiraBot?
                </h2>
                <div className="space-y-5">
                    {[
                        'AI-powered project insights and recommendations',
                        'Seamless team collaboration and communication',
                        'Advanced analytics and reporting tools',
                        'Integration with your favorite tools',
                        'Mobile app for on-the-go access',
                        '24/7 customer support and documentation',
                    ].map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-5 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 text-green-600">
                                <CheckIcon />
                            </div>
                            <span className="text-gray-700 font-medium text-base leading-relaxed">{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
                        <div>
                            <h4 className="text-white font-bold mb-5">JiraBot</h4>
                            <p className="text-sm leading-relaxed text-gray-400">Your AI-powered project management platform.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-5">Product</h4>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Security</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Roadmap</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-5">Company</h4>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-5">Legal</h4>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Terms</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition">Cookies</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm">
                        <p>&copy; 2024 JiraBot. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
