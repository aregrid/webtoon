import { cn } from "@/lib/utils";
import React, { useId, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { useUserContext } from "@/contexts/UserContext";
import { toast } from "sonner";
// Add this type definition
type UserTier = 'Free' | 'STANDARD' | 'PRO' | 'UNLIMITED';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { IconQuestionMark } from "@tabler/icons-react";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

// Add this constant for file size limits
const FILE_SIZE_LIMITS: Record<UserTier, number> = {
  Free: 5 * 1024 * 1024, // 5MB
  STANDARD: 10 * 1024 * 1024, // 10MB
  PRO: 20 * 1024 * 1024, // 20MB
  UNLIMITED: 100 * 1024 * 1024, // 100MB
};

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};
const planLimitsTooltip = (
  <div className="p-2">
    <p className="font-semibold mb-2">File size limits per plan:</p>
    <table className="w-full text-sm">
      <thead>
        <tr>
          <th className="text-left font-semibold pb-1 border-b">Plan</th>
          <th className="text-right font-semibold pb-1 border-b">Limit</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(FILE_SIZE_LIMITS).map(([plan, size], index) => (
          <tr key={plan} className={cn(index % 2 === 0 ? "bg-gray-50" : "bg-white")}>
            <td className="py-1">{plan}</td>
            <td className="text-right py-1">{size / (1024 * 1024)} MB</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


export const FileUpload = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const { profile } = useUserContext()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onChange && onChange(newFiles);
  };

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    onChange && onChange(acceptedFiles);
  };
  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop: handleDrop,
    onDropRejected: (rejectedFiles) => {
      rejectedFiles.forEach((file) => {
        if (file.file.size > FILE_SIZE_LIMITS[profile.subscriptions[0].planName as UserTier]) {
          const maxSizeMB = FILE_SIZE_LIMITS[profile.subscriptions[0].planName as UserTier] / (1024 * 1024);
          toast.warning(`File "${file.file.name}" exceeds the ${maxSizeMB}MB limit for your ${profile.subscriptions[0].planName} plan.`);
        } else {
          toast.warning(`File "${file.file.name}" was rejected. Please check file type and size.`);
        }
      });
    },
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt"],
      "text/markdown": [".md"],
    },
    maxSize: FILE_SIZE_LIMITS[profile.subscriptions[0].planName as UserTier], // Set max file size based on user tier

  });
  const currentPlan = profile.subscriptions[0].planName as UserTier;
  const maxSizeMB = FILE_SIZE_LIMITS[currentPlan] / (1024 * 1024);

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.label
        htmlFor="file-upload-handle"
        whileHover="animate"
        className="p-10 group/file block rounded-lg cursor-pointer  w-full relative overflow-hidden"
      >
        <input
          id="file-upload-handle"
          type="file"
          accept=".pdf,.docx,.txt,.md"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
            Upload file
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
            Drag or drop your files here or click to upload .pdf,.docx,.txt,.md
          </p>
          <div className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-sm mt-2 flex items-center">
            <span>Max file size: {maxSizeMB} MB ({currentPlan} plan)</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <QuestionMarkCircledIcon className="ml-1 h-4 w-4 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  {planLimitsTooltip}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                    "shadow-sm"
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>

                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                    >
                      {file.type}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      modified{" "}
                      {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.label>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}
