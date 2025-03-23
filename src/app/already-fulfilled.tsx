"use server";

import {
    Card,
    CardContent,

    CardHeader,

} from "~/components/ui/card";
import { AlertCircle } from "lucide-react";

export default async function AlreadyFulfilled() {
    return (
        <div className="min-h-[80vh] flex flex-col justify-center items-center px-4">
            <Card className="w-full max-w-md mx-auto border-cyan-200 shadow-lg">
                <CardHeader className="pb-2 text-center">
                    <div className="flex justify-center mb-4">
                        <AlertCircle className="h-16 w-16 text-cyan-600" />
                    </div>

                </CardHeader>
                <CardContent className="text-center pb-2">
                    <p className="text-xl text-cyan-800 mb-2">Data request fulfilled</p>
                    <p className="text-gray-500 mb-6">
                        Thank you!
                    </p>
                </CardContent>

            </Card>
        </div>
    );
}
