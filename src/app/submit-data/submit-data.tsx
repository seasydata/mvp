'use client'

import {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
} from '@/components/ui/form'
import { Label } from "@/components/ui/label"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React from "react";
import type { EnrichedEmissionRecord } from "~/server/api/routers/emissionrecords";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Calendar } from "@/components/ui/calendar"

import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card'

export default function SubmitData({ emissionRecord

}: { emissionRecord: EnrichedEmissionRecord }) {

    const formSchema = z.object({
        productId: z.string(emissionRecord.productId),
        recordDate: z.string().datetime({ precision: 0 }),
        source: z.string(),
        calculationMethod: z.enum(["AR4", "AR5", "AR6"]).optional(),
        comment: z.string().optional(),
        CO2e: z.number().positive("CO2e must be a positive number")

    })


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productId: emissionRecord.productId,
            recordDate: new Date().toISOString(),
            source: "",
            calculationMethod: undefined,
            comment: "",

        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values)
    }


    return (
        <div className="flex flex-row mt-10 gap-10 w-full justify-center">
            <Card className="w-[500px] min-w-[500px]">
                <CardHeader>
                    <CardTitle className="text-xl">Product details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label className="text-xl">Name</Label>
                            <p>{emissionRecord.productName}</p>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label className="text-xl">Organization</Label>
                            <p>{emissionRecord.organizationName}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="w-[500px] min-w-[500px]">
                <CardHeader>
                    <CardTitle className="text-xl">Emission data</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="dob"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Date of emission record</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[300px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
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
                                        <FormDescription>
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
                                        <FormLabel>CO2e value</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="CO2e"
                                                type="number"
                                                step="0.01"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="source"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Source</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Source" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="calculationMethod"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Calculation method</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a method" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="AR4">AR4</SelectItem>
                                                    <SelectItem value="AR5">AR5</SelectItem>
                                                    <SelectItem value="AR6">AR6</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="comment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Comment</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Comment" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter any additional comments.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-center">
                                <Button type="submit">Submit</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}