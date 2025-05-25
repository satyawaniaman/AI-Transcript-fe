"use client";
import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import {
	Calendar,
	Clock,
	FileText,
	Search,
	MoreHorizontal,
	Loader2,
	TrendingUp,
	TrendingDown,
	Activity,
	BarChart3,
	Eye,
	Download,
	Trash2,
	Copy,
	Filter,
	Plus,
	ArrowRight,
	CheckCircle,
	AlertCircle,
	RefreshCw,
	Sparkles,
	Users,
	MessageSquare,
} from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { toast, Toaster } from "react-hot-toast";
import { useGetTranscripts } from "@/services/dashboard/query";
import useCurrentOrg from "@/store/useCurrentOrg";
import Link from "next/link";
import { useDeleteAsset } from "@/services/callasset/mutation";

// Define the status type for type safety
type TranscriptStatus = "PENDING" | "SUCCESS" | "FAIL";

// Map API status to UI status
const statusMap: Record<
	TranscriptStatus,
	"processing" | "processed" | "failed"
> = {
	PENDING: "processing",
	SUCCESS: "processed",
	FAIL: "failed",
};

const formatDate = (dateString: string) => {
	if (!dateString) return "N/A";
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};

const formatTime = (dateString: string) => {
	if (!dateString) return "";
	const date = new Date(dateString);
	return date.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	});
};

// status component
const StatusBadge = ({
	status,
}: {
	status: "processing" | "processed" | "failed";
}) => {
	const statusConfig = {
		processed: {
			icon: CheckCircle,
			label: "Processed",
			className: "bg-green-100 text-green-800 border-green-200",
		},
		processing: {
			icon: RefreshCw,
			label: "Processing",
			className: "bg-blue-100 text-blue-800 border-blue-200 animate-pulse",
		},
		failed: {
			icon: AlertCircle,
			label: "Failed",
			className: "bg-red-100 text-red-800 border-red-200",
		},
	};

	const config = statusConfig[status];
	const Icon = config.icon;

	return (
		<Badge variant="outline" className={`gap-1 ${config.className}`}>
			<Icon className="h-3 w-3" />
			{config.label}
		</Badge>
	);
};

// sentiment display component
const SentimentDisplay = ({ sentiment }: { sentiment: number | null }) => {
	if (sentiment === null) return <span className="text-gray-400">--</span>;

	const getSentimentConfig = (value: number) => {
		if (value >= 70)
			return {
				color: "text-green-600",
				bg: "bg-green-500",
				icon: TrendingUp,
				label: "Positive",
			};
		if (value >= 40)
			return {
				color: "text-yellow-600",
				bg: "bg-yellow-500",
				icon: Activity,
				label: "Neutral",
			};
		return {
			color: "text-red-600",
			bg: "bg-red-500",
			icon: TrendingDown,
			label: "Negative",
		};
	};

	const config = getSentimentConfig(sentiment);
	const Icon = config.icon;

	return (
		<div className="flex items-center gap-2">
			<div className="relative w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
				<div
					className={`h-full ${config.bg} transition-all duration-300`}
					style={{ width: `${sentiment}%` }}
				/>
			</div>
			<div className="flex items-center gap-1">
				<Icon className={`h-3 w-3 ${config.color}`} />
				<span className={`text-sm font-medium ${config.color}`}>
					{Math.round(sentiment)}%
				</span>
			</div>
		</div>
	);
};

// Error boundary component
class ErrorBoundary extends React.Component<
	{ children: React.ReactNode },
	{ hasError: boolean }
> {
	constructor(props: { children: React.ReactNode }) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("Error in TranscriptsPage:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="flex flex-col items-center justify-center min-h-screen p-4">
					<Card className="border-red-200 bg-red-50">
						<CardContent className="pt-6">
							<div className="text-center space-y-4">
								<AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
								<div>
									<h2 className="text-xl font-bold text-red-600 mb-2">
										Something went wrong
									</h2>
									<p className="text-red-700 mb-4">
										We're having trouble loading the transcripts. Please try
										again later.
									</p>
								</div>
								<Button
									variant="outline"
									onClick={() => window.location.reload()}
									className="gap-2"
								>
									<RefreshCw className="h-4 w-4" />
									Refresh Page
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			);
		}

		return this.props.children;
	}
}

