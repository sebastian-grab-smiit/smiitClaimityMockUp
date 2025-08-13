"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, X, File, ImageIcon, FileText, Archive } from "lucide-react"

interface FileUploadProps {
  onFilesSelected?: (files: File[]) => void
  acceptedTypes?: string[]
  maxFiles?: number
  maxSize?: number // in MB
  className?: string
}

interface UploadedFile {
  file: File
  id: string
  progress: number
  status: "uploading" | "completed" | "error"
}

export function FileUpload({
  onFilesSelected,
  acceptedTypes = ["image/*", ".pdf", ".doc", ".docx"],
  maxFiles = 10,
  maxSize = 10,
  className = "",
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    if (file.type === "application/pdf") return <FileText className="h-4 w-4" />
    if (file.type.includes("zip") || file.type.includes("rar")) return <Archive className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleFiles = useCallback(
    (fileList: FileList) => {
      const newFiles = Array.from(fileList).slice(0, maxFiles - files.length)

      const validFiles = newFiles.filter((file) => {
        if (file.size > maxSize * 1024 * 1024) {
          alert(`Datei ${file.name} ist zu gross. Maximum: ${maxSize}MB`)
          return false
        }
        return true
      })

      const uploadedFiles: UploadedFile[] = validFiles.map((file) => ({
        file,
        id: Math.random().toString(36).substr(2, 9),
        progress: 0,
        status: "uploading",
      }))

      setFiles((prev) => [...prev, ...uploadedFiles])

      // Simulate upload progress
      uploadedFiles.forEach((uploadedFile) => {
        const interval = setInterval(() => {
          setFiles((prev) =>
            prev.map((f) => {
              if (f.id === uploadedFile.id) {
                const newProgress = Math.min(f.progress + Math.random() * 30, 100)
                return {
                  ...f,
                  progress: newProgress,
                  status: newProgress === 100 ? "completed" : "uploading",
                }
              }
              return f
            }),
          )
        }, 200)

        setTimeout(() => clearInterval(interval), 3000)
      })

      if (onFilesSelected) {
        onFilesSelected(validFiles)
      }
    },
    [files.length, maxFiles, maxSize, onFilesSelected],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleFiles(e.target.files)
      }
    },
    [handleFiles],
  )

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragOver ? "border-teal-500 bg-teal-50" : "border-slate-300 hover:border-slate-400"
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        <Upload className="h-8 w-8 text-slate-400 mx-auto mb-4" />
        <p className="text-slate-600 mb-2">
          Dateien hier ablegen oder{" "}
          <label className="text-teal-600 hover:text-teal-700 cursor-pointer underline">
            durchsuchen
            <input
              type="file"
              multiple
              accept={acceptedTypes.join(",")}
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
        </p>
        <p className="text-sm text-slate-500">
          Unterstützte Formate: {acceptedTypes.join(", ")} • Max. {maxSize}MB pro Datei
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-slate-800">Hochgeladene Dateien</h4>
          {files.map((uploadedFile) => (
            <div key={uploadedFile.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getFileIcon(uploadedFile.file)}
                <div>
                  <p className="font-medium text-slate-800 text-sm">{uploadedFile.file.name}</p>
                  <p className="text-xs text-slate-500">{formatFileSize(uploadedFile.file.size)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {uploadedFile.status === "uploading" && (
                  <div className="w-16 bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-teal-500 h-2 rounded-full transition-all"
                      style={{ width: `${uploadedFile.progress}%` }}
                    ></div>
                  </div>
                )}

                {uploadedFile.status === "completed" && (
                  <Badge className="bg-green-100 text-green-800">Hochgeladen</Badge>
                )}

                <Button variant="ghost" size="sm" onClick={() => removeFile(uploadedFile.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
