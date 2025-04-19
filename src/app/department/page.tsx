"use client";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollToPlugin);

export default function MathematicsDepartment() {
  const handleNavClick = (target: string) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: `#${target}`,
      ease: "power2.inOut",
    });
  };

  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24">
        {/* Hero Section with Overlapping Images */}
        <section className="relative w-full">
          {/* Department Header Banner */}
          <Image
            src={"/mathematics/department.png"}
            alt="Department Header Banner"
            width={500}
            height={500}
            className="w-full h-fit object-cover object-center  rounded-lg shadow-lg shadow-black/20"
          ></Image>
          {/* <div className="w-full h-48 bg-black relative mb-2">
            <div className="w-full h-full flex items-center justify-center">
              <h1 className="text-6xl font-bold text-amber-400">
                DEPARTMENT OF MATHEMATICS
              </h1>
            </div>
          </div> */}

          {/* Three-panel layout */}
          <div className="w-full flex flex-col md:flex-row">
            {/* Left panel - Student group photo */}
            <div className="flex-1 h-80 relative mb-2 md:mb-0 md:mr-2">
              <Image
                src="/mathematics/depart-team.png"
                alt="Department Students"
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-lg shadow-lg shadow-black/20"
              />
            </div>

            {/* Middle panel - Faculty meeting photo */}
            <div className="flex-1 h-80 relative mb-2 md:mb-0 md:mx-1">
              <Image
                src="/mathematics/depart-teachers.png"
                alt="Department Faculty"
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-lg shadow-lg shadow-black/20"
              />
            </div>

            {/* Right panel - Welcome text */}
            {/* <div className="flex-1 h-80 bg-blue-900 flex flex-col items-center justify-center p-6 md:ml-2">
              <h2 className="text-4xl font-bold text-white mb-4">Welcome to</h2>
              <h3 className="text-3xl font-semibold text-white mb-4">
                Mathematics Department
              </h3>
              <h4 className="text-2xl font-medium text-white">
                NIT Kurukshetra
              </h4>
            </div> */}
          </div>

          {/* Navigation Buttons */}
          <div
            className="flex justify-center gap-6 backdrop-blur-md py-4 
            border-t border-b border-gray-800/50 mt-4"
          >
            <button
              onClick={() => handleNavClick("vision")}
              className="nav-button rounded-lg px-6 py-2 text-gray-300 hover:text-white
              bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-blue-600/20 hover:to-purple-600/20
              transition-all duration-300 border border-gray-700/50 hover:border-gray-600"
            >
              Vision and Mission
            </button>
            <button
              onClick={() => handleNavClick("research")}
              className="nav-button rounded-lg px-6 py-2 text-gray-300 hover:text-white
              bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-blue-600/20 hover:to-purple-600/20
              transition-all duration-300 border border-gray-700/50 hover:border-gray-600"
            >
              Research Area
            </button>
            <button
              onClick={() => handleNavClick("achievements")}
              className="nav-button rounded-lg px-6 py-2 text-gray-300 hover:text-white
              bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-blue-600/20 hover:to-purple-600/20
              transition-all duration-300 border border-gray-700/50 hover:border-gray-600"
            >
              Achievements
            </button>
          </div>

          {/* Department Info */}
          <div className="bg-gradient-to-r from-gray-900 to-black p-6 mt-4">
            <p className="mx-auto max-w-3xl text-lg text-center">
              Department of Mathematics at NIT Kurukshetra was born on 1966 with
              Professor P.D.S. Verma (D.Sc.) as the founder Chairman, is a
              well-known centre for education and research in Mathematics. It
              has undergraduate programs with opportunities for specialization
              in all major areas of Mathematics leading to Doctorate of
              Philosophy degree. In particular, the department offers excellent
              courses to the students of B. Tech and M. Tech. programs which are
              of special interest and are rewarding many students in getting
              admission abroad for further higher studies. The department is
              successfully running Ph.D. program with a reasonably high number
              of scholars registered. we have started M.Sc. program from the AY
              2023-24.
            </p>
            <div className="flex justify-center mt-6">
              <button
                className="rounded-full px-8 py-3 text-lg font-semibold 
                bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-500/80 hover:to-purple-500/80
                transition-all duration-300 border border-blue-500/30 hover:border-purple-500/30
                shadow-lg shadow-blue-500/20 hover:shadow-purple-500/20"
                onClick={() => router.push("https://nitkkr.ac.in/about-us-5/")}
              >
                Read More
              </button>
            </div>
          </div>
        </section>

        {/* Vision and Mission Section - Updated to match image content */}
        <section id="vision" className="py-20 px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-4xl font-bold text-center">
              Vision and Mission
            </h2>
            <div className="space-y-8">
              <div
                className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 
              border border-gray-700/30 hover:border-gray-600/30 transition-all duration-300
              shadow-lg shadow-black/20 hover:shadow-blue-900/20"
              >
                <h3 className="mb-4 text-2xl font-semibold text-blue-400">
                  Vision of Department
                </h3>
                <p className="text-lg">
                  To be a role model in mathematics education and research
                  responsive to global challenges.
                </p>
                <h3 className="my-4 text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Mission of Department
                </h3>
                <ul className="list-disc list-inside space-y-4 text-lg">
                  <li>M1: To impart quality mathematics education.</li>
                  <li>
                    M2: To develop innovative professionals, entrepreneurs and
                    researchers.
                  </li>
                  <li>
                    M3: To generate prime knowledge resources for the growth of
                    industry, society and futuristic knowledge focusing on the
                    socio-economic needs.
                  </li>
                </ul>

                <div className="flex justify-end w-full mt-4">
                  {" "}
                  <a
                    href="https://nitkkr.ac.in/vision-and-mission-m/"
                    className="text-blue-400"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Areas Section - Updated with content from image */}
        <section id="research" className="py-20 px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-4xl font-bold text-center">Research</h2>
            <div className="space-y-8">
              <div
                className="rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 
        border border-gray-700/30 hover:border-gray-600/30 transition-all duration-300
        shadow-lg shadow-black/20 hover:shadow-blue-900/20"
              >
                <h3 className="mb-4 text-2xl font-semibold text-blue-400">
                  Research Areas
                </h3>
                <p className="text-lg">
                  The Department has research facilities in the following thrust
                  areas:
                </p>

                {/* List of research areas grouped by domain */}
                <ul className="list-decimal list-inside space-y-4 text-lg">
                  {/* 1. Fluid Mechanics, Heat and Mass Transfer */}
                  <li>
                    Fluid Mechanics, Heat and Mass Transfer
                    <ul className="list-disc list-inside ml-6 space-y-1">
                      <li>Transport in Porous Media</li>
                      <li>Boundary Layer Theory</li>
                      <li>Lubrication, Rheology</li>
                      <li>Micropolar Fluids in Thermo-Elasticity</li>
                    </ul>
                  </li>

                  {/* 2. Numerical Analysis */}
                  <li>
                    Numerical Analysis
                    <ul className="list-disc list-inside ml-6 space-y-1">
                      <li>Numerics of Delay Differential Equations</li>
                      <li>Fractional Differential Equations</li>
                      <li>
                        Numerical Methods for Singular Boundary Value Problems
                      </li>
                      <li>Singular Perturbation Problems</li>
                      <li>
                        Numerical Methods for Partial Differential Equations
                      </li>
                      <li>Numerical Solution of Fractional PDEs</li>
                      <li>
                        Differential Geometry of Manifolds and Applications
                      </li>
                    </ul>
                  </li>

                  {/* 3. Reliability Analysis */}
                  <li>
                    Reliability and Stability Analysis
                    <ul className="list-disc list-inside ml-6 space-y-1">
                      <li>Stability and Control of Robotic Systems</li>
                      <li>Optimization Theory</li>
                      <li>Mathematical Modelling of Dynamical Systems</li>
                      <li>Reliability Analysis</li>
                    </ul>
                  </li>

                  {/* 4. Fourier Analysis */}
                  <li>
                    Fourier and Functional Analysis
                    <ul className="list-disc list-inside ml-6 space-y-1">
                      <li>Fourier Approximation</li>
                      <li>Summability Theory</li>
                      <li>Functional Analysis</li>
                      <li>Operator Theory</li>
                      <li>Wavelets</li>
                    </ul>
                  </li>

                  {/* 5. Algebra and Special Functions */}
                  <li>
                    Algebra and Special Functions
                    <ul className="list-disc list-inside ml-6 space-y-1">
                      <li>Two-Parameter Quantum Algebras</li>
                      <li>Special Functions</li>
                      <li>Lie Theory</li>
                    </ul>
                  </li>
                </ul>

                {/* Read More Link */}
                <div className="flex justify-end w-full mt-4">
                  <a
                    href="https://nitkkr.ac.in/vision-and-mission-m/"
                    className="text-blue-400"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-20 px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-4xl font-bold text-center">
              Department Achievements
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Placeholder achievement cards */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="relative group overflow-hidden rounded-xl"
                >
                  <div className="aspect-square bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/30 group-hover:border-gray-600/30">
                    <div className="h-full w-full bg-[url('/homeImages/image_${(i % 3) + 3}.avif')] bg-cover bg-center group-hover:scale-110 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
                    <div className="w-full">
                      <p className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Achievement {i}
                      </p>
                      <p className="text-sm text-gray-300 mt-2">
                        Click to learn more about this achievement
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
