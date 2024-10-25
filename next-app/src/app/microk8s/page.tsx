import Hero from "@/components/Hero"
import Image from "next/image"

export const metadata = {
    title: "Microk8s | VICX"
}

export default function Microk8sPage() {
    return (
        <main className="content">
            <Hero
                title="Microk8s Config"
                lead="Learn about the kubernetes setup!"
            />

            <div className="container my-5 mx-auto">
                <h2 className="text-center text-3xl my-4">Config</h2>

                <div className="flex flex-col items-center">
                    <div className="flex flex-col space-y-4 px-2">

                        <div className="project">
                            <h2>Choosing the right distro</h2>
                            <ul>
                                <li>When it comes to Microk8s not every distro is usable.</li>
                                <li>After testing multible distros on the rpi5, Ubuntu server was the best.</li>
                                <li>Ubuntu offers better compatibility with Microk8s, due to ownership of the project.
                                </li>
                            </ul>
                            <Image src="/images/ubuntu.png" alt="Ubuntu"  width="460" height="460"/>
                        </div>

                        <div className="project">
                            <h2>Installing snapd on Debian based distros</h2>
                            <ul>
                                <li><code>sudo apt update</code></li>
                                <li><code>sudo apt install snapd</code></li>
                                <li><code>systemctl enable --now snapd apparmor</code></li>
                            </ul>
                            <Image src="/images/snapd.png" alt="Snapd"  width="460" height="460"/>
                        </div>

                        <div className="project">
                            <h2>Testing snapd on Debian based distros</h2>
                            <ul>
                                <li><code>snap install hello-world</code></li>
                                <li><code>hello-world</code></li>
                                <li><code>snap remove hello-world</code></li>
                            </ul>
                            <Image src="/images/debian.png" alt="Debian"  width="242" height="300"/>
                        </div>

                        <div className="project">
                            <h2>Installing Microk8s</h2>
                            <ul>
                                <li><code>sudo snap install microk8s --classic --channel=1.31</code></li>
                                <li><code>sudo usermod -a -G microk8s $USER</code></li>
                                <li><code>mkdir -p ~/.kube</code></li>
                                <li><code>chmod 0700 ~/.kube</code></li>
                            </ul>
                            <Image src="/images/kube.png" alt="Kubernetes" width="600" height="300"/>
                        </div>

                        <div className="project">
                            <h2>Raspberry Pi boot config</h2>
                            <ul>
                                <li><code>sudo vi /boot/firmware/cmdline.txt</code></li>
                                <li><code>cgroup_enable=memory cgroup_memory=1</code></li>
                                <li><code>sudo apt install linux-modules-extra-raspi</code></li>
                                <li><code>sudo microk8s stop sudo microk8s start</code></li>
                            </ul>
                            <Image src="/images/rasp.png" alt="Raspberry PI"  width="800" height="600"/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}