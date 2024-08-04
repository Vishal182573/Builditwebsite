"use client";
import * as React from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

type GalleryItem = {
  id: number;
  title: string;
  images: string[];
};

const GalleryCard: React.FC<{ item: GalleryItem }> = ({ item }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 w-full relative">
      <Carousel plugins={[plugin.current]} className="w-full">
        <CarouselContent>
          {item.images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={image}
                  alt={`${item.title} - Image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
      </Carousel>
    </Card>
  );
};

const Gallery: React.FC = () => {
  const galleryItems: GalleryItem[] = [
    {
      id: 10,
      title: "Sunset Serenity",
      images: [
        "https://drive.google.com/uc?export=view&id=15XoKWrE7_jQDYhqe2EHZlCMuXTbXfg-v",
        "https://drive.google.com/uc?export=view&id=15aW5o2GQKcr-bBxceI1eh5MWGoo-MmvL",
        "https://drive.google.com/uc?export=view&id=15XwpKzcPXgz8pvGAEph476pEiPs_jS3S",
        "https://drive.google.com/uc?export=view&id=15YmPKL1D52WkY7oII8zOwYAQWM1hz1cB",
      ]
    },
    {
      id: 1,
      title: "Gallery Group 1",
      images: [
        "https://drive.google.com/uc?export=view&id=15Jk6Aaaoe2WgIy7L2JCc5bVN5M6ffd6O",
        "https://drive.google.com/uc?export=view&id=15JOs_8bifaH3OiAdekQxDxj2ZiRApsUd",
        "https://drive.google.com/uc?export=view&id=15BKpvI0V3lzLGWavkH5oVZN2G49KBdPt",
        "https://drive.google.com/uc?export=view&id=15F0EenI8FSEeGQnDppJUsyE5LARgclrd",
        "https://drive.google.com/uc?export=view&id=15Fcq0iVMfKq_vvrJ6U7n-ii8JW5mb3yv"
      ]
    },
    {
      id: 2,
      title: "Gallery Group 2",
      images: [
        "https://drive.google.com/uc?export=view&id=153hkUdqx1DxtRu0buEOKnzNKFcjNOf9y",
        "https://drive.google.com/uc?export=view&id=14rGOliPhVOeVTbFlEck7uIIKVj9LoqqW",
        "https://drive.google.com/uc?export=view&id=14pAaEmKZhNZ2M0PhG3B79GKUDY8tY-gX",
        "https://drive.google.com/uc?export=view&id=150cTyc3orvGT4UAMq23gF5TMw8zsgbdu",
        "https://drive.google.com/uc?export=view&id=150UhW1O8vtTKNZ43R2R8WN4whInDSAH6"
      ]
    },
    {
      id: 3,
      title: "Gallery Group 3",
      images: [
        "https://drive.google.com/uc?export=view&id=14lxwrYVm4tHb1KKmU9pPM6cWAxEnjvEo",
        "https://drive.google.com/uc?export=view&id=14XuzUHKEOS8lJcUFbGe9dzuTFApSLo6g",
        "https://drive.google.com/uc?export=view&id=14j5DlEfn7wuYGfp3z5Oz8PLxruq6eWlP",
        "https://drive.google.com/uc?export=view&id=14d9IDHJLE7_FSCACLQW0sxYGn4ulzGdW",
        "https://drive.google.com/uc?export=view&id=14Inhxk1ydp8UNwa1Yyi-XckrNxXN_HTQ"
      ]
    },
    {
      id: 4,
      title: "Gallery Group 4",
      images: [
        "https://drive.google.com/uc?export=view&id=14KWu2qL1OFQyNPyrwY1rnNgKWRWS1lO9",
        "https://drive.google.com/uc?export=view&id=148OgkbW5dKdE04WE3cSpITuyWOUzVvSa",
        "https://drive.google.com/uc?export=view&id=142DhoO5MtuHmMTdAGhlREL8bkohKfR23",
        "https://drive.google.com/uc?export=view&id=148Ug53EJLLMARejajuZOkVOUwcQ7u5dD",
        "https://drive.google.com/uc?export=view&id=14EyuLBzudMpMzmzEqZSUr34dScKQp-Zc"
      ]
    },
    {
      id: 5,
      title: "Gallery Group 5",
      images: [
        "https://drive.google.com/uc?export=view&id=140yufOkF0NwKlW6OVAoUoNMn4-ClccI3",
        "https://drive.google.com/uc?export=view&id=14DWXe2hKK3XsHF9BZC0GzLBVv13HfLBr",
        "https://drive.google.com/uc?export=view&id=13xg_1DTAckyMCXAT_bfg6nRrBfcOiTcX",
        "https://drive.google.com/uc?export=view&id=13s4kFOpRs_nuopivTS8ImZoeSWKWAaE2",
        "https://drive.google.com/uc?export=view&id=13QJXVD_1n4QSarIJdvjmNaoPyT0GEdB0"
      ]
    },
    {
      id: 6,
      title: "Gallery Group 6",
      images: [
        "https://drive.google.com/uc?export=view&id=13lxcpbeNKVxpAAtixhUuWpWWGdVOMy4a",
        "https://drive.google.com/uc?export=view&id=13qDAuvjvo5o8DQkL155l0nxqalgxIzEx",
        "https://drive.google.com/uc?export=view&id=13FAo5g942cr7S7wB2o5qG2AsboL2k0Ei",
        "https://drive.google.com/uc?export=view&id=13Orip10hedpn8Qm4LcTKFDgNJxCQcq67",
        "https://drive.google.com/uc?export=view&id=13Pfjti7OrbVbNoiqnfiavjYB6QF9hAks"
      ]
    },
    {
      id: 7,
      title: "Gallery Group 7",
      images: [
        "https://drive.google.com/uc?export=view&id=12zS2ElPSCqQIBlSzCdD-Rx3gDo2IDA7W",
        "https://drive.google.com/uc?export=view&id=12us0Eh5pXWNUlE5dbHH6ky1XyJqxo2I-",
        "https://drive.google.com/uc?export=view&id=12hh1GG_C7i6OLAvW7Ql3qf7AD1Q239pI",
        "https://drive.google.com/uc?export=view&id=12fH_nTUuPZ5pL_WI_jrK_AiA23R6e7-p",
        "https://drive.google.com/uc?export=view&id=12XuA2YAuLo04zsnSxhSn2AycgcLMAoAi"
      ]
    },
    {
      id: 8,
      title: "Gallery Group 8",
      images: [
        "https://drive.google.com/uc?export=view&id=12TV_VKU_CSdqn0jf5-9B_zaIJZetN7QB",
        "https://drive.google.com/uc?export=view&id=12NU2JbkN1DEv0whNxrRfOuTzQkNoxar6",
        "https://drive.google.com/uc?export=view&id=127aYPOm3G9T35SbrK0jFKwyv-mF8ud1u",
        "https://drive.google.com/uc?export=view&id=12IDrExdBq07xjYIbQV7gXK3yLAZvuZ-x",
        "https://drive.google.com/uc?export=view&id=12LRWq1uCdJi0Wh8qsvJWhtgAz_3M6LL0"
      ]
    },
    {
      id: 9,
      title: "Gallery Group 9",
      images: [
        "https://drive.google.com/uc?export=view&id=125r11mPMJj5XfYnEb68fI-Hsetd7_BC8",
        "https://drive.google.com/uc?export=view&id=125RnxVwtpxNNcUEDJh9aNhyaYKubYNcM",
        "https://drive.google.com/uc?export=view&id=122e_COJ2G5FUEX19pF5oJ7vC3FaMFG2r",
        "https://drive.google.com/uc?export=view&id=11thExY5j2NV8QmWt9itixl-Y7SEGCSP9",
        "https://drive.google.com/uc?export=view&id=11zUBKj-hvb_jenFyqZiQcwqOChIcuJtm"
      ]
    },
    {
      id: 11,
      title: "Image Group 1",
      images: [
      "https://drive.google.com/uc?export=view&id=122KFwm4Zy9tnI0zqbO1-sVoRM1izGYjJ",
      "https://drive.google.com/uc?export=view&id=11sVr48OmLXZtXHMvlQ9pU5JO9jgmXDbg",
      "https://drive.google.com/uc?export=view&id=11gPPrtOvyDt_2bavq1DFXjJAgehJoW8i",
      "https://drive.google.com/uc?export=view&id=11eq8cjlGn_qRrOWLsTs4n8KrWpmBRf2x",
      "https://drive.google.com/uc?export=view&id=11DDTTztwDLPDx5xB3zD2RG9kjfEzXLwt"
      ]
      },
      {
      id: 12,
      title: "Image Group 2",
      images: [
      "https://drive.google.com/uc?export=view&id=11ItRUbJjVHmstUBlo0ABiTCeAkvRrTkK",
      "https://drive.google.com/uc?export=view&id=11Nll37KZGArL3n1qyWhHNQ7214GjIN6v",
      "https://drive.google.com/uc?export=view&id=116pOxaw97M0Bk-S5Ut-MTQP-fn8zNvu4",
      "https://drive.google.com/uc?export=view&id=112Kxz-8QFHrFHyXwkdT4LalznPRAoaTD",
      "https://drive.google.com/uc?export=view&id=1151Ttix62whzTTNDoi6sDOzRCR7QRR_p"
      ]
      },
      {
      id: 13,
      title: "Image Group 3",
      images: [
      "https://drive.google.com/uc?export=view&id=11BAcmiS9Cvm3SqojX1lpmnHlj9fHKp-T",
      "https://drive.google.com/uc?export=view&id=10xSdg5K51A5rcwIVeuyej5WZ3Po28y9U",
      "https://drive.google.com/uc?export=view&id=10uEebe7Z3lmxUqVzrA7auNMK0WBOeAvT",
      "https://drive.google.com/uc?export=view&id=10s7aJKQmAZCHkUQfR9rvEJI7Sq81LMo1",
      "https://drive.google.com/uc?export=view&id=10lxRaYdpHIKOYJ6EcDFY1IWEysl5xLY5"
      ]
      },
      {
      id: 14,
      title: "Image Group 4",
      images: [
      "https://drive.google.com/uc?export=view&id=10i-ee-kpsetbhzWz5D08LtJ6e1vsKuyp",
      "https://drive.google.com/uc?export=view&id=10cOtfgY-pBqTvLwu_AlIhspsTBIh8HKC",
      "https://drive.google.com/uc?export=view&id=10OOZJrNB1Y4SVDCylFqPtyLSLvReFyFn",
      "https://drive.google.com/uc?export=view&id=10Lp8jS7c-tXMVf7WYOE8-I56T-U_K_59",
      "https://drive.google.com/uc?export=view&id=10GxxKuYnDC_2gkqk3Rd3LScXApE0Hqpp"
      ]
      },
      {
      id: 15,
      title: "Image Group 5",
      images: [
      "https://drive.google.com/uc?export=view&id=10B48LdAKdKTn2h172sqXbBIP173j4ANl",
      "https://drive.google.com/uc?export=view&id=10EdcRl6fN0qVgHmF7AxRXlOc11wN4oPw",
      "https://drive.google.com/uc?export=view&id=10A18dS1QhfXjnXh8Rmevre-pG_Zs2v8C",
      "https://drive.google.com/uc?export=view&id=105CbBHU_EYUtfxXDGBJjb31JLVXaW0DM",
      "https://drive.google.com/uc?export=view&id=101baqLHY1hwMaPKAYgfiCcVjUmoSulS2"
      ]
      },
      {
      id: 16,
      title: "Image Group 6",
      images: [
      "https://drive.google.com/uc?export=view&id=1-tnuEVBabjGZqXOD0QPkFr4C16OpN2uL",
      "https://drive.google.com/uc?export=view&id=1-lPghb7LLKIWwfrNmSt0VKKGdySV4Etv",
      "https://drive.google.com/uc?export=view&id=1-jpf6qN9RzcJF76-YW2NmWyyBmzWuZMu",
      "https://drive.google.com/uc?export=view&id=1-dZ4kRyEHHTH9d-i23fskt3g6MqB4ERq",
      "https://drive.google.com/uc?export=view&id=1-hjr_Hr7sQu1RFQJD3XJX_5pTAnGW1tN"
      ]
      },
      {
      id: 17,
      title: "Image Group 7",
      images: [
      "https://drive.google.com/uc?export=view&id=1-YLi5ZYF1xmzI41jU9DsD7opW8nGjjc1",
      "https://drive.google.com/uc?export=view&id=1-ZSU5BTm8hRaJ-WRZ7VTLba9PnG5ApAC",
      "https://drive.google.com/uc?export=view&id=1-UPdrAUpw_SQ3wenqq79BsnHY2t4VvFv"
      ]
      }
  ];

  return (
    <div className="py-10 px-5 md:px-20">
      <h1 className="text-3xl font-bold text-center mb-10">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {galleryItems.map((item) => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;

