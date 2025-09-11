import { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"

interface ContainerProps {
    children: ReactNode
}

function Header() {
    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="text-lg font-semibold">
                            <Image 
                                src="https://ten.com.br/hs-fs/hubfs/Logo-horizontal-sem-espa%C3%A7o.png?width=110&height=40&name=Logo-horizontal-sem-espa%C3%A7o.png" 
                                alt="TEN_ICON" 
                                width={110}
                                height={40}
                                priority
                            />
                        </Link>
                    </div>

                    <a
                        href="https://ten.com.br/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-lg transition-colors"
                    >
                        <Image 
                            src="https://ten.com.br/favicon.ico" 
                            alt="TEN" 
                            width={20}
                            height={20}
                        />
                        <span className="text-sm font-medium text-muted-foreground hover:text-foreground">
                            TEN
                        </span>
                    </a>
                </div>
            </div>
        </header>
    )
}

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-12 items-center justify-between text-sm text-muted-foreground">
                    <div>
                        © {currentYear} To Do Manager. Todos os direitos reservados.
                    </div>

                    <div className="hidden sm:flex items-center space-x-4">
                        <a
                            className=" rounded-lg bg-[#48a834] flex items-center justify-center cursor-pointer z-10 shadow-lg transition-transform duration-200 ease-in-out hover:scale-105"
                            href="https://api.whatsapp.com/send/?phone=5585981433854&text=Ol%C3%A1%20Caio%2C%20seu%20teste%20foi%20visualizado.&type=phone_number&app_absent=0"
                            target="_blank"
                            aria-label="Abrir conversa no WhatsApp"
                        >
                            <Image
                                width={35}
                                height={35}
                                src="https://img.icons8.com/color/48/whatsapp--v1.png"
                                alt="whatsapp--v1"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export function Container({ children }: ContainerProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>

            <Footer />
        </div>
    )
}