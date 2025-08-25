"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { CldUploadButton } from "next-cloudinary";
import { cn } from "@/lib/utils";

interface ImageFormProps {
  courseId: string;
  initialImg?: string | null;
}

const ImageForm: React.FC<ImageFormProps> = ({ courseId, initialImg }) => {
  const normalizedInitial = useMemo(
    () => (typeof initialImg === "string" && initialImg.length > 0 ? initialImg : undefined),
    [initialImg]
  );

  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(normalizedInitial);
  const [uploading, setUploading] = useState(false);
  const [widget, setWidget] = useState<any>(null);

  useEffect(() => {
    setImageUrl(normalizedInitial);
  }, [normalizedInitial]);

  // Called by Cloudinary after each successful file upload
  const submitFile = async (result: any) => {
    if (result?.event !== "success") return;

    const url: string | undefined = result?.info?.secure_url;
    if (!url) return;

    // Optimistic preview
    const prev = imageUrl;
    setImageUrl(url);

    try {
      setUploading(true);

      // PATCH to your backend (same-origin, include cookies for NextAuth)
      const res = await fetch(`/api/courses`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: courseId, imageUrl: url }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || `Request failed: ${res.status}`);
      }

      toast.success("Image saved!");
      setIsEditing(false);
      // Optionally close the Cloudinary widget (if still open)
      widget?.close?.();
    } catch (e: any) {
      setImageUrl(prev); // rollback on failure
      toast.error(e?.message || "Failed to save image");
    } finally {
      setUploading(false);
    }
  };

  // Called when the upload queue finishes; gives access to the widget instance
  const handleQueuesEnd = (_: any, widgetInstance: any) => {
    setWidget(widgetInstance);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button
          type="button"
          onClick={() => setIsEditing((c) => !c)}
          variant="ghost"
          disabled={uploading}
        >
          {isEditing ? (
            "Cancel"
          ) : imageUrl ? (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
        </Button>
      </div>

      {/* Display (read mode) */}
      {!isEditing && (
        <>
          {!imageUrl ? (
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md mt-2">
              <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
          ) : (
            <div className="relative aspect-video mt-2">
              <Image
                alt="Course image"
                src={imageUrl}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, 700px"
                priority
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
            options={{ multiple: true }}             // per your snippet; we'll take the last uploaded as the image
            onSuccess={submitFile}
            onQueuesEnd={handleQueuesEnd}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
          >
            <div className="flex flex-col items-center cursor-pointer">
              <ImageIcon className="h-10 w-10 text-slate-500" />
              <span className="text-sm mt-2">
                {uploading ? "Uploading..." : "Upload Image"}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                16:9 aspect ratio recommended
              </span>
            </div>
          </CldUploadButton>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
