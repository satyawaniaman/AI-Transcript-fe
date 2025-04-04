"use client";

import { useState, JSX } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { File, Upload as UploadIcon, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generatePresignedUrls } from "./action";
import { createClient } from "@/utils/supabase/client";

type FileStatus = "idle" | "uploading" | "extracting" | "success" | "error";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: FileStatus;
  error?: string;
  originalFile: File;
}

const UploadPage = () => {
  const navigate = useRouter();
  const [activeTab, setActiveTab] = useState("upload-file");
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (fileList: FileList) => {
    const allowedTypes = [
      "text/plain", // .txt
      "application/pdf", // .pdf
      "text/vtt", // .vtt
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    ];

    const newFiles = Array.from(fileList)
      .filter((file) => allowedTypes.includes(file.type))
      .map((file) => ({
        id: Math.random().toString(36).substring(2, 11),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: "idle" as FileStatus,
        originalFile: file,
      }));

    if (newFiles.length > 0) {
      setFiles((prev) => [...prev, ...newFiles]);

      // Get userId from your authentication context or state
      const supabase = await createClient();
      const userId = (await supabase.auth.getSession()).data.session?.user.id;
      console.log(userId); // Replace with actual user ID retrieval logic

      try {
        const presignedUrls = await generatePresignedUrls(
          newFiles.map((file) => file.name),
          "application/octet-stream",
          userId as string
        );

        // Filter out any undefined URLs
        const validUrls = presignedUrls.filter(
          (url): url is string => url !== undefined
        );

        if (validUrls.length === 0) {
          console.log("No valid presigned URLs generated.");
          return; // Exit if no valid URLs
        }

        await uploadFilesToBucket(newFiles, validUrls);
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  };

  const uploadFilesToBucket = async (
    files: UploadedFile[],
    presignedUrls: string[]
  ) => {
    await Promise.all(
      files.map(async (file, index) => {
        try {
          // Update file status to uploading
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, status: "uploading", progress: 0 } : f
            )
          );

          // Simulate upload progress
          const progressInterval = setInterval(() => {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === file.id && f.progress < 90
                  ? { ...f, progress: f.progress + 10 }
                  : f
              )
            );
          }, 300);

          const response = await fetch(presignedUrls[index], {
            method: "PUT",
            body: file.originalFile,
            headers: {
              "Content-Type": file.type,
            },
          });

          console.log("rosponse of the upload", response.body);

          clearInterval(progressInterval);

          if (response.ok) {
            // Update file status to extracting
            setFiles((prev) =>
              prev.map((f) =>
                f.id === file.id
                  ? { ...f, status: "extracting", progress: 100 }
                  : f
              )
            );

            // Simulate extraction process
            setTimeout(() => {
              setFiles((prev) =>
                prev.map((f) =>
                  f.id === file.id ? { ...f, status: "success" } : f
                )
              );
            }, 1500); // Simulate 1.5s extraction time
          } else {
            // Handle error
            setFiles((prev) =>
              prev.map((f) =>
                f.id === file.id
                  ? { ...f, status: "error", error: "Upload failed" }
                  : f
              )
            );
          }
        } catch (error) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id
                ? { ...f, status: "error", error: "Upload failed" }
                : f
            )
          );
        }
      })
    );
  };

  // Add removeFile function
  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const fileIconMap: Record<string, JSX.Element> = {
    "text/plain": <File className="h-6 w-6 text-blue-500" />,
    "application/pdf": <File className="h-6 w-6 text-red-500" />,
    "text/vtt": <File className="h-6 w-6 text-green-500" />,
    "application/msword": <File className="h-6 w-6 text-blue-500" />,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": (
      <File className="h-6 w-6 text-blue-500" />
    ),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleAnalyzeClick = () => {
    // In a real app, this would send the files and their associated teamIds to the backend
    console.log("Files with team associations:", files);

    // Then redirect to the analysis page after processing
    setTimeout(() => {
      navigate.push("/dashboard/analysis");
    }, 500);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6"
      >
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Upload Transcripts
          </h1>
          <p className="text-gray-600 mt-2">
            Upload your sales call transcripts for analysis and get personalized
            coaching insights.
          </p>
        </div>

        <Tabs
          defaultValue="upload-file"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="mb-6">
            <TabsTrigger value="upload-file">Upload File</TabsTrigger>
            <TabsTrigger value="paste-text">Paste Text</TabsTrigger>
          </TabsList>

          <TabsContent value="upload-file">
            <Card>
              <CardHeader>
                <CardTitle>Upload Transcripts</CardTitle>
                <CardDescription>
                  Supported formats: TXT, PDF, VTT, DOC, DOCX
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    dragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col items-center"
                  >
                    <UploadIcon className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      Drag and drop your files here
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      or click to browse files from your computer
                    </p>
                    <Button
                      variant="outline"
                      onClick={() =>
                        document.getElementById("file-input")?.click()
                      }
                    >
                      Select Files
                    </Button>
                    <input
                      id="file-input"
                      type="file"
                      accept=".txt,.pdf,.vtt,.doc,.docx"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </motion.div>
                </div>

                {files.length > 0 && (
                  <motion.div
                    className="mt-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Uploaded Files
                    </h3>
                    <div className="space-y-4">
                      {files.map((file) => (
                        <motion.div
                          key={file.id}
                          variants={itemVariants}
                          className="border rounded-lg p-4"
                        >
                          <div className="flex items-start mb-3">
                            <div className="mr-4">
                              {fileIconMap[file.type] || (
                                <File className="h-6 w-6 text-gray-500" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div>
                                  <h4 className="font-medium text-gray-900">
                                    {file.name}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    {formatFileSize(file.size)}
                                  </p>
                                </div>
                                <div className="flex items-center">
                                  {(file.status === "uploading" ||
                                    file.status === "extracting") && (
                                    <span className="text-blue-500 text-sm mr-2">
                                      {file.status === "uploading"
                                        ? "Uploading..."
                                        : "Extracting..."}
                                    </span>
                                  )}
                                  {file.status === "success" && (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                  )}
                                  {file.status === "error" && (
                                    <XCircle className="h-5 w-5 text-red-500" />
                                  )}
                                  <button
                                    onClick={() => removeFile(file.id)}
                                    className="ml-2 text-gray-400 hover:text-gray-600"
                                    aria-label="Remove file"
                                  >
                                    <XCircle className="h-5 w-5" />
                                  </button>
                                </div>
                              </div>
                              {(file.status === "uploading" ||
                                file.status === "extracting") && (
                                <div className="mt-2">
                                  <Progress
                                    value={file.progress}
                                    className="h-2"
                                    // Change color based on status
                                    style={{
                                      backgroundColor:
                                        file.status === "extracting"
                                          ? "#EBF5FF"
                                          : undefined,
                                    }}
                                  />
                                  <p className="text-xs text-gray-500 mt-1">
                                    {file.status === "uploading"
                                      ? "Uploading file to server..."
                                      : "Extracting content..."}
                                  </p>
                                </div>
                              )}
                              {file.error && (
                                <p className="text-sm text-red-500 mt-1">
                                  {file.error}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <Button
                        variant="default"
                        className="w-full"
                        disabled={files.some(
                          (f) =>
                            f.status === "uploading" ||
                            f.status === "extracting" ||
                            f.status === "idle"
                        )}
                        onClick={handleAnalyzeClick}
                      >
                        Analyze Transcripts
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="paste-text">
            <Card>
              <CardHeader>
                <CardTitle>Paste Transcript Text</CardTitle>
                <CardDescription>
                  Copy and paste your transcript text directly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <textarea
                    className="w-full h-64 p-4 border rounded-md"
                    placeholder="Paste your transcript text here..."
                  />
                  <div className="mt-4">
                    <Button variant="default" className="w-full">
                      Analyze Text
                    </Button>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Alert className="mt-8 bg-blue-50 border-blue-200">
          <AlertDescription>
            After uploading, our AI will analyze your transcripts to identify
            objections, sentiment trends, and provide personalized coaching
            insights for your selected team.
          </AlertDescription>
        </Alert>
      </motion.div>
    </>
  );
};

export default UploadPage;
