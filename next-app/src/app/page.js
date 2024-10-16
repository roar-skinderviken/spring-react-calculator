import {SITE_PAGES} from "@/constants/sitePages"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {urlFromBasePath} from "@/app/basePathUtils"

export const dynamic = "force-static"

export default function Home() {
    return (
        <main className="content">
            <div className="hero">
                <div className="container mx-auto">
                    <h1 className="text-center flex justify-center">
                        <img
                            src={urlFromBasePath("/images/logo-no-background.png")}
                            alt="Welcome to VICX!"
                            width={400}
                            height={400}
                            className="w-[400px]"
                        />
                    </h1>
                    <p className="lead text-yellow-300 text-center">Explore my showcase of recent work</p>
                </div>
            </div>

            <div className="container mx-auto">
                <h2 className="text-center text-3xl my-4">Table of Contents</h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {SITE_PAGES.map((page, index) =>
                        <a href={urlFromBasePath(page.href)}
                              key={index}
                              className="flex items-center justify-center transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg mb-4 p-2"
                        >
                            <img
                                src={urlFromBasePath(page.imgSrc)}
                                alt={page.imgAlt}
                                className="mr-3"
                                width={page.imgWidth} />
                            <FontAwesomeIcon icon={page.icon} className="fa-fw mr-2" />
                            {page.title}
                        </a>
                    )}
                </div>
            </div>
        </main>
    )
}
