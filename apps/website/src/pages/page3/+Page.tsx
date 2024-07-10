import React, { useState } from 'react';
import { Share2, Copy, Edit2, BarChart2, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import { Input, Button } from '@nextui-org/react';

const SurveySharePage = ({ surveyLink, onEditSurvey }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(surveyLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform) => {
    let url;
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(surveyLink)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(surveyLink)}&text=${encodeURIComponent('Check out my survey!')}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(surveyLink)}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent('Check out my survey!')}&body=${encodeURIComponent(`I thought you might be interested in this survey: ${surveyLink}`)}`;
        break;
      default:
        return;
    }
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        Share Your Survey
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Survey Link</h2>
        <div className="flex items-center space-x-2 mb-4">
          <Input 
            value={surveyLink} 
            readOnly 
            className="flex-grow"
            aria-label="Survey link"
          />
          <Button onClick={handleCopyLink} variant="bordered" size="md" aria-label="Copy link">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        {copied && (
          <div className="mb-4">
            <div>Success!</div>
            <div>The survey link has been copied to your clipboard.</div>
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Share on Social Media</h2>
        <div className="flex space-x-4 mb-8">
          <Button onClick={() => handleShare('facebook')} variant="bordered" size="md" aria-label="Share on Facebook">
            <Facebook className="h-5 w-5" />
          </Button>
          <Button onClick={() => handleShare('twitter')} variant="bordered" size="md" aria-label="Share on Twitter">
            <Twitter className="h-5 w-5" />
          </Button>
          <Button onClick={() => handleShare('linkedin')} variant="bordered" size="md" aria-label="Share on LinkedIn">
            <Linkedin className="h-5 w-5" />
          </Button>
          <Button onClick={() => handleShare('email')} variant="bordered" size="md" aria-label="Share via Email">
            <Mail className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <Button onClick={onEditSurvey} variant="bordered" className="flex items-center space-x-2">
            <Edit2 className="h-4 w-4" />
            <span>Edit Survey</span>
          </Button>
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white flex items-center space-x-2">
            <BarChart2 className="h-4 w-4" />
            <span>View Analytics</span>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Advertise Your Survey</h2>
        <p className="text-gray-600 mb-4">
          To reach a wider audience and gather more responses, consider these advertising options:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
          <li>Share on your personal and professional networks</li>
          <li>Use targeted social media ads</li>
          <li>Embed the survey on your website or blog</li>
          <li>Send email newsletters to your subscribers</li>
        </ul>
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
          Explore Advertising Options
        </Button>
      </div>
    </div>
  );
};

export default SurveySharePage;