const TranscriptsPage: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [page, setPage] = useState(1);
	const limit = 10;

	const { currentOrg } = useCurrentOrg();
	const orgId = currentOrg?.id || "";

	const {
		data: transcripts,
		isLoading,
		isError,
		refetch,
	} = useGetTranscripts(orgId, page, limit);

	// Filter transcripts based on search term
	const filteredTranscripts = React.useMemo(() => {
		if (!transcripts?.data) return [];
		return transcripts.data.filter((transcript) =>
			(transcript.name || transcript.analysis?.title || "")
				.toLowerCase()
				.includes(searchTerm.toLowerCase())
		);
	}, [transcripts?.data, searchTerm]);

	// Handle page change
	const handlePreviousPage = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	const handleNextPage = () => {
		if (transcripts?.pagination && page < transcripts.pagination.pages) {
			setPage(page + 1);
		}
	};

	// Calculate sentiment percentage if analysis is available
	const calculateSentiment = React.useCallback((transcript: any) => {
		if (!transcript?.analysis?.overallSentiment) return null;
		// Convert from -1 to 1 scale to 0 to 100 scale
		return ((transcript.analysis.overallSentiment + 1) / 2) * 100;
	}, []);

	// Error handling
	useEffect(() => {
		if (isError) {
			toast.error("Failed to load transcripts. Please try again.");
		}
	}, [isError]);

	// Get status counts for stats
	const statusCounts = React.useMemo(() => {
		if (!transcripts?.data) return { processed: 0, processing: 0, failed: 0 };

		return transcripts.data.reduce(
			(acc, transcript) => {
				const status =
					statusMap[transcript.status as TranscriptStatus] || "processing";
				acc[status]++;
				return acc;
			},
			{ processed: 0, processing: 0, failed: 0 }
		);
	}, [transcripts?.data]);

	// Move the hook call before any conditional return statements
	const { mutate: deleteAsset } = useDeleteAsset();

	if (!orgId) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<Card className="border-orange-200 bg-orange-50">
					<CardContent className="pt-6 text-center">
						<Users className="h-12 w-12 text-orange-500 mx-auto mb-4" />
						<div className="text-orange-700 font-medium mb-2">
							No Organization Selected
						</div>
						<p className="text-orange-600 text-sm">
							Please select an organization to view transcripts.
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<ErrorBoundary>
			<Suspense
				fallback={
					<div className="flex justify-center items-center min-h-screen">
						<div className="text-center space-y-3">
							<Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
							<p className="text-gray-600">Loading transcripts...</p>
						</div>
					</div>
				}
			>
				<Toaster />
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="container mx-auto p-6 max-w-7xl space-y-8"
				>
					{/* Header */}
					<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
						<div className="space-y-3">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
									<FileText className="h-6 w-6 text-white" />
								</div>
								<Badge
									variant="secondary"
									className="text-xs font-medium gap-1"
								>
									<BarChart3 className="h-3 w-3" />
									Transcript Library
								</Badge>
							</div>
							<div>
								<h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
									All Transcripts
								</h1>
								<p className="text-gray-600 mt-2">
									Browse, analyze, and manage your sales call transcripts
								</p>
							</div>
						</div>

						<div className="flex gap-3">
							<Button
								asChild
								className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
							>
								<Link href="/dashboard/upload">
									<Plus className="h-4 w-4" />
									Upload New Transcript
								</Link>
							</Button>
						</div>
					</div>

					<Separator />

					{/* Stats Cards */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						<Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100/50">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-blue-700">
											Total Transcripts
										</p>
										<p className="text-3xl font-bold text-blue-900">
											{transcripts?.pagination?.total || 0}
										</p>
									</div>
									<div className="p-3 bg-blue-100 rounded-xl">
										<FileText className="h-6 w-6 text-blue-600" />
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100/50">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-green-700">
											Processed
										</p>
										<p className="text-3xl font-bold text-green-900">
											{statusCounts.processed}
										</p>
									</div>
									<div className="p-3 bg-green-100 rounded-xl">
										<CheckCircle className="h-6 w-6 text-green-600" />
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100/50">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-blue-700">
											Processing
										</p>
										<p className="text-3xl font-bold text-blue-900">
											{statusCounts.processing}
										</p>
									</div>
									<div className="p-3 bg-blue-100 rounded-xl">
										<RefreshCw className="h-6 w-6 text-blue-600 animate-spin" />
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="border-0 shadow-md bg-gradient-to-br from-red-50 to-red-100/50">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm font-medium text-red-700">Failed</p>
										<p className="text-3xl font-bold text-red-900">
											{statusCounts.failed}
										</p>
									</div>
									<div className="p-3 bg-red-100 rounded-xl">
										<AlertCircle className="h-6 w-6 text-red-600" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Search */}
					<Card className="border-0 shadow-md">
						<CardContent className="p-6">
							<div className="flex flex-col sm:flex-row gap-4">
								<div className="relative flex-1">
									<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
									<Input
										type="search"
										placeholder="Search transcripts by title..."
										className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</div>
								<Button
									variant="outline"
									className="gap-2 h-12 px-6"
									onClick={() => {
										toast.success("Advanced search applied!");
									}}
								>
									<Filter className="h-4 w-4" />
									Advanced Search
								</Button>
							</div>

							{searchTerm && (
								<div className="mt-4 flex items-center gap-2">
									<Badge variant="outline" className="gap-1">
										<Search className="h-3 w-3" />
										Searching: "{searchTerm}"
									</Badge>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setSearchTerm("")}
										className="text-xs"
									>
										Clear
									</Button>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Transcripts Table */}
					<Card className="border-0 shadow-md">
						<CardHeader className="pb-4">
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="flex items-center gap-2">
										<BarChart3 className="h-5 w-5 text-blue-600" />
										Transcript Library
									</CardTitle>
									<CardDescription className="mt-1">
										{isLoading
											? "Loading transcripts..."
											: `${filteredTranscripts.length} transcripts ${
													searchTerm ? "found" : "available"
											  } (${transcripts?.pagination?.total || 0} total)`}
									</CardDescription>
								</div>
								{!isLoading && transcripts?.data && (
									<Button
										variant="outline"
										size="sm"
										onClick={() => refetch()}
										className="gap-2"
									>
										<RefreshCw className="h-3 w-3" />
										Refresh
									</Button>
								)}
							</div>
						</CardHeader>
						<CardContent>
							{isLoading ? (
								<div className="flex justify-center items-center py-16">
									<div className="text-center space-y-3">
										<Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
										<p className="text-gray-600">Loading transcripts...</p>
									</div>
								</div>
							) : isError ? (
								<div className="flex flex-col items-center justify-center py-16">
									<AlertCircle className="h-12 w-12 text-red-500 mb-4" />
									<h3 className="text-lg font-medium text-red-600 mb-2">
										Failed to load transcripts
									</h3>
									<p className="text-red-500 mb-4">
										Please try again or contact support if the issue persists.
									</p>
									<Button
										variant="outline"
										onClick={() => refetch()}
										className="gap-2"
									>
										<RefreshCw className="h-4 w-4" />
										Retry Loading
									</Button>
								</div>
							) : filteredTranscripts.length === 0 ? (
								<div className="flex flex-col items-center justify-center py-16">
									<div className="p-4 bg-gray-50 rounded-full mb-4">
										<FileText className="h-12 w-12 text-gray-400" />
									</div>
									<h3 className="text-lg font-medium text-gray-900 mb-2">
										{searchTerm
											? "No matching transcripts"
											: "No transcripts found"}
									</h3>
									<p className="text-gray-500 mb-6 text-center max-w-md">
										{searchTerm
											? "Try adjusting your search terms to find what you're looking for."
											: "Upload your first sales call transcript to start getting insights."}
									</p>
									{!searchTerm && (
										<Button
											asChild
											className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
										>
											<Link href="/dashboard/upload">
												<Plus className="h-4 w-4" />
												Upload First Transcript
											</Link>
										</Button>
									)}
								</div>
							) : (
								<>
									<div className="overflow-x-auto">
										<Table>
											<TableHeader>
												<TableRow className="border-gray-200">
													<TableHead className="font-semibold text-gray-700">
														Title
													</TableHead>
													<TableHead className="font-semibold text-gray-700">
														Date & Time
													</TableHead>
													<TableHead className="font-semibold text-gray-700">
														Duration
													</TableHead>
													<TableHead className="font-semibold text-gray-700">
														Sentiment
													</TableHead>
													<TableHead className="font-semibold text-gray-700">
														Status
													</TableHead>
													<TableHead className="font-semibold text-gray-700 text-right">
														Actions
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{filteredTranscripts.map((transcript, index) => {
													const sentiment = calculateSentiment(transcript);
													const status =
														statusMap[transcript.status as TranscriptStatus] ||
														"processing";
													const analysisDate =
														transcript.analysis?.date || transcript.createdAt;

													return (
														<motion.tr
															key={transcript.id}
															initial={{ opacity: 0, y: 20 }}
															animate={{ opacity: 1, y: 0 }}
															transition={{
																duration: 0.3,
																delay: index * 0.05,
															}}
															className="border-gray-200 hover:bg-gray-50/50 transition-colors"
														>
															<TableCell className="font-medium">
																<Link
																	href={`/dashboard/analysis/${transcript.id}`}
																	className="group flex items-center gap-3 hover:text-blue-600 transition-colors"
																>
																	<div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
																		<FileText className="h-4 w-4 text-blue-600" />
																	</div>
																	<div className="min-w-0 flex-1">
																		<div className="font-medium text-gray-900 group-hover:text-blue-600 truncate">
																			{transcript.analysis?.title ||
																				"Unnamed Transcript"}
																		</div>
																		<div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
																			<Users className="h-3 w-3" />
																			{transcript.analysis?.participants
																				?.length || 0}{" "}
																			participants
																		</div>
																	</div>
																	<ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
																</Link>
															</TableCell>
															<TableCell>
																<div className="space-y-1">
																	<div className="flex items-center text-gray-700">
																		<Calendar className="h-3 w-3 mr-2 text-gray-400" />
																		<span className="text-sm font-medium">
																			{formatDate(analysisDate)}
																		</span>
																	</div>
																	<div className="flex items-center text-gray-500">
																		<Clock className="h-3 w-3 mr-2 text-gray-400" />
																		<span className="text-xs">
																			{formatTime(analysisDate)}
																		</span>
																	</div>
																</div>
															</TableCell>
															<TableCell>
																<div className="flex items-center gap-2">
																	<Clock className="h-4 w-4 text-gray-400" />
																	<span className="font-medium text-gray-700">
																		{transcript.analysis?.duration || "N/A"}
																	</span>
																</div>
															</TableCell>
															<TableCell>
																<SentimentDisplay sentiment={sentiment} />
															</TableCell>
															<TableCell>
																<StatusBadge status={status} />
															</TableCell>
															<TableCell className="text-right">
																<DropdownMenu>
																	<DropdownMenuTrigger asChild>
																		<Button
																			variant="ghost"
																			className="h-8 w-8 p-0 hover:bg-gray-100"
																		>
																			<span className="sr-only">Open menu</span>
																			<MoreHorizontal className="h-4 w-4" />
																		</Button>
																	</DropdownMenuTrigger>
																	<DropdownMenuContent
																		align="end"
																		className="w-48"
																	>
																		<DropdownMenuLabel className="font-semibold">
																			Actions
																		</DropdownMenuLabel>
																		<DropdownMenuItem asChild>
																			<Link
																				href={`/dashboard/analysis/${transcript.id}`}
																				className="flex items-center gap-2"
																			>
																				<Eye className="h-4 w-4" />
																				View Analysis
																			</Link>
																		</DropdownMenuItem>
																		<DropdownMenuItem
																			onClick={() => {
																				if (transcript.type === "FILE") {
																					window.open(transcript.content);
																				} else {
																					navigator.clipboard
																						.writeText(transcript.content)
																						.then(() =>
																							toast.success(
																								"Transcript copied to clipboard!"
																							)
																						);
																				}
																			}}
																			className="flex items-center gap-2"
																		>
																			{transcript.type === "FILE" ? (
																				<>
																					<Download className="h-4 w-4" />
																					Download File
																				</>
																			) : (
																				<>
																					<Copy className="h-4 w-4" />
																					Copy Text
																				</>
																			)}
																		</DropdownMenuItem>
																		<DropdownMenuSeparator />
																		<DropdownMenuItem
																			className="text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-2"
																			onClick={() => {
																				if (
																					confirm(
																						"Are you sure you want to delete this transcript? This action cannot be undone."
																					)
																				) {
																					deleteAsset({ id: transcript.id });
																					toast.success(
																						"Transcript deleted successfully"
																					);
																				}
																			}}
																		>
																			<Trash2 className="h-4 w-4" />
																			Delete
																		</DropdownMenuItem>
																	</DropdownMenuContent>
																</DropdownMenu>
															</TableCell>
														</motion.tr>
													);
												})}
											</TableBody>
										</Table>
									</div>

									{/* Pagination */}
									{transcripts?.pagination &&
										transcripts.pagination.pages > 1 && (
											<div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
												<div className="text-sm text-gray-600">
													Showing {(page - 1) * limit + 1} to{" "}
													{Math.min(page * limit, transcripts.pagination.total)}{" "}
													of {transcripts.pagination.total} results
												</div>
												<div className="flex items-center gap-2">
													<Button
														variant="outline"
														size="sm"
														disabled={page === 1}
														onClick={handlePreviousPage}
														className="gap-1"
													>
														Previous
													</Button>
													<div className="flex items-center gap-1">
														{Array.from(
															{
																length: Math.min(
																	5,
																	transcripts.pagination.pages
																),
															},
															(_, i) => {
																const pageNum = i + 1;
																return (
																	<Button
																		key={pageNum}
																		variant={
																			page === pageNum ? "default" : "outline"
																		}
																		size="sm"
																		onClick={() => setPage(pageNum)}
																		className="w-8 h-8 p-0"
																	>
																		{pageNum}
																	</Button>
																);
															}
														)}
													</div>
													<Button
														variant="outline"
														size="sm"
														disabled={page === transcripts.pagination.pages}
														onClick={handleNextPage}
														className="gap-1"
													>
														Next
													</Button>
												</div>
											</div>
										)}
								</>
							)}
						</CardContent>
					</Card>
				</motion.div>
			</Suspense>
		</ErrorBoundary>
	);
};

export default TranscriptsPage;
