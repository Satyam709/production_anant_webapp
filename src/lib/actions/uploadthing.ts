'use server';
import { UTApi } from 'uploadthing/server';
import isAdmin from './Admin';
import { getSession } from './Sessions';

const utapi = new UTApi();

export async function uploadServerSideFile(file: File) {
  try {
    const response = await utapi.uploadFiles(file);
    console.log('Upload complete for userId:', response);
    console.log('Upload complete for userId:', response.data?.ufsUrl);
    return response.data;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}

export async function uploadServerSideFiles(files: File[]) {
  try {
    const response = await utapi.uploadFiles(files);
    console.log('Upload complete for userId:', response);
    // console.log("Upload complete for userId:", response.data?.ufsUrl);
    return response;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}

export async function uploadAdminServerSideFile(file: File) {
  try {
    if (!file) return null;
    const session = await getSession();
    if (!session?.user || !(await isAdmin())) {
      return null;
    }

    const response = await utapi.uploadFiles(file);

    console.log('Upload complete for userId:', response);
    console.log('Upload complete for userId:', response.data?.ufsUrl);
    return response.data;
  } catch (error) {
    console.error('Upload failed:', error);
    return null;
  }
}

export async function uploadAdminServerSideFiles(files: File[]) {
  try {
    const session = await getSession();
    if (!session?.user || !(await isAdmin())) {
      return null;
    }
    const response = await utapi.uploadFiles(files);
    console.log('Upload complete for userId:', response);
    // console.log("Upload complete for userId:", response.data?.ufsUrl);
    return response;
  } catch (error) {
    console.error('Upload failed:', error);
    return null;
  }
}
