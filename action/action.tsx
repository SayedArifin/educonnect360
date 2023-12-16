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

export const FetchApplications = async () => {
    const applications = await db.applyUniversity.findMany({
        select: {
            id: true, application_status: true, university_name: true
        }
    });
    return applications;
}
export const FetchApplicationById = async (id: string) => {
    const application = await db.applyUniversity.findFirst({
        where: {
            id
        }
    })
    return application;
}

export const RejectApplicationById = async (id: string) => {
    await db.applyUniversity.update({
        where: {
            id
        }, data: {
            application_status: 3
        }
    })
    return;
}

export const ApproveApplicationById = async (id: string, kyc_date: string | undefined) => {
    await db.applyUniversity.update({
        where: {
            id
        }, data: {
            application_status: 1,
            kyc_date
        }
    })
    return;
}

export const MakeRepById = async (id: string) => {
    const res = await db.applyUniversity.update({
        where: {
            id
        }, data: {
            application_status: 2
        }
    })
    if (res) {
        await db.university.create({
            data: {
                applicationId: res.id, university_name: res.university_name
            }
        })
    }
    return res;
}

export const GetUniversityName = async (email: string) => {
    const res = await db.applyUniversity.findFirst({
        where: { r_email: email }, select: { university_name: true }
    })
    return res;
}

export const getDepartment = async () => {
    const res = await db.department.findMany()
    return res;
}