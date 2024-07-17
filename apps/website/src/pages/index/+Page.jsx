import React from 'react';
import { ChevronRight, Clipboard, FileText, Coins, Users, LineChart, Globe } from 'lucide-react';

const SurveyCryptoHomepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 text-gray-800 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">SurveyChain 📊💰</div>
          <nav>
            <ul className="flex space-x-6">
              {['Home', 'Create Survey', 'Take Surveys', 'Marketplace', 'About'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-indigo-600 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </nav>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full transition-colors shadow-lg">
            Connect Wallet
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Revolutionize Market Research with Blockchain
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
            Create, distribute, and monetize surveys while earning cryptocurrency. Decentralized, transparent, and rewarding.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-3 rounded-full transition-colors inline-flex items-center shadow-lg">
              Create Survey <ChevronRight className="ml-2" />
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3 rounded-full transition-colors inline-flex items-center shadow-lg">
              Take Surveys <Clipboard className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Survey Creation', icon: FileText, description: 'Easy-to-use interface for creating comprehensive surveys' },
              { name: 'Cryptocurrency Rewards', icon: Coins, description: 'Earn tokens for completing and distributing surveys' },
              { name: 'Decentralized Data', icon: Globe, description: 'Survey results stored securely on the blockchain' },
              { name: 'Bounty System', icon: Users, description: 'Set bounties for survey completion and distribution' },
              { name: 'Integrated Advertising', icon: LineChart, description: 'Promote your surveys with built-in ad platforms' },
              { name: 'Marketplace', icon: Clipboard, description: 'Buy, sell, and trade survey data and results' }
            ].map((feature) => (
              <div key={feature.name} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <feature.icon className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold mb-4">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
            {[
              { step: 1, title: 'Create Survey', description: 'Design your survey with our intuitive tools' },
              { step: 2, title: 'Set Bounty', description: 'Allocate tokens as rewards for completion' },
              { step: 3, title: 'Distribute', description: 'Share your survey or use our marketplace' },
              { step: 4, title: 'Collect Data', description: 'Receive real-time, blockchain-verified results' },
              { step: 5, title: 'Earn & Analyze', description: 'Gain insights and earn tokens' }
            ].map((step) => (
              <div key={step.step} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-indigo-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Revolutionize Your Market Research?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join SurveyChain today and start creating surveys, earning tokens, and gaining valuable insights.
          </p>
          <button className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-full transition-colors inline-flex items-center shadow-lg">
            Get Started Now <ChevronRight className="ml-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-indigo-600">SurveyChain 📊💰</h3>
              <p className="text-gray-600">Empowering market research with blockchain technology.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Create Survey', 'Take Surveys', 'Marketplace', 'About'].map((item) => (
                  <li key={item}><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {['Whitepaper', 'API Documentation', 'Token Economics', 'FAQ'].map((item) => (
                  <li key={item}><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <ul className="space-y-2">
                {['Twitter', 'Telegram', 'Discord', 'Medium'].map((item) => (
                  <li key={item}><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>&copy; 2024 SurveyChain. All rights reserved.</p>
            <div className="mt-2">
              <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
              <span className="mx-2">|</span>
              <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SurveyCryptoHomepage;