"use server"

import { db } from "@/lib/db"

export const FeaturedUniversityEdit = async (id: string, university_name: string, image_url: string, href: string | null,) => {
    const response = await db.featuredUniversity.update({
        where: {
            id: id
        },
        data: {
            university_name, image_url, href
        }
    })
    return response;

}
export const FeaturedUniversityAdd = async (university_name: string, image_url: string, href: string | null,) => {
    const response = await db.featuredUniversity.create({
        data: {
            university_name, image_url, href
        }
    })
    return response;

}

export const FeaturedUniversityDelete = async (id: string) => {
    const response = await db.featuredUniversity.delete({
        where: { id }
    });
}