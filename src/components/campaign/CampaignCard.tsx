import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Instagram, Youtube, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CampaignCardProps {
    id: string;
    title: string;
    brand: string;
    platform: "instagram" | "youtube" | "blog";
    reward: string;
    image: string;
    category: string;
}

export default function CampaignCard({
    id,
    title,
    brand,
    platform,
    reward,
    image,
    category,
}: CampaignCardProps) {
    const PlatformIcon = {
        instagram: Instagram,
        youtube: Youtube,
        blog: Globe,
    }[platform];

    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg group">
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        {category}
                    </Badge>
                </div>
            </div>
            <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground">{brand}</span>
                    <PlatformIcon size={16} className="text-muted-foreground" />
                </div>
                <h3 className="font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>
            </CardHeader>
            <CardContent className="p-4 pt-2">
                <p className="text-sm font-medium text-primary">{reward}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Link href={`/campaigns/${id}`} className="w-full">
                    <Button className="w-full" variant="outline">
                        View Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
