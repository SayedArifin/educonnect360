import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import Link from "next/link";
interface FeaturedUniversityProps {
    href: string;
    src: string;
    alt?: string;
}

const FeaturedUniversity: React.FC<FeaturedUniversityProps> = ({ href, src, alt = "University" }) => {

    return <Link
        href={href}
        className="flex items-center lg:justify-center hover:scale-110 transition-transform"
    >
        <Image
            priority
            as={NextImage}
            width={200}
            height={200}
            src={src}
            alt={alt}
            className="swing-in-top-fwd invert dark:invert-0"
        />
    </Link>;
};

export default FeaturedUniversity;
