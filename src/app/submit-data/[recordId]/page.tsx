"use client";
import { trpc } from "~/server/api/trpc/client";
import { useState, useEffect } from "react";
import { type EnrichedOrganization } from "~/server/api/routers/organization";
import { EmissionRecord, type Product } from "~/server/types";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


const formSchema = z.object({
    quantityValue: z.number(),
    quantityUnit: z.enum(["kg", "l"]).default("kg"),
})

// { onClose }: { onClose: () => void }
export default function DataSubmission({ emissionRecordId }: { emissionRecordId: string }) {

    const { data: emissionRecord, isLoading, isError } = trpc.emissionRecord.getWithToken.useQuery({ emissionRecordId: "" });


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Record completed!")
    }






    return (
        <Form {...form}>
            <p className='text-3xl'>Filling in emission record for product {emissionRecord?.productId}</p>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" font-sans">
                <FormField
                    control={form.control}
                    name="quantityUnit"
                    render={({ field }) => (
                        <FormItem className='mt-10'>
                            <FormLabel className='text-2xl'>Emissionquantity</FormLabel>
                            <FormControl>
                                <Input placeholder="0" {...field} />
                            </FormControl>
                            <FormDescription>
                                Ytterligere beskrivelse
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="quantityValue"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-2xl'>Unit</FormLabel>
                            <FormControl>
                                <Input placeholder="kg" {...field} />
                            </FormControl>
                            <FormDescription>
                                Ytterligere beskrivelse
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}