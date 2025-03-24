"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { HomeIcon, AlertCircle } from "lucide-react";

export default function InternalError() {
    return (
        <div className="min-h-[80vh] flex flex-col justify-center items-center px-4">
            <Card className="w-full max-w-md mx-auto border-cyan-200 shadow-lg">
                <CardHeader className="pb-2 text-center">
                    <div className="flex justify-center mb-4">
                        <AlertCircle className="h-16 w-16 text-cyan-600" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-cyan-900">
                        500
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-2">
                    <p className="text-xl text-cyan-800 mb-2">Internal Server Error</p>
                    <p className="text-gray-500 mb-6">
                        There was an error loading the data.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center pb-6">
                    <Link href="/" passHref>
                        <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                            <HomeIcon className="mr-2 h-4 w-4" />
                            Go Home
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
