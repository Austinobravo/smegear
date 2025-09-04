"use client";
import React, { useEffect, useMemo, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { useRouter } from 'next/navigation';
interface PriceFormProps {
  courseId: string;
  initialPrice?: number | null;
}

// Schema expects a number (we’ll convert the input to number in onChange)
const formSchema = z.object({
  id: z.string().min(1, "Missing course id"),
  price: z.number().min(0, "Price must be 0 or more"),
});

const PriceForm: React.FC<PriceFormProps> = ({ courseId, initialPrice }) => {
    const router = useRouter();
  const normalizedInitial = useMemo(
    () => (typeof initialPrice === "number" ? initialPrice : undefined),
    [initialPrice]
  );

  const [isEditing, setIsEditing] = useState(false);
  const [displayPrice, setDisplayPrice] = useState<number | undefined>(normalizedInitial);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: courseId ?? "",
      price: normalizedInitial ?? 0,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    // keep form + UI in sync if props change
    setDisplayPrice(normalizedInitial);
    form.reset({ id: courseId ?? "", price: normalizedInitial ?? 0 });
  }, [courseId, normalizedInitial, form]);

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
  
    const prev = displayPrice;
    setDisplayPrice(values.price); // optimistic UI

    try {
      const res = await fetch(`/api/courses`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ensure NextAuth cookies are sent
        body: JSON.stringify({ id: values.id, price: values.price }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || `Request failed: ${res.status}`);
      }

      toast.success("Price saved!");
      setIsEditing(false);
       router.refresh();
    } catch (e: any) {
      setDisplayPrice(prev); // rollback on error
      toast.error(e?.message || "Failed to save price");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course price
        <Button
          type="button"
          onClick={() => setIsEditing((c) => !c)}
          variant="ghost"
        >
          {isEditing ? "Cancel" : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Price
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p className={cn("text-sm mt-2", displayPrice === undefined && "text-slate-500 italic")}>
          {displayPrice === undefined ? "No price" : formatPrice(displayPrice)}
        </p>
      )}

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* keep id in form state */}
            <input type="hidden" {...form.register("id")} />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="decimal"
                      step="0.01"
                      min="0"
                      disabled={isSubmitting}
                      placeholder="Set a price for your course"
                      // Keep the input controlled while allowing empty string during edits
                      value={
                        typeof field.value === "number"
                          ? field.value
                          : field.value === undefined
                          ? ""
                          : field.value
                      }
                      onChange={(e) => {
                        const val = e.currentTarget.value;
                        if (val === "") {
                          field.onChange(undefined); // temporarily empty
                        } else {
                          const num = Number(val);
                          field.onChange(Number.isNaN(num) ? undefined : num);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Enable unless submitting or id missing; RHF validates on submit */}
            <Button disabled={isSubmitting || !form.getValues("id")} type="submit">
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default PriceForm;
