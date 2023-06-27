"use client";
import directus from "@/lib/directus";
import getDicitionary from "@/lib/getDictionary";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const CtaCard = ({ dictionary }: { dictionary: any }) => {
  // Client Component Approach
  const [email, setEmail] = useState("");
  const [isHandling, setIsHandling] = useState(false);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsHandling(true);
      await directus.items("subscribers").createOne({ email });
      toast.success("Thank you for subscribing!");
      setIsHandling(false);
      setEmail("");
    } catch (error) {}
  };

  return (
    <div className="rounded-md bg-slate-100 overflow-hidden py-10 px-6 relative shadow-lg">
      {/* Overlay */}
      <div className="absolute z-10 inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/30" />
      {/* Image */}
      <Image
        fill
        alt="CTA Card Image"
        className="object-cover object-center"
        src="https://cdn.pixabay.com/photo/2016/03/26/13/09/workspace-1280538_1280.jpg"
      />
      {/* content Container */}
      <div className="relative z-20">
        <div className="font-medium text-lg">#sharetheknowledge</div>
        <h3 className="text-4xl font-semibold mt-3">
          {dictionary.ctaCard.title}
        </h3>
        <p className="mt-2 text-lg max-w-lg">
          {dictionary.ctaCard.description}
        </p>
        {/* form */}
        <form
          onSubmit={submitHandler}
          className="mt-6 flex items-center gap-2 w-full"
        >
          <input
            className="bg-white/80 md:w-auto text-base w-full shadow-sm rounded-md py-2 px-3 outline-none focus:ring-2 placeholder:text-sm focus:ring-offset-2 focus:ring-black"
            placeholder={dictionary.ctaCard.placeholder}
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-neutral-900 rounded-md py-2 whitespace-nowrap shadow-sm px-3 text-neutral-200"
          >
            {!isHandling ? dictionary.ctaCard.button : "Submitting..."}
          </button>
        </form>

        {/* Subs */}
      </div>
    </div>
  );
};

export default CtaCard;
