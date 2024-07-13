import React, { useState, useEffect } from 'react'
import {
  LayoutDashboard,
  FileText,
  Coins,
  ShoppingBag,
  Settings,
  HelpCircle,
  Search,
  Bell,
  User,
  PlusCircle,
  BarChart2,
  Users,
  DollarSign,
  CreditCard
} from 'lucide-react'

const DashboardItem = ({ icon: Icon, label, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-4">
      <span className="text-gray-500">{label}</span>
      <Icon className="text-indigo-500" size={24} />
    </div>
    <div className="text-2xl font-semibold">{value}</div>
  </div>
)

const TokenPurchaseCard = () => (
  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-lg shadow-md text-white">
    <h3 className="text-xl font-bold mb-4">Buy SurveyChain Tokens</h3>
    <p className="mb-4">Power your surveys and unlock premium features with SVC tokens!</p>
    <div className="flex items-center space-x-4 mb-4">
      <input type="number" placeholder="Enter amount" className="flex-grow p-2 rounded text-gray-800" />
      <button className="bg-white text-indigo-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors">
        Buy Tokens
      </button>
    </div>
    <p className="text-sm">1 SVC = $0.1 USD</p>
  </div>
)

const SurveyChainTokenCentricDashboard = () => {
  return (
    <>
      {/* Token Purchase Card */}
      <div className="mb-8">
        <TokenPurchaseCard />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardItem icon={Coins} label="Token Balance" value="5,230 SVC" />
        <DashboardItem icon={FileText} label="Active Surveys" value="12" />
        <DashboardItem icon={Users} label="Total Respondents" value="1,205" />
        <DashboardItem icon={DollarSign} label="Earned This Month" value="$1,250" />
      </div>

      {/* Token Usage Suggestions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Ways to Use Your Tokens</h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <CreditCard className="text-indigo-500 mr-2" size={18} />
            Create premium surveys with advanced features
          </li>
          <li className="flex items-center">
            <Users className="text-indigo-500 mr-2" size={18} />
            Access larger respondent pools for better data
          </li>
          <li className="flex items-center">
            <BarChart2 className="text-indigo-500 mr-2" size={18} />
            Unlock advanced analytics and reporting tools
          </li>
        </ul>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {/* Add a list or table of recent activities here */}
      </div>
    </>
  )
}

export default SurveyChainTokenCentricDashboard
