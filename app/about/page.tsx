"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Users, Award, Zap } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  // Team members data
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Alex founded the company in 2015 with a vision to create premium products that combine style and functionality.",
    },
    {
      name: "Sarah Chen",
      role: "Head of Design",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Sarah leads our design team, bringing over 10 years of experience in product design and development.",
    },
    {
      name: "Michael Rodriguez",
      role: "Marketing Director",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Michael oversees our marketing strategy, focusing on building authentic connections with our customers.",
    },
    {
      name: "Emma Wilson",
      role: "Product Manager",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Emma ensures that our products meet the highest standards of quality and customer satisfaction.",
    },
  ];

  // Company values
  const values = [
    {
      icon: <CheckCircle className="h-6 w-6 text-[#c2152a]" />,
      title: "Quality",
      description:
        "We never compromise on quality, using only the finest materials and craftsmanship.",
    },
    {
      icon: <Users className="h-6 w-6 text-[#c2152a]" />,
      title: "Community",
      description:
        "We believe in building strong relationships with our customers and partners.",
    },
    {
      icon: <Award className="h-6 w-6 text-[#c2152a]" />,
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, from design to customer service.",
    },
    {
      icon: <Zap className="h-6 w-6 text-[#c2152a]" />,
      title: "Innovation",
      description:
        "We constantly innovate to create products that meet evolving customer needs.",
    },
  ];

  // Timeline events
  const timeline = [
    {
      year: "2015",
      title: "Company Founded",
      description: "Our journey began with a small team and big dreams.",
    },
    {
      year: "2017",
      title: "First Product Line",
      description: "We launched our first collection to critical acclaim.",
    },
    {
      year: "2019",
      title: "International Expansion",
      description: "We expanded our operations to serve customers globally.",
    },
    {
      year: "2021",
      title: "Sustainability Initiative",
      description: "We committed to sustainable practices across our business.",
    },
    {
      year: "2023",
      title: "Digital Transformation",
      description:
        "We enhanced our online presence to better serve our customers.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Our Story
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              We&apos;re on a mission to create premium products that enhance
              your everyday life. Learn about our journey, our team, and the
              values that drive us forward.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#c2152a] hover:bg-[#a01020] text-white"
              >
                <Link href="/">Explore Products</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent"></div>
      </section>

      {/* Our Mission */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Our mission"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                At our core, we believe that exceptional products should be
                accessible to everyone. Our mission is to create high-quality,
                thoughtfully designed items that enhance your everyday
                experiences.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We&apos;re committed to sustainable practices, ethical
                manufacturing, and building lasting relationships with our
                customers. Every product we create is a reflection of our
                dedication to excellence and our passion for innovation.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                As we continue to grow, we remain focused on our founding
                principles: quality, integrity, and customer satisfaction.
                We&apos;re not just selling products – we&apos;re creating
                experiences that bring joy and value to your life.
              </p>
              <Button
                asChild
                className="bg-[#c2152a] hover:bg-[#a01020] text-white"
              >
                <Link href="/" className="flex items-center">
                  See Our Products <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Our Values
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              These core principles guide everything we do, from product
              development to customer service.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="bg-gray-100 dark:bg-gray-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Meet Our Team
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              The passionate individuals behind our products, dedicated to
              bringing you the best experience possible.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-[#c2152a] font-medium text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Our Journey
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              From humble beginnings to where we are today, our path has been
              defined by growth, learning, and innovation.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative z-10"
            >
              {timeline.map((event, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`mb-12 flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-12 text-right" : "pl-12"
                    } hidden md:block`}
                  >
                    <div
                      className={`bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm ${
                        index % 2 === 0 ? "ml-auto" : "mr-auto"
                      } max-w-md`}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Mobile version - always in a column */}
                  <div className="md:hidden w-full mb-8">
                    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm">
                      <div className="flex items-center mb-2">
                        <div className="bg-[#c2152a] text-white font-bold py-1 px-3 rounded-full text-sm mr-3">
                          {event.year}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {event.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="bg-[#c2152a] rounded-full h-6 w-6 z-10"></div>
                    <div className="hidden md:block absolute top-1/2 transform -translate-y-1/2 bg-[#c2152a] text-white font-bold py-1 px-3 rounded-full text-sm">
                      {event.year}
                    </div>
                  </div>

                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pl-12" : "pr-12 text-right"
                    } hidden md:block`}
                  ></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#c2152a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
              Join Us on Our Journey
            </h2>
            <p className="text-white/90 mb-8">
              Discover our premium products and become part of our growing
              community of satisfied customers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#c2152a] hover:bg-gray-100"
              >
                <Link href="/">Shop Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-black hover:bg-white/10"
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
