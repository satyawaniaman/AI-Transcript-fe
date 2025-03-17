import React from 'react';
import Link  from 'next/link';
import { Badge } from '@/components/ui/badge';
import { FileText, ExternalLink } from 'lucide-react';

const transcripts = [
  {
    id: 1,
    title: 'Enterprise SaaS Demo Call',
    date: '2023-07-15',
    duration: '45 min',
    sentiment: 'Positive',
    sentimentColor: 'bg-green-100 text-green-800',
  },
  {
    id: 2,
    title: 'Mid-Market Discovery Call',
    date: '2023-07-12',
    duration: '32 min',
    sentiment: 'Neutral',
    sentimentColor: 'bg-blue-100 text-blue-800',
  },
  {
    id: 3,
    title: 'Small Business Follow-up',
    date: '2023-07-08',
    duration: '28 min',
    sentiment: 'Positive',
    sentimentColor: 'bg-green-100 text-green-800',
  },
  {
    id: 4,
    title: 'Enterprise Negotiation Call',
    date: '2023-07-05',
    duration: '52 min',
    sentiment: 'Mixed',
    sentimentColor: 'bg-orange-100 text-orange-800',
  },
  {
    id: 5,
    title: 'Product Demo for Finance Team',
    date: '2023-07-01',
    duration: '38 min',
    sentiment: 'Positive',
    sentimentColor: 'bg-green-100 text-green-800',
  },
];

const RecentTranscriptsList = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Title</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Date</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Duration</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Sentiment</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transcripts.map((transcript) => (
            <tr key={transcript.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="font-medium text-navy-800">{transcript.title}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-gray-600">
                {new Date(transcript.date).toLocaleDateString()}
              </td>
              <td className="py-3 px-4 text-gray-600">{transcript.duration}</td>
              <td className="py-3 px-4">
                <Badge variant="outline" className={transcript.sentimentColor}>
                  {transcript.sentiment}
                </Badge>
              </td>
              <td className="py-3 px-4">
                <Link 
                  href={`/transcripts/${transcript.id}`} 
                  className="text-[#0284c7] hover:text-[#0284c7]/90 font-medium flex items-center"
                >
                  View
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTranscriptsList;
