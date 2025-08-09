// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import { toast } from "react-toastify";
import ImgSkeleton from "@/components/Skeleton/Img";

interface ImageDoc {
  $id: string;
  imgUrl: string;
}

export default function Slider() {
    const [images, setImages] = useState<ImageDoc[]>([]);

  useEffect(() => {
    databases
      .listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_IMAGES_ID!
      )
      .then((response) => {
        setImages(
          response.documents.map((doc) => ({
            $id: doc.$id,
            imgUrl: doc.imgUrl,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        toast.error(
          `Error fetching images: ${error.message || "Unknown error"}`
        );
      });
  }, []);
  if (images.length === 0) {
    return <ImgSkeleton />; // Show skeleton while loading images
  }
  return (
    <div className="w-full h-[400px] lg:h-[600px] max-w-4xl mx-auto my-10">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image.imgUrl}
              alt={`Slide ${index + 1}`}
              height={600}
              width={800}
              objectFit="cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
