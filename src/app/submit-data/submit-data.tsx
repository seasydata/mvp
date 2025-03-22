"use client";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import type { EnrichedEmissionRecord } from "~/server/api/routers/emissionrecords";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { nb } from "date-fns/locale";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";

export default function SubmitData({
  emissionRecord,
}: {
  emissionRecord: EnrichedEmissionRecord;
}) {
  const formSchema = z.object({
    productId: z.string(),
    recordDate: z.date(),
    source: z.string(),
    calculationMethod: z.enum(["AR4", "AR5", "AR6"]),
    comment: z.string(),
    CO2e: z.number().positive("CO2e must be a positive number"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: emissionRecord.productId,
      recordDate: new Date(),
      source: "",
      calculationMethod: undefined,
      comment: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    /// convert date to string
    console.log(values);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-cyan-900 mb-8 text-center md:text-left">
        Submit Emission Data
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-cyan-200 shadow-md h-fit">
          <CardHeader className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-t-xl border-b border-cyan-200">
            <CardTitle className="text-xl text-cyan-900">
              Product Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label className="text-cyan-800 font-medium">
                  Product Name
                </Label>
                <p className="p-3 bg-gray-50 rounded-md border border-gray-100">
                  {emissionRecord.productName}
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-cyan-800 font-medium">
                  Organization
                </Label>
                <p className="p-3 bg-gray-50 rounded-md border border-gray-100">
                  {emissionRecord.organizationName}
                </p>
              </div>
              {emissionRecord.description && (
                <div className="space-y-2">
                  <Label className="text-cyan-800 font-medium">
                    Description
                  </Label>
                  <p className="p-3 bg-gray-50 rounded-md border border-gray-100 text-sm text-gray-600">
                    {emissionRecord.description}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-200 shadow-md">
          <CardHeader className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-t-xl border-b border-cyan-200">
            <CardTitle className="text-xl text-cyan-900">
              Emission Data
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="recordDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-cyan-800">
                        Date of Emission Record
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal border-gray-200",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription className="text-gray-500 text-sm">
                        Date when measurements were taken
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="CO2e"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cyan-800">
                        CO2e Value
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter CO2e value"
                          type="number"
                          step="0.01"
                          className="border-gray-200"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500 text-sm">
                        Carbon dioxide equivalent in kilograms
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="calculationMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cyan-800">
                        Calculation Method
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="border-gray-200">
                            <SelectValue placeholder="Select a method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AR4">AR4</SelectItem>
                            <SelectItem value="AR5">AR5</SelectItem>
                            <SelectItem value="AR6">AR6</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription className="text-gray-500 text-sm">
                        IPCC Assessment Report version used for calculations
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cyan-800">Source</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Internal measurement, Third-party audit"
                          className="border-gray-200"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500 text-sm">
                        Where this data comes from
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cyan-800">Comment</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Additional notes about this measurement"
                          className="border-gray-200"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500 text-sm">
                        Any additional information about this measurement
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-6"
                  >
                    Submit Data
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
