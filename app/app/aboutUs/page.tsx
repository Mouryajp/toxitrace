import Image from "next/image";
import React from "react";
import dsuLogo from "../../assests/dsu.png";
import cdsimerLogo from "../../assests/CDSIMER_Logo.jpg";

const AboutUs = () => {
  return (
    <section className="max-h-[85vh] overflow-y-auto">
      <div className="xl:text-sm lg:text-sm md:text-xl xl:max-w-4xl lg:max-w-4xl md:max-w-[80%] mx-auto px-2 py-6 text-gray-800 dark:text-gray-200 text-justify space-y-6">
        <h1 className="text-4xl font-bold mb-4 text-center">About Us</h1>

        <p>
          <strong>Toxitrace</strong> is an initiative developed by the
          final-year Computer Science and Engineering students of the 2025 batch
          at <strong>Dayananda Sagar University (DSU), Bengaluru</strong>. The
          development team comprises{" "}
          <strong>
            Mokka Hema Sai, Mourya J P, Padmashree P, and Pavithra A
          </strong>
          . This project was successfully completed under the esteemed guidance
          of <strong>Dr.Basavaraj N. Hiremath</strong>, Professor and Final
          Year B.Tech Coordinator, and <strong>Dr.Gopal Das C. M.</strong>,
          Head of the Department of Psychiatry.
        </p>

        <p>
          {`Our primary focus is to address the challenges faced by employees in
          toxic work environments. By providing accessible mental health
          assessments through both text and audio formats, Toxitrace aims to
          empower individuals to understand and manage their mental well-being
          effectively.`}
        </p>

        <p>
          {`To enhance user support, we've integrated `}
          <strong>Harmoni</strong>
          {`, an AI-powered chatbot designed to assist with queries and provide
          guidance. Harmoni is readily available at the bottom-right corner of
          the platform, ensuring users have immediate access to assistance
          whenever needed.`}
        </p>

        {/* Logos, evenly spaced */}
        <div className="flex w-full justify-evenly items-center ">
          <div className=" ">
            <Image src={dsuLogo} alt="DSU" width={240} />
          </div>
          <div className=" ">
            <Image src={cdsimerLogo} alt="CDSIMER" width={240} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
