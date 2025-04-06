'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetTranscriptsCount, useGetAverageSentiment, useGetObjectionsHandled, 
         useGetTalkRatio, useGetSentimentTrends, useGetCommonObjections, 
         useGetTranscripts } from '@/services/dashboard/query';
import useCurrentOrg  from '@/store/useCurrentOrg';

const DashboardPage = () => {
  // Get the current user and their first organization
  const [page, setPage] = useState(1);
  const limit = 5;
  
  // Get the first organization ID if available
  const { currentOrg } = useCurrentOrg();
  const orgId = currentOrg?.id as string;
  
  // Fetch all dashboard data
  const { data: transcriptsCount, isLoading: countLoading } = useGetTranscriptsCount(orgId);
  const { data: sentiment, isLoading: sentimentLoading } = useGetAverageSentiment(orgId);
  const { data: objections, isLoading: objectionsLoading } = useGetObjectionsHandled(orgId);
  const { data: talkRatio, isLoading: ratioLoading } = useGetTalkRatio(orgId);
  const { data: sentimentTrends, isLoading: trendsLoading } = useGetSentimentTrends(orgId);
  const { data: commonObjections, isLoading: commonLoading } = useGetCommonObjections(orgId);
  const { data: transcripts, isLoading: transcriptsLoading } = useGetTranscripts(orgId, page, limit);

  // If still loading the user or no organization is selected
  if ( !orgId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <CardContent className="pt-6">
            {!orgId  ? "No organization found" : "Loading user data..."}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Transcripts Count */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Transcripts</CardTitle>
          </CardHeader>
          <CardContent>
            {countLoading ? (
              <p>Loading...</p>
            ) : (
              <p className="text-2xl font-bold">{transcriptsCount?.count || 0}</p>
            )}
          </CardContent>
        </Card>
        
        {/* Average Sentiment */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Sentiment</CardTitle>
          </CardHeader>
          <CardContent>
            {sentimentLoading ? (
              <p>Loading...</p>
            ) : (
              <p className="text-2xl font-bold">{sentiment?.averageSentiment || 0}%</p>
            )}
          </CardContent>
        </Card>
        
        {/* Objections Handled */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Objections Handled</CardTitle>
          </CardHeader>
          <CardContent>
            {objectionsLoading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <p className="text-2xl font-bold">{objections?.successful || 0} / {objections?.total || 0}</p>
                <p className="text-sm text-gray-500">Success Rate: {objections?.rate.toFixed(1) || 0}%</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Talk Ratio */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Talk Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            {ratioLoading ? (
              <p>Loading...</p>
            ) : (
              <p className="text-2xl font-bold">{talkRatio?.talkRatio || 0}%</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Detailed Data Tabs */}
      <Tabs defaultValue="sentiment" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="sentiment">Sentiment Trends</TabsTrigger>
          <TabsTrigger value="objections">Common Objections</TabsTrigger>
        </TabsList>
        
        {/* Sentiment Trends Tab */}
        <TabsContent value="sentiment">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Trends</CardTitle>
              <CardDescription>Last 10 calls sentiment analysis</CardDescription>
            </CardHeader>
            <CardContent>
              {trendsLoading ? (
                <p>Loading sentiment trends...</p>
              ) : sentimentTrends && sentimentTrends.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Call Name</th>
                        <th className="text-left py-2">Positive</th>
                        <th className="text-left py-2">Neutral</th>
                        <th className="text-left py-2">Negative</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sentimentTrends.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2">{item.name}</td>
                          <td className="py-2">{item.positive}%</td>
                          <td className="py-2">{item.neutral}%</td>
                          <td className="py-2">{item.negative}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No sentiment data available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Common Objections Tab */}
        <TabsContent value="objections">
          <Card>
            <CardHeader>
              <CardTitle>Common Objections</CardTitle>
              <CardDescription>Most frequent objections raised during calls</CardDescription>
            </CardHeader>
            <CardContent>
              {commonLoading ? (
                <p>Loading common objections...</p>
              ) : commonObjections ? (
                <div>
                  <h3 className="font-medium mb-2">Objection Types</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {commonObjections.types && Object.entries(commonObjections.types).map(([type, count]) => (
                      <div key={type} className="border rounded p-3">
                        <div className="text-sm text-gray-500">{type}</div>
                        <div className="text-lg font-bold">{count}</div>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="font-medium mb-2 mt-4">Top Objections</h3>
                  {commonObjections.topObjections && commonObjections.topObjections.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {commonObjections.topObjections.map((obj, index) => (
                        <li key={index} className="mb-1">
                          {obj.text} <span className="text-gray-500">({obj.count} times, {obj.type})</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No objection data available</p>
                  )}
                </div>
              ) : (
                <p>No objection data available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Transcripts List */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Transcripts</CardTitle>
          <CardDescription>Latest call transcripts with analysis</CardDescription>
        </CardHeader>
        <CardContent>
          {transcriptsLoading ? (
            <p>Loading transcripts...</p>
          ) : transcripts && transcripts.data && transcripts.data.length > 0 ? (
            <div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Name</th>
                      <th className="text-left py-2">Date</th>
                      <th className="text-left py-2">Duration</th>
                      <th className="text-left py-2">Sentiment</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transcripts.data.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-2">{item.name || 'Unnamed'}</td>
                        <td className="py-2">{item.analysis ? new Date(item.analysis.date).toLocaleDateString() : 'N/A'}</td>
                        <td className="py-2">{item.analysis?.duration || 'N/A'}</td>
                        <td className="py-2">{item.analysis ? `${((item.analysis.overallSentiment + 1) / 2 * 100).toFixed(1)}%` : 'N/A'}</td>
                        <td className="py-2">
                          <Button size="sm" variant="outline">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {transcripts.pagination && transcripts.pagination.pages > 1 && (
                <div className="flex justify-center mt-4">
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                    >
                      Previous
                    </Button>
                    <span className="text-sm">
                      Page {page} of {transcripts.pagination.pages}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={page === transcripts.pagination.pages}
                      onClick={() => setPage(page + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p>No transcripts available</p>
          )}
        </CardContent>
      </Card>
      
      {/* Debug Info */}
      <Card>
        <CardHeader>
          <CardTitle>Debug Information</CardTitle>
        </CardHeader>
        <CardContent className="max-h-96 overflow-y-auto">
          <div className="font-mono text-xs">
            <h3 className="font-bold mb-2">User Data:</h3>
            
            <h3 className="font-bold mt-4 mb-2">Organization ID:</h3>
            <pre>{orgId}</pre>
            
            <h3 className="font-bold mt-4 mb-2">Transcripts Count:</h3>
            <pre>{JSON.stringify(transcriptsCount, null, 2)}</pre>
            
            <h3 className="font-bold mt-4 mb-2">Average Sentiment:</h3>
            <pre>{JSON.stringify(sentiment, null, 2)}</pre>
            
            <h3 className="font-bold mt-4 mb-2">Objections Handled:</h3>
            <pre>{JSON.stringify(objections, null, 2)}</pre>
            
            <h3 className="font-bold mt-4 mb-2">Talk Ratio:</h3>
            <pre>{JSON.stringify(talkRatio, null, 2)}</pre>
            
            <h3 className="font-bold mt-4 mb-2">Sentiment Trends:</h3>
            <pre>{JSON.stringify(sentimentTrends, null, 2)}</pre>
            
            <h3 className="font-bold mt-4 mb-2">Common Objections:</h3>
            <pre>{JSON.stringify(commonObjections, null, 2)}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;