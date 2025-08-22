"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, Video as VideoIconOutline } from "lucide-react";
import { toast } from "sonner";
import { CldUploadButton } from "next-cloudinary";
import { cn } from "@/lib/utils";

interface LessonVideoFormProps {
  lesson: {
    id: string;
    title: string;
    videoUrl?: string | null;
  };
}

const LessonVideoForm: React.FC<LessonVideoFormProps> = ({ lesson }) => {
  const normalizedInitial = useMemo(
    () =>
      typeof lesson?.videoUrl === "string" && lesson.videoUrl.length > 0
        ? lesson.videoUrl
        : undefined,
    [lesson?.videoUrl]
  );

  const [isEditing, setIsEditing] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | undefined>(normalizedInitial);
  const [uploading, setUploading] = useState(false);
  const [widget, setWidget] = useState<any>(null);

  useEffect(() => {
    setVideoUrl(normalizedInitial);
  }, [normalizedInitial]);

  // Called by Cloudinary after each successful file upload
  const submitFile = async (result: any) => {
    if (result?.event !== "success") return;

    const url: string | undefined = result?.info?.secure_url;
    if (!url) return;

    // Optimistic preview
    const prev = videoUrl;
    setVideoUrl(url);

    try {
      setUploading(true);

      // PATCH to your backend (same-origin, include cookies for NextAuth)
      const res = await fetch(`/api/lessons`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: lesson.id, videoUrl: url }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || `Request failed: ${res.status}`);
      }

      toast.success("Video saved!");
      setIsEditing(false);
      widget?.close?.();
    } catch (e: any) {
      setVideoUrl(prev); // rollback
      toast.error(e?.message || "Failed to save video");
    } finally {
      setUploading(false);
    }
  };

  // Gives us the widget instance (so we can close it)
  const handleQueuesEnd = (_: any, widgetInstance: any) => {
    setWidget(widgetInstance);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course video
        <Button
          type="button"
          onClick={() => setIsEditing((c) => !c)}
          variant="ghost"
          disabled={uploading}
        >
          {isEditing ? (
            "Cancel"
          ) : videoUrl ? (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          )}
        </Button>
      </div>

      {/* Read mode */}
      {!isEditing && (
        <>
          {!videoUrl ? (
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md mt-2">
              <VideoIconOutline className="h-10 w-10 text-slate-500" />
            </div>
          ) : (
            <div className="relative aspect-video mt-2">
              <video
                className="h-full w-full rounded-md"
                src={videoUrl}
                controls
                playsInline
                preload="metadata"
              />
            </div>
          )}
        </>
      )}

      {/* Edit mode */}
      {isEditing && (
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed rounded-md bg-white mt-3",
            uploading && "opacity-60 pointer-events-none"
          )}
        >
          <CldUploadButton
            // IMPORTANT: your upload preset must allow video (resource_type: 'video')
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
            onSuccess={submitFile}
            onQueuesEnd={handleQueuesEnd}
            options={{
              resourceType: "video",
              multiple: false,
              maxFiles: 1,
              // (optional) let users pick from local & url
              sources: ["local", "url"],
            } as any}
          >
            <div className="flex flex-col items-center cursor-pointer">
              <VideoIconOutline className="h-10 w-10 text-slate-500" />
              <span className="text-sm mt-2">
                {uploading ? "Uploading..." : "Upload video"}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                MP4/WebM recommended • under your plan’s limits
              </span>
            </div>
          </CldUploadButton>
        </div>
      )}

      {/* Small processing hint */}
      {videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos may take a moment to process. If playback fails initially, try a quick refresh.
        </div>
      )}
    </div>
  );
};

export default LessonVideoForm;
