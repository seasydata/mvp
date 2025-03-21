import Link from 'next/link'
import Image from 'next/image'

export default function SubmissionHeader() {

    return (
        <header className="flex justify-center h-24 bg-neutral-200">
            <div className='flex justify-center items-center w-4/5'>
                <div className='flex justify-center'>
                    <Link href={"/"}>
                        <Image width='96' height='32' src="/images/logo.png" alt="Seasy Data Logo" />
                    </Link>
                </div>
            </div>
        </header >
    )
}