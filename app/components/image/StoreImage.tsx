import Image from "next/image";

export default function StoreImage({ imageUrl }: { imageUrl: string }) {
    return (
        <Image 
            alt="store img"
            src={imageUrl}
            width={300}
            height={300}
        />
    );
